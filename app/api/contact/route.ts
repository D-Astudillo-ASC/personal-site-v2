import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { SPAM_PATTERNS } from '@/constants/contact';
import emailService from '@/services/emailService';

// Helper function to generate user-friendly error messages
function generateUserFriendlyError(validationError: z.ZodError): string {
  const issues = validationError.issues;
  
  if (issues.length === 0) {
    return 'Please check your input and try again.';
  }
  
  // Get the first error message
  const firstIssue = issues[0];
  
  // Map field names to user-friendly names
  const fieldNames: Record<string, string> = {
    name: 'Name',
    email: 'Email address',
    subject: 'Subject',
    message: 'Message',
    website: 'Form'
  };
  
  const fieldName = fieldNames[firstIssue.path[0] as string] || 'Field';
  
  // Handle specific error types
  if (firstIssue.code === 'invalid_format') {
    return 'Please enter a valid email address.';
  }
  
  if (firstIssue.code === 'too_small') {
    if (firstIssue.path[0] === 'message') {
      return 'Message must be at least 10 characters long.';
    }
    return `${fieldName} is required.`;
  }
  
  if (firstIssue.code === 'too_big') {
    if (firstIssue.path[0] === 'message') {
      return 'Message is too long. Please keep it under 2000 characters.';
    }
    if (firstIssue.path[0] === 'subject') {
      return 'Subject is too long. Please keep it under 200 characters.';
    }
    return `${fieldName} is too long.`;
  }
  
  // Default error message
  return firstIssue.message || 'Please check your input and try again.';
}

// Email validation schema with honeypot field
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message too short').max(2000, 'Message too long'),
  // Honeypot field - should always be empty
  website: z.string().optional().refine((val) => !val || val.trim() === '', {
    message: 'Invalid form submission'
  }),
});


async function detectSpam(data: { name: string; email: string; subject: string; message: string; website?: string }): Promise<boolean> {
  // Check honeypot field first (most effective against bots)
  if (data.website && data.website.trim() !== '') {
    console.log('🚨 Honeypot triggered - bot detected filling hidden field');
    return true;
  }
  
  return fallbackSpamDetection(data);
}

function fallbackSpamDetection(data: { name: string; email: string; subject: string; message: string; website?: string }): boolean {
  const text = `${data.name} ${data.email} ${data.subject} ${data.message}`.toLowerCase();
  
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      console.log('Spam detected via regex fallback with pattern:', pattern);
      return true;
    }
  }
  
  const suspiciousIndicators = [
    data.message.length > 1000 && data.message.split(' ').length < 50,
    data.name.length > 50,
    data.subject.length > 100,
    /\d{10,}/.test(data.message),
    /[^\w\s@.-]/.test(data.email),
  ];
  
  return suspiciousIndicators.some(Boolean);
}

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIP = forwardedFor?.split(',')[0] || realIp || 'unknown';
    
    // Parse IP addresses (IPv4 and IPv6)
    let ipv4 = 'Unknown';
    let ipv6 = 'Unknown';
    
    if (clientIP !== 'unknown') {
      if (clientIP.includes(':')) {
        ipv6 = clientIP;
        if (clientIP === '::1') {
          ipv4 = '127.0.0.1 (IPv6 loopback)';
        }
      } else {
        ipv4 = clientIP;
      }
    }
    
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    const body = await request.json();
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      const userFriendlyError = generateUserFriendlyError(validationResult.error);
      return NextResponse.json(
        { error: userFriendlyError },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        }
      );
    }
    
    const { name, email, subject, message, website } = validationResult.data;
    
    const sanitizedData = {
      name: name.trim().replace(/[<>]/g, ''),
      email: email.trim().toLowerCase(),
      subject: subject.trim().replace(/[<>]/g, ''),
      message: message.trim().replace(/[<>]/g, ''),
      website: website || '', // Include honeypot field
    };
    
    const isSpam = await detectSpam(sanitizedData);
    if (isSpam) {
      console.log('Spam detected from:', clientIP, sanitizedData);
      return NextResponse.json(
        { error: 'Invalid form submission. Please revise and try again.' },
        { 
          status: 400,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        }
      );
    }
    
    await emailService.sendContactFormEmail(sanitizedData, {
      ipv4: ipv4,
      ipv6: ipv6,
      userAgent: userAgent,
    });
    
    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
  }
} 
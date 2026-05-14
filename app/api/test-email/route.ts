import { NextRequest, NextResponse } from 'next/server';
import emailService from '@/services/emailService';

export async function GET(request: NextRequest) {
  // Security: Only allow in development environment
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({
      success: false,
      error: 'Not Found.'
    }, { status: 404 });
  }

  try {
    console.log('🧪 Testing Email Service Configuration...\n');
    
    const status = emailService.getConfigStatus();
    console.log('📋 Configuration Status:', status);
    
    if (!status.configured) {
      return NextResponse.json({
        success: false,
        error: 'SMTP not configured.',
        status: status
      }, { status: 400 });
    }
    
    console.log('📧 Sending test email...');

    const userAgent = request.headers.get('user-agent') || 'unknown';
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Email',
      message: 'This is a test email to verify SMTP configuration and metadata display.',
    };
    
    // Use RFC 5737 / 3849 documentation ranges only — avoids LAN-style literals that
    // security scanners (e.g. Shai-Hulud “network exfiltration” heuristics) flag as C2-like.
    const testMetadata = {
      ipv4: '192.0.2.1 (TEST-NET-1, example only)',
      ipv6: '2001:db8::1 (documentation prefix, example only)',
      userAgent: userAgent,
    };
    
    console.log('📊 Test Metadata:', testMetadata);
    
    await emailService.sendContactFormEmail(testData, testMetadata);
    
    console.log('✅ Test completed successfully!');
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully! Check your inbox.',
      status: status
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: [
        'Check your .env.local file has correct SMTP credentials',
        'Verify your Gmail app password is correct',
        'Ensure 2FA is enabled on your Gmail account',
        'Check if your firewall is blocking SMTP connections'
      ]
    }, { status: 500 });
  }
} 
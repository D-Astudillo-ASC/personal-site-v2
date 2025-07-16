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
    
    const testMetadata = {
      ipv4: '192.168.1.100 (Test)',
      ipv6: '2001:db8::1 (Test)',
      userAgent: userAgent
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
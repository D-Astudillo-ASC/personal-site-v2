import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

/* TODO: Consolidate repeated interfaces... */
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean; // true for 465 (SSL), false for 587 (TLS)
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  to: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class EmailService {
  private transporter: Transporter;
  private config: EmailConfig;
  private maxRetries: number = 3;
  private retryDelay: number = 1000; // 1 second

  constructor() {
    this.config = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
      from: process.env.FROM_EMAIL || 'noreply@danielastudillo.io',
      to: process.env.CONTACT_EMAIL || 'daniel.astudillo404@gmail.com',
    };

    this.transporter = nodemailer.createTransport({
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure,
      auth: this.config.auth,
      pool: true, 
      maxConnections: 5,
      maxMessages: 100,
      rateLimit: 14,
      tls: {
        rejectUnauthorized: true,
      },
      // Require TLS for non-secure connections (port 587)
      requireTLS: !this.config.secure,
    });

    this.verifyConnection();
  }

  private async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify();
      console.log('✅ SMTP connection verified successfully');
      console.log(`🔒 Using ${this.config.secure ? 'SSL (port 465)' : 'TLS (port 587)'} encryption`);
    } catch (error) {
      console.error('❌ SMTP connection failed:', error);
      throw new Error('SMTP configuration is invalid');
    }
  }

  private generateEmailTemplate(contactFormData: ContactFormData, metadata?: { ipv4?: string; ipv6?: string; userAgent?: string }): string {
    const timestamp = new Date().toLocaleString();
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          /* Reset and base styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #000000;
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          
          /* Container with subtle border and background */
          .container {
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          
          /* Header section */
          .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 24px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }
          
          .header h1 {
            color: #000000;
            font-size: 28px;
            font-weight: 200;
            margin: 0;
            letter-spacing: -0.02em;
          }
          
          .header-subtitle {
            color: rgba(0, 0, 0, 0.6);
            font-size: 16px;
            font-weight: 300;
            margin-top: 8px;
          }
          
          /* Form fields */
          .field {
            margin-bottom: 32px;
          }
          
          .field-label {
            font-weight: 300;
            color: rgba(0, 0, 0, 0.7);
            font-size: 14px;
            margin-bottom: 8px;
            text-transform: none;
            letter-spacing: normal;
          }
          
          .field-value {
            font-size: 16px;
            color: #000000;
            padding: 16px 20px;
            background: rgba(0, 0, 0, 0.02);
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            font-weight: 300;
            line-height: 1.5;
          }
          
          .message-content {
            white-space: pre-wrap;
            font-family: inherit;
            min-height: 120px;
          }
          
          /* Contact info section */
          .contact-info {
            background: rgba(0, 0, 0, 0.02);
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 20px;
            margin-top: 32px;
          }
          
          .contact-info h3 {
            color: #000000;
            font-size: 18px;
            font-weight: 300;
            margin-bottom: 16px;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
            font-size: 14px;
            font-weight: 300;
          }
          
          .contact-item:last-child {
            margin-bottom: 0;
          }
          
          .contact-label {
            color: rgba(0, 0, 0, 0.7);
            min-width: 80px;
          }
          
          .contact-value {
            color: #000000;
          }
          
          /* Footer */
          .footer {
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          
          .timestamp {
            background: rgba(0, 0, 0, 0.05);
            padding: 12px 16px;
            border-radius: 6px;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.6);
            display: inline-block;
            font-weight: 300;
          }
          
          .brand-info {
            margin-top: 16px;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.5);
            font-weight: 300;
          }
          
          /* Responsive design */
          @media (max-width: 600px) {
            body {
              padding: 16px;
            }
            
            .container {
              padding: 24px;
            }
            
            .header h1 {
              font-size: 24px;
            }
            
            .field-value {
              padding: 12px 16px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <div class="header-subtitle">danielastudillo.io</div>
          </div>
          
          <div class="field">
            <div class="field-label">From</div>
            <div class="field-value">${contactFormData.name} (${contactFormData.email})</div>
          </div>
          
          <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">${contactFormData.subject}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value message-content">${contactFormData.message}</div>
          </div>
          
          <div class="contact-info">
            <h3>Contact Information</h3>
            <div class="contact-item">
              <span class="contact-label">Name:</span>
              <span class="contact-value">${contactFormData.name}</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">Email:</span>
              <span class="contact-value">${contactFormData.email}</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">Submitted:</span>
              <span class="contact-value">${timestamp}</span>
            </div>
          </div>
          
          <div class="contact-info">
            <h3>Submission Details</h3>
            <div class="contact-item">
              <span class="contact-label">IPv4 Address:</span>
              <span class="contact-value">${metadata?.ipv4 || 'Unknown'}</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">IPv6 Address:</span>
              <span class="contact-value">${metadata?.ipv6 || 'Unknown'}</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">User Agent:</span>
              <span class="contact-value">${metadata?.userAgent || 'Unknown'}</span>
            </div>
          </div>
          
          <div class="footer">
            <div class="timestamp">Received: ${timestamp}</div>
            <div class="brand-info">Daniel Astudillo | Software Engineer</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private async sendWithRetry(mailOptions: SendMailOptions, retryCount: number = 0): Promise<void> {
    try {
      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', {
        messageId: result.messageId,
        to: mailOptions.to,
        subject: mailOptions.subject,
      });
    } catch (error) {
      console.error(`❌ Email send attempt ${retryCount + 1} failed:`, error);
      
      if (retryCount < this.maxRetries - 1) {
        console.log(`🔄 Retrying in ${this.retryDelay}ms... (attempt ${retryCount + 2}/${this.maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.sendWithRetry(mailOptions, retryCount + 1);
      } else {
        throw new Error(`Failed to send email after ${this.maxRetries} attempts: ${error}`);
      }
    }
  }

  async sendContactFormEmail(contactFormData: ContactFormData, metadata?: { ipv4?: string; ipv6?: string; userAgent?: string }): Promise<void> {
    const mailOptions: SendMailOptions = {
      from: this.config.from,
      to: this.config.to,
      subject: `New Contact Form Submission: ${contactFormData.subject}`,
      html: this.generateEmailTemplate(contactFormData, metadata),
      // Additional headers for better deliverability
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
      },
      // Add metadata if provided
      ...(metadata && {
        text: `Contact Form Submission\n\nFrom: ${contactFormData.name} (${contactFormData.email})\nSubject: ${contactFormData.subject}\nMessage: ${contactFormData.message}\n\nMetadata:\nIPv4: ${metadata.ipv4 || 'Unknown'}\nIPv6: ${metadata.ipv6 || 'Unknown'}\nUser Agent: ${metadata.userAgent || 'Unknown'}`,
      }),
    };

    await this.sendWithRetry(mailOptions);
  }

  async sendTestEmail(): Promise<void> {
    const testData: ContactFormData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Email',
      message: 'This is a test email to verify SMTP configuration.',
    };

    await this.sendContactFormEmail(testData);
  }

  getConfigStatus(): { configured: boolean; host: string; port: number; secure: boolean; from: string; to: string; encryption: string } {
    return {
      configured: !!(this.config.auth.user && this.config.auth.pass),
      host: this.config.host,
      port: this.config.port,
      secure: this.config.secure,
      from: this.config.from,
      to: this.config.to,
      encryption: this.config.secure ? 'SSL (Port 465)' : 'TLS (Port 587)',
    };
  }
  
  async close(): Promise<void> {
    if (this.transporter) {
      await this.transporter.close();
      console.log('📧 SMTP connection closed');
    }
  }
}

// Create singleton instance
const emailService = new EmailService();

export default emailService; 
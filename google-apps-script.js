/**
 * Google Apps Script for Portfolio Contact Form
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Deploy as web app with execute permissions for "Anyone"
 * 5. Copy the web app URL and update your script.js
 */

function doGet(e) {
  try {
    // Handle contact form submission via GET request
    if (e.parameter && e.parameter.name) {
      // This is a contact form submission
      return handleContactForm(e.parameter);
    }
    
    // Default response for testing
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Google Apps Script is running'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleContactForm(data) {
  try {
    // Extract form fields
    const name = data.name || 'Unknown';
    const email = data.email || 'No email provided';
    const subject = data.subject || 'Portfolio Contact';
    const message = data.message || 'No message provided';
    const timestamp = data.timestamp || new Date().toLocaleString();
    
    // Your email address (change this to your email)
    const recipientEmail = 'abish13.r@gmail.com';
    
    // Create email content
    const emailSubject = `Portfolio Contact: ${subject}`;
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #667eea; }
        .field-label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
        .field-value { color: #333; }
        .message-field { background: #f7fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; white-space: pre-wrap; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Portfolio Contact</h1>
            <p>Someone reached out through your portfolio website</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="field-label">From:</div>
                <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${email}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Subject:</div>
                <div class="field-value">${subject}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Message:</div>
                <div class="field-value message-field">${message}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Timestamp:</div>
                <div class="field-value">${timestamp}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent from your portfolio contact form</p>
        </div>
    </div>
</body>
</html>
    `;
    
    // Send email using Gmail API
    GmailApp.sendEmail(
      recipientEmail,
      emailSubject,
      '', // Plain text version (empty since we're using HTML)
      {
        htmlBody: emailBody,
        replyTo: email,
        name: 'Portfolio Contact Form'
      }
    );
    
    // Send auto-reply to the sender
    const autoReplySubject = 'Thank you for contacting me!';
    const autoReplyBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; text-align: center; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✨ Thank You!</h1>
        </div>
        
        <div class="content">
            <h2>Hi ${name},</h2>
            <p>Thank you for reaching out through my portfolio! I've received your message and will get back to you within 24 hours.</p>
            <p>I'm excited to discuss your project and how I can help bring your ideas to life with cutting-edge technology.</p>
            <a href="#" class="cta-button">Visit My Portfolio</a>
            <p>Best regards,<br><strong>Abish R</strong><br>Full Stack Developer</p>
        </div>
        
        <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
        </div>
    </body>
</html>
    `;
    
    // Send auto-reply
    GmailApp.sendEmail(
      email,
      autoReplySubject,
      '', // Plain text version
      {
        htmlBody: autoReplyBody,
        name: 'Abish R - Full Stack Developer'
      }
    );
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Failed to send email: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    // Handle CORS preflight request
    if (e.parameter && e.parameter.method === 'OPTIONS') {
      return ContentService
        .createTextOutput('')
        .setMimeType(ContentService.MimeType.TEXT);
    }
    
    // Parse the form data (now using FormData instead of JSON)
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON parsing fails, try to get data from parameters
        data = {
          name: e.parameter.name || 'Unknown',
          email: e.parameter.email || 'No email provided',
          subject: e.parameter.subject || 'Portfolio Contact',
          message: e.parameter.message || 'No message provided',
          timestamp: e.parameter.timestamp || new Date().toISOString()
        };
      }
    } else {
      // Fallback to parameters
      data = {
        name: e.parameter.name || 'Unknown',
        email: e.parameter.email || 'No email provided',
        subject: e.parameter.subject || 'Portfolio Contact',
        message: e.parameter.message || 'No message provided',
        timestamp: e.parameter.timestamp || new Date().toISOString()
      };
    }
    
    // Extract form fields
    const name = data.name || 'Unknown';
    const email = data.email || 'No email provided';
    const subject = data.subject || 'Portfolio Contact';
    const message = data.message || 'No message provided';
    const timestamp = new Date().toLocaleString();
    
    // Your email address (change this to your email)
    const recipientEmail = 'abish13.r@gmail.com';
    
    // Create email content
    const emailSubject = `Portfolio Contact: ${subject}`;
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px; border-left: 4px solid #667eea; }
        .field-label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
        .field-value { color: #333; }
        .message-field { background: #f7fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; white-space: pre-wrap; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 New Portfolio Contact</h1>
            <p>Someone reached out through your portfolio website</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="field-label">From:</div>
                <div class="field-value">${name}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Email:</div>
                <div class="field-value">${email}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Subject:</div>
                <div class="field-value">${subject}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Message:</div>
                <div class="field-value message-field">${message}</div>
            </div>
            
            <div class="field">
                <div class="field-label">Timestamp:</div>
                <div class="field-value">${timestamp}</div>
            </div>
        </div>
        
        <div class="footer">
            <p>This message was sent from your portfolio contact form</p>
        </div>
    </div>
</body>
</html>
    `;
    
    // Send email using Gmail API
    GmailApp.sendEmail(
      recipientEmail,
      emailSubject,
      '', // Plain text version (empty since we're using HTML)
      {
        htmlBody: emailBody,
        replyTo: email,
        name: 'Portfolio Contact Form'
      }
    );
    
    // Send auto-reply to the sender
    const autoReplySubject = 'Thank you for contacting me!';
    const autoReplyBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; text-align: center; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✨ Thank You!</h1>
        </div>
        
        <div class="content">
            <h2>Hi ${name},</h2>
            <p>Thank you for reaching out through my portfolio! I've received your message and will get back to you within 24 hours.</p>
            <p>I'm excited to discuss your project and how I can help bring your ideas to life with cutting-edge technology.</p>
            <a href="#" class="cta-button">Visit My Portfolio</a>
            <p>Best regards,<br><strong>Abish R</strong><br>Full Stack Developer</p>
        </div>
        
        <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
        </div>
    </body>
</html>
    `;
    
    // Send auto-reply
    GmailApp.sendEmail(
      email,
      autoReplySubject,
      '', // Plain text version
      {
        htmlBody: autoReplyBody,
        name: 'Abish R - Full Stack Developer'
      }
    );
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Failed to send email: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function testEmail() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Message',
    message: 'This is a test message from Google Apps Script.'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log(result.getContent());
}

// Contact form security and spam constants

export const SPAM_PATTERNS = [
  // Financial scams
  /\b(viagra|casino|loan|debt|credit|mortgage)\b/i,
  /\b(click here|buy now|limited time|act now)\b/i,
  /\b(free money|make money fast|earn money online)\b/i,
  /\b(forex|binary options|investment|invest now)\b/i,
  /\b(work from home|work-at-home|work at home|easy money|from home)\b/i,
  /\b(weight loss|lose weight|diet pill|miracle cure|supplement)\b/i,
  /\b(prince|inheritance|lottery|winner|congratulations|urgent response)\b/i,
  /\b(paypal|bank account|ssn|social security|password|login|verify account)\b/i,
  /\b(risk-free|guaranteed|no obligation|no credit check|pre-approved)\b/i,
  /\b(unsubscribe|opt out|remove me|do not contact)\b/i,
  /\b(cheap|discount|bargain|clearance|wholesale)\b/i,
  /\b(earn \$\d+|\$\d+ per day|\$\d+ per week|\$\d+ per month)\b/i,

  // Excessive formatting
  /[A-Z]{5,}/, // Excessive caps
  /!{3,}/, // Multiple exclamation marks

  // Links and contact methods
  /\b(www\.|http:\/\/|https:\/\/)/, // URLs in message
  /\b(\d{10,})\b/, // Long numbers (potential phone numbers or account numbers)
  /\b(whatsapp|telegram|skype|wechat)\b/i,

  // Urgency and pressure tactics
  /\b(offer expires|while supplies last|order now|apply now)\b/i,
  /\b(insurance|medicare|healthcare|pharmacy|prescription)\b/i,
  /\b(loan approval|bad credit|credit repair|debt relief)\b/i,
  /\b(urgent|immediately|asap|final notice|last chance)\b/i,

  // Adult content and inappropriate material
  /\b(adult|porn|xxx|sex|nude|naked|escort|hooker|prostitute)\b/i,
  /\b(adult dating|adult friend|adult chat|adult video|adult site)\b/i,
  /\b(meet singles|find love|dating site|hookup|one night stand)\b/i,
  /\b(adult entertainment|strip club|massage parlor|adult services)\b/i,
  /\b(adult content|adult material|adult website|adult link)\b/i,
  /\b(adult webcam|adult cam|adult chat|adult message)\b/i,
  /\b(adult personals|adult classified|adult ads|adult contact)\b/i,
  /\b(adult dating site|adult dating service|adult dating app)\b/i,
  /\b(adult friend finder|adult friend site|adult friend service)\b/i,
  /\b(adult chat room|adult chat site|adult chat service)\b/i,
  /\b(adult video chat|adult video call|adult video message)\b/i,
  /\b(adult webcam chat|adult webcam call|adult webcam service)\b/i,
  /\b(adult cam chat|adult cam call|adult cam service)\b/i,
  /\b(adult message board|adult forum|adult community)\b/i,
  /\b(adult social network|adult social site|adult social media)\b/i,
  /\b(adult dating network|adult dating community|adult dating forum)\b/i,
  /\b(adult friend network|adult friend community|adult friend forum)\b/i,
  /\b(adult chat network|adult chat community|adult chat forum)\b/i,
  /\b(adult video network|adult video community|adult video forum)\b/i,
  /\b(adult webcam network|adult webcam community|adult webcam forum)\b/i,
  /\b(adult cam network|adult cam community|adult cam forum)\b/i,
  /\b(adult message network|adult message community|adult message forum)\b/i,
  /\b(adult social network|adult social community|adult social forum)\b/i,
  /\b(adult dating app|adult dating mobile|adult dating phone)\b/i,
  /\b(adult friend app|adult friend mobile|adult friend phone)\b/i,
  /\b(adult chat app|adult chat mobile|adult chat phone)\b/i,
  /\b(adult video app|adult video mobile|adult video phone)\b/i,
  /\b(adult webcam app|adult webcam mobile|adult webcam phone)\b/i,
  /\b(adult cam app|adult cam mobile|adult cam phone)\b/i,
  /\b(adult message app|adult message mobile|adult message phone)\b/i,
  /\b(adult social app|adult social mobile|adult social phone)\b/i,
  /\b(adult dating mobile app|adult dating phone app)\b/i,
  /\b(adult friend mobile app|adult friend phone app)\b/i,
  /\b(adult chat mobile app|adult chat phone app)\b/i,
  /\b(adult video mobile app|adult video phone app)\b/i,
  /\b(adult webcam mobile app|adult webcam phone app)\b/i,
  /\b(adult cam mobile app|adult cam phone app)\b/i,
  /\b(adult message mobile app|adult message phone app)\b/i,
  /\b(adult social mobile app|adult social phone app)\b/i,
];

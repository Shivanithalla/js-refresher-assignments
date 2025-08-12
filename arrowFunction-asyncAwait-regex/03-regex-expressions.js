// REGEX VALIDATION TRAINING EXERCISES
// Complete the TODOs below. Test in browser console.

console.log("=== REGEX VALIDATION EXERCISES ===");

// 1. Basic Email Validation
// TODO: Create regex pattern for basic email validation
// Should match: user@domain.com, test.email@site.co.uk
// Should reject: invalid-email, @domain.com, user@
const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
    return emailRegex.test(email);
}

// 2. Phone Number Validation
// TODO: Create regex for US phone numbers
// Should match: (555) 123-4567, 555-123-4567, 5551234567, +1-555-123-4567
// Should reject: 123-4567, (555) 12-34567
const phoneRegex = /^(\+1[-\s]?)?(\(?\d{3}\)?[-\s]?)?\d{3}[-\s]?\d{4}$/;

function validatePhone(phone) {
    return phoneRegex.test(phone);
}

// 3. Password Strength Validation
// TODO: Create regex for strong password
// Requirements: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).{8,}$/;

function validatePassword(password) {
    const result = {
        isValid: passwordRegex.test(password),
        missing: []
    };

    if (!/.{8,}/.test(password)) result.missing.push("8+ characters");
    if (!/[A-Z]/.test(password)) result.missing.push("uppercase letter");
    if (!/[a-z]/.test(password)) result.missing.push("lowercase letter");
    if (!/\d/.test(password)) result.missing.push("number");
    if (!/[\W_]/.test(password)) result.missing.push("special character");

    return result;
}

// 4. Credit Card Number Validation
// TODO: Create regex patterns for different card types
const cardPatterns = {
    // TODO: Visa (starts with 4, 13-19 digits)
    visa: /^4\d{12}(\d{3})?(\d{3})?$/,
    
    // TODO: Mastercard (starts with 5[1-5] or 2[2-7], 16 digits)
    mastercard: /^(5[1-5]\d{14}|2[2-7]\d{14})$/,
    
    // TODO: American Express (starts with 3[47], 15 digits)
    amex: /^3[47]\d{13}$/
};

function validateCreditCard(cardNumber) {
    const cleaned = cardNumber.replace(/[\s-]/g, '');

    for (let [type, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(cleaned)) {
            return {
                isValid: true,
                cardType: type
            };
        }
    }
    return {
        isValid: false,
        cardType: null
    };
}

// 5. URL Validation
// TODO: Create regex for HTTP/HTTPS URLs
// Should match: https://example.com, http://sub.domain.co.uk/path?query=1
const urlRegex = /^(https?:\/\/)([\w.-]+)(\.[a-z]{2,})(:[0-9]+)?(\/[^\s]*)?$/i;

function validateURL(url) {
    return urlRegex.test(url);
}

// 6. Date Format Validation
// TODO: Create regex for MM/DD/YYYY and DD-MM-YYYY formats
const dateRegexUS = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;  // MM/DD/YYYY
const dateRegexEU = /^(0[1-9]|[12]\d|3[01])\-(0[1-9]|1[0-2])\-\d{4}$/;  // DD-MM-YYYY

function validateDate(date, format = 'US') {
    const regex = format === 'US' ? dateRegexUS : dateRegexEU;

    if (!regex.test(date)) {
        return { isValid: false, reason: 'Invalid format' };
    }

    const [part1, part2, year] = date.split(format === 'US' ? '/' : '-');
    const mm = format === 'US' ? part1 : part2;
    const dd = format === 'US' ? part2 : part1;

    const parsedDate = new Date(${year}-${mm}-${dd});

    const isRealDate =
        parsedDate.getFullYear() === +year &&
        parsedDate.getMonth() + 1 === +mm &&
        parsedDate.getDate() === +dd;

    return {
        isValid: isRealDate,
        reason: isRealDate ? null : 'Invalid calendar date'
    };
}

// 7. Username Validation
// TODO: Create regex for username
// Rules: 3-20 chars, alphanumeric + underscore, can't start with number
const usernameRegex = /^(?!\d)[\w]{3,20}$/;

function validateUsername(username) {
    return usernameRegex.test(username);
}

// 8. IP Address Validation
// TODO: Create regex for IPv4 addresses
// Should match: 192.168.1.1, 255.255.255.255
// Should reject: 256.1.1.1, 192.168.1
const ipRegex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

function validateIPAddress(ip) {
    return ipRegex.test(ip);
}

// 9. Social Security Number
// TODO: Create regex for SSN format XXX-XX-XXXX
const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;

function validateSSN(ssn) {
    return ssnRegex.test(ssn);
}

// 10. Advanced: Data Extraction
const logEntry = "2025-08-03 14:30:22 [ERROR] User john.doe@email.com failed login from IP 192.168.1.100";

// TODO: Create regex patterns to extract different parts
const dateTimeRegex = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/;
const logLevelRegex = /\[(\w+)\]/;
const emailExtractRegex = /[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/;
const ipExtractRegex = /\b\d{1,3}(\.\d{1,3}){3}\b/;

function parseLogEntry(logString) {
    const timestampMatch = logString.match(dateTimeRegex);
    const levelMatch = logString.match(logLevelRegex);
    const emailMatch = logString.match(emailExtractRegex);
    const ipMatch = logString.match(ipExtractRegex);

    return {
        timestamp: timestampMatch ? timestampMatch[1] : null,
        level: levelMatch ? levelMatch[1] : null,
        email: emailMatch ? emailMatch[0] : null,
        ip: ipMatch ? ipMatch[0] : null,
        message: logString
            .replace(dateTimeRegex, '')
            .replace(logLevelRegex, '')
            .replace(emailExtractRegex, '')
            .replace(ipExtractRegex, '')
            .replace(/\s+/g, ' ')
            .trim()
    };
}

// 11. Form Validation Suite
// TODO: Create comprehensive form validator
function validateForm(formData) {
    const errors = {};

    if (!validateEmail(formData.email)) errors.email = "Invalid email";
    if (!validatePhone(formData.phone)) errors.phone = "Invalid phone number";
    const pwdResult = validatePassword(formData.password);
    if (!pwdResult.isValid) errors.password = Weak password: missing ${pwdResult.missing.join(", ")};
    if (!validateUsername(formData.username)) errors.username = "Invalid username";
    if (!validateURL(formData.website)) errors.website = "Invalid website URL";

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// 12. Advanced Patterns
// TODO: Create regex for these complex patterns:

// Hex color codes (#RGB or #RRGGBB)
const hexColorRegex = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;

// Time in 12-hour format (1:00 AM, 12:30 PM)
const timeRegex = /^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/i;

// Money amounts ($1,234.56, $0.99, $1000)
const moneyRegex = /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$|^\$?\d+(\.\d{2})?$/;

// File extensions (.jpg, .jpeg, .png, .gif)
const imageExtRegex = /\.(jpg|jpeg|png|gif)$/i;

// 13. Real-world Challenge: Input Sanitization
function sanitizeInput(input) {
    return input
        .replace(/<script.?>.?<\/script>/gis, '')
        .replace(/javascript:/gi, '')
        .replace(/\s*on\w+\s*=\s*(['"]).*?\1/gi, '')
        .replace(/alert\s*\(.*?\)/gi, '')
        .replace(/eval\s*\(.*?\)/gi, '')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .trim();
}

// Test Suite (uncomment sections as you complete them):
/*
// Test emails
const testEmails = ['user@domain.com', 'invalid-email', 'test@sub.domain.co.uk'];
testEmails.forEach(email => 
    console.log(${email}: ${validateEmail(email)})
);

// Test phones
const testPhones = ['(555) 123-4567', '555-123-4567', '123-4567'];
testPhones.forEach(phone => 
    console.log(${phone}: ${validatePhone(phone)})
);

// Test passwords
const testPasswords = ['weakpass', 'StrongPass123!', 'NoSpecial123'];
testPasswords.forEach(password => 
    console.log(${password}: ${JSON.stringify(validatePassword(password))})
);

// Test credit cards
const testCards = ['4111111111111111', '5555555555554444', '378282246310005'];
testCards.forEach(card => 
    console.log(${card}: ${JSON.stringify(validateCreditCard(card))})
);

// Test log parsing
console.log('Log parsing:', parseLogEntry(logEntry));

// Test form validation
const sampleForm = {
    email: 'user@test.com',
    phone: '555-123-4567',
    password: 'Test123!',
    username: 'testuser',
    website: 'https://example.com'
};
console.log('Form validation:', validateForm(sampleForm));
*/

// BONUS CHALLENGES:
// 1. Create regex that validates ISBN-10 and ISBN-13
// 2. Create regex for postal codes (US ZIP and international)
// 3. Create regex for license plates (various US state formats)
// 4. Create regex for matching hashtags in social media text
// 5. Create regex for parsing CSV lines with quoted fields

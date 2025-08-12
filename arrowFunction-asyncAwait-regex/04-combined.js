// PRACTICAL CHALLENGES - Combining All Concepts
// These exercises combine arrow functions, async/await, and regex
// Complete the TODOs and test in browser console

console.log("=== PRACTICAL CHALLENGES ===");

// CHALLENGE 1: User Registration System
// TODO: Build a complete user registration validator
const registrationValidators = {
    // TODO: Create validation functions using arrow functions and regex
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    
    password: (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(password),
    
    confirmPassword: (password, confirm) => password === confirm,
    
    username: (username) => /^[A-Za-z0-9_]{3,20}$/.test(username),
    
    age: (age) => Number.isInteger(age) && age >= 18 && age <= 120
};

// TODO: Create async function to check if username is available
async function checkUsernameAvailability(username) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 1000) + 1000;
        setTimeout(() => {
            const takenUsernames = ["shivani", "Navya", "Geetha"];
            resolve(!takenUsernames.includes(username.toLowerCase()));
        }, delay);
    });
}

// TODO: Complete registration function
async function registerUser(userData) {
    const errors = [];

    // Validation
    if (!registrationValidators.email(userData.email)) {
        errors.push("Invalid email format.");
    }
    if (!registrationValidators.password(userData.password)) {
        errors.push("Password must be more than characters, with upper, lower, number, symbol.");
    }
    if (!registrationValidators.confirmPassword(userData.password, userData.confirmPassword)) {
        errors.push("Passwords do not match.");
    }
    if (!registrationValidators.username(userData.username)) {
        errors.push("Username must be 3-20 chars, alphanumeric && underscore.");
    }
    if (!registrationValidators.age(userData.age)) {
        errors.push("Age must be a number between 18 and 120.");
    }

    // Check username availability if username is valid
    if (errors.length === 0) {
        const available = await checkUsernameAvailability(userData.username);
        if (!available) errors.push("Username is already taken.");
    }

    return {
        success: errors.length === 0,
        errors: errors,
        message: errors.length === 0 ? "Registration successful!" : "Registration failed."
    };
}

// CHALLENGE 2: Data Processing Pipeline
// TODO: Build a data processing system
class DataProcessor {
    constructor() {
        // TODO: Initialize with validation patterns
        this.patterns = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phoneDigits: /\d/g
        };
    }
    
    // TODO: Clean and validate email list
    async processEmailList(emails) {
        return [...new Set(
            emails
                .map(email => email.trim().toLowerCase())
                .filter(email => this.patterns.email.test(email))
        )].sort();
    }
    
    // TODO: Process phone numbers
    async processPhoneNumbers(phones) {
        return phones
            .map(phone => {
                const digits = phone.match(this.patterns.phoneDigits) || [];
                if (digits.length === 10) {
                    return `(${digits.slice(0,3).join('')}) ${digits.slice(3,6).join('')}-${digits.slice(6).join('')}`;
                }
                return null;
            })
            .filter(Boolean);
    }
    
    // TODO: Batch process with progress tracking
    async batchProcess(data, processingFunction) {
        const chunkSize = 10;
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            try {
                const result = await processingFunction(chunk);
                console.log(`Processed chunk ${i / chunkSize + 1}:`, result);
            } catch (err) {
                console.error(`Error processing chunk ${i / chunkSize + 1}:`, err);
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}

// CHALLENGE 3: Log Analysis System
// TODO: Build a log analyzer
const logPatterns = {
    error: /\[ERROR\]/,
    warning: /\[WARN\]/,
    info: /\[INFO\]/,
    timestamp: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,
    ipAddress: /\b\d{1,3}(?:\.\d{1,3}){3}\b/,
    userAgent: /-\s(.+)$/,
    statusCode: /\s(\d{3})\s-/,
    requestPath: /\b(GET|POST|PUT|DELETE)\s([^\s]+)/
};

// Sample log data
const sampleLogs = [
    '2025-08-03 14:30:22 [ERROR] User authentication failed for user@test.com from 192.168.1.100',
    '2025-08-03 14:30:25 [WARN] Rate limit exceeded for IP 10.0.0.5',
    '2025-08-03 14:30:30 [INFO] GET /api/users/123 200 - Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    '2025-08-03 14:30:35 [ERROR] Database connection timeout after 30s',
    '2025-08-03 14:30:40 [INFO] POST /api/login 401 - curl/7.68.0'
];

// TODO: Implement log analyzer
async function analyzeLogs(logs) {
    const summary = {
        total: logs.length,
        errors: [],
        warnings: [],
        infos: [],
        uniqueIPs: new Set(),
        errorTypes: {}
    };

    for (const log of logs) {
        // Categorize by level
        if (logPatterns.error.test(log)) summary.errors.push(log);
        if (logPatterns.warning.test(log)) summary.warnings.push(log);
        if (logPatterns.info.test(log)) summary.infos.push(log);

        // Extracting IP Address
        const ipMatch = log.match(logPatterns.ipAddress);
        if (ipMatch) summary.uniqueIPs.add(ipMatch[0]);

        // Extracting the error types
        if (logPatterns.error.test(log)) {
            const errorMessage = log.replace(logPatterns.timestamp, "")
                                    .replace(/\[ERROR\]\s*/, "").trim();
            summary.errorTypes[errorMessage] = 
                (summary.errorTypes[errorMessage] || 0) + 1;
        }
    }

    return {
        totalLogs: summary.total,
        errorCount: summary.errors.length,
        warningCount: summary.warnings.length,
        infoCount: summary.infos.length,
        uniqueIPCount: summary.uniqueIPs.size,
        uniqueIPs: [...summary.uniqueIPs],
        errorTypes: summary.errorTypes
    };
}

// CHALLENGE 4: Real-time Data Validator
// TODO: Create a streaming data validator
class StreamValidator {
    constructor(rules) {
        this.rules = rules;
        this.stats = {
            processed: 0,
            valid: 0,
            invalid: 0,
            errors: []
        };
    }
    
    // Validate single record
    validateRecord = (record) => {
        const errors = [];

        // Apply all validation rules
        this.rules.forEach((rule, index) => {
            try {
                if (!rule(record)) {
                    errors.push(`Rule ${index + 1} failed`);
                }
            } catch (err) {
                errors.push(`Rule ${index + 1} error: ${err.message}`);
            }
        });

        // If no errors, record is valid
        return {
            valid: errors.length === 0,
            errors
        };
    }
    
    // Process stream of data
    async processStream(dataStream) {
        for (const record of dataStream) {
            this.stats.processed++;

            const result = this.validateRecord(record);

            if (result.valid) {
                this.stats.valid++;
            } else {
                this.stats.invalid++;
                this.stats.errors.push({ record, errors: result.errors });
            }

            // Simulate processing delay (500ms)
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    
    // Generate validation report
    generateReport = () => ({
        totalProcessed: this.stats.processed,
        validCount: this.stats.valid,
        invalidCount: this.stats.invalid,
        errorDetails: this.stats.errors
    });
}

// CHALLENGE 5: API Integration with Retry Logic
// TODO: Build robust API client
class APIClient {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.timeout = options.timeout || 5000; // default 5s timeout
        this.maxRetries = options.maxRetries || 3;

        // Request interceptor (example: log all requests)
        this.requestInterceptor = (url, opts) => {
            console.log(`[Request] ${opts.method || 'GET'} ${url}`);
            return { url, opts };
        };

        // Response interceptor (example: log status)
        this.responseInterceptor = (res) => {
            console.log(`[Response] Status: ${res.status}`);
            return res;
        };
    }

    // Core request method with retry + timeout
    async request(endpoint, options = {}) {
        let attempt = 0;
        let lastError;

        while (attempt < this.maxRetries) {
            try {
                attempt++;

                const url = `${this.baseURL}${endpoint}`;
                const { url: interceptedURL, opts } = this.requestInterceptor(url, options);

                // Implement timeout with Promise.race
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const response = await Promise.race([
                    fetch(interceptedURL, { ...opts, signal: controller.signal }),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error("Request timeout")), this.timeout)
                    )
                ]);

                clearTimeout(timeoutId);

                const finalResponse = this.responseInterceptor(response);

                // Validate response format
                if (!finalResponse.ok) {
                    throw new Error(`HTTP error ${finalResponse.status}`);
                }

                // Assume JSON response
                const data = await finalResponse.json();
                return data;

            } catch (err) {
                lastError = err;
                console.warn(`Attempt ${attempt} failed: ${err.message}`);

                if (attempt < this.maxRetries) {
                    // Exponential backoff
                    const delay = 500 * Math.pow(2, attempt - 1);
                    console.log(`Retrying in ${delay}ms...`);
                    await new Promise(res => setTimeout(res, delay));
                }
            }
        }

        throw lastError;
    }

    // GET request helper
    get = async (endpoint) => {
        return this.request(endpoint, { method: "GET" });
    }

    // POST request helper
    post = async (endpoint, data) => {
        if (!data || typeof data !== "object") {
            throw new Error("POST data must be a valid object");
        }
        return this.request(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    // Batch requests with concurrency control
    async batchRequests(requests, concurrency = 3) {
        const results = [];
        const errors = [];

        let index = 0;
        const worker = async () => {
            while (index < requests.length) {
                const currentIndex = index++;
                const { endpoint, options } = requests[currentIndex];
                try {
                    const result = await this.request(endpoint, options);
                    results[currentIndex] = result;
                } catch (err) {
                    errors[currentIndex] = err.message;
                }
            }
        };

        // Run "concurrency" workers in parallel
        const workers = Array.from({ length: concurrency }, worker);
        await Promise.all(workers);

        return { results, errors };
    }
}

// CHALLENGE 6: Form Validation with Real-time Feedback
// TODO: Create comprehensive form validator
const formValidationRules = {
    email: [
        value => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            return { valid, message: valid ? "" : "Invalid email format." };
        }
    ],
    
    password: [
        value => {
            const valid = value.length >= 8;
            return { valid, message: valid ? "" : "Password must be at least 8 characters." };
        },
        value => {
            const valid = /[A-Z]/.test(value);
            return { valid, message: valid ? "" : "Password must include uppercase letter." };
        },
        value => {
            const valid = /[a-z]/.test(value);
            return { valid, message: valid ? "" : "Password must include lowercase letter." };
        },
        value => {
            const valid = /\d/.test(value);
            return { valid, message: valid ? "" : "Password must include a number." };
        },
        value => {
            const valid = /[^\w\s]/.test(value);
            return { valid, message: valid ? "" : "Password must include a special character." };
        }
    ],
    
    creditCard: [
        value => {
            const valid = /^\d{13,19}$/.test(value.replace(/\s+/g, ""));
            return { valid, message: valid ? "" : "Invalid credit card number." };
        },
        value => {
            // Basic card type detection by prefix
            let type = "Unknown";
            if (/^4/.test(value)) type = "Visa";
            else if (/^5[1-5]/.test(value)) type = "MasterCard";
            else if (/^3[47]/.test(value)) type = "American Express";
            return { valid: true, message: `Detected card type: ${type}` };
        }
    ],
    
    phone: [
        value => {
            const digits = value.replace(/\D/g, "");
            const valid = digits.length === 10;
            return { valid, message: valid ? "" : "Phone number must be 10 digits." };
        },
        value => {
            const digits = value.replace(/\D/g, "");
            const formatted = `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
            return { valid: true, message: `Formatted: ${formatted}` };
        }
    ]
};

// TODO: Real-time form validator
class FormValidator {
    constructor(rules) {
        this.rules = rules;
        this.cache = new Map(); // Cache results to avoid repeated validation
    }
    
    // Validate a single field value asynchronously
    validateField = async (fieldName, value) => {
        const cacheKey = `${fieldName}:${value}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        const fieldRules = this.rules[fieldName] || [];
        const results = [];

        for (const rule of fieldRules) {
            try {
                const result = await rule(value);  // rules could be async
                results.push(result);
            } catch (e) {
                results.push({ valid: false, message: "Validation error" });
            }
        }

        // Aggregate results: valid if all valid
        const valid = results.every(r => r.valid);
        const messages = results.filter(r => !r.valid).map(r => r.message);

        const validationResult = { valid, messages };

        this.cache.set(cacheKey, validationResult);
        return validationResult;
    }
    
    // Validate entire form data (object with fields)
    async validateForm(formData) {
        const entries = Object.entries(formData);
        const validations = entries.map(([field, value]) => this.validateField(field, value));

        const results = await Promise.all(validations);

        const errors = {};
        results.forEach((res, i) => {
            if (!res.valid) {
                errors[entries[i][0]] = res.messages;
            }
        });

        return {
            valid: Object.keys(errors).length === 0,
            errors
        };
    }
    
    // Create a debounced validator function
    createDebouncedValidator = (delay = 300) => {
        let timer;
        return (fieldName, value) => {
            return new Promise((resolve) => {
                clearTimeout(timer);
                timer = setTimeout(async () => {
                    const result = await this.validateField(fieldName, value);
                    resolve(result);
                }, delay);
            });
        };
    }
}

// CHALLENGE 7: Data Transformation Pipeline
// TODO: Build a data transformation system
const transformers = {
  cleanEmail: (email) => {
    if (typeof email !== 'string') return "";
    return email.trim().toLowerCase();
  },

  formatPhone: (phone) => {
    if (typeof phone !== 'string') return "";
    // Extract digits
    const digits = phone.match(/\d/g) || [];
    if (digits.length !== 10) return ""; // invalid phone length
    return `(${digits.slice(0,3).join('')}) ${digits.slice(3,6).join('')}-${digits.slice(6).join('')}`;
  },

  standardizeName: (name) => {
    if (typeof name !== 'string') return "";
    // Capitalize first letter of each word
    return name.trim().toLowerCase().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  },

  parseAddress: (address) => {
    if (typeof address !== 'string') return {};
    // Very simple parse by commas: street, city, state zip
    const parts = address.split(',').map(p => p.trim());
    const [street = "", city = "", stateZip = ""] = parts;
    const [state = "", zip = ""] = stateZip.split(' ').filter(Boolean);

    return { street, city, state, zip };
  }
};


async function transformData(rawData) {
  const transformed = [];
  let processedCount = 0;
  let errorCount = 0;

  for (const record of rawData) {
    try {
      const newRecord = {
        email: transformers.cleanEmail(record.email),
        phone: transformers.formatPhone(record.phone),
        name: transformers.standardizeName(record.name),
        address: transformers.parseAddress(record.address),
      };
      transformed.push(newRecord);
    } catch (err) {
      errorCount++;
      console.error("Error transforming record:", record, err);
    }
    processedCount++;
    
    // Progress update every 10 records
    if (processedCount % 10 === 0) {
      console.log(`Processed ${processedCount} records`);
      // simulate async delay
      await new Promise(res => setTimeout(res, 100));
    }
  }

  return {
    transformed,
    stats: {
      total: processedCount,
      errors: errorCount,
      success: processedCount - errorCount,
    }
  };
}

// TESTING FRAMEWORK
// TODO: Create simple testing utilities
const testRunner = {
    tests: [],
    
    // TODO: Add test case
    add: (name, testFn) => {
        // TODO: Add test to collection
    },
    
    // TODO: Run all tests
    runAll: async () => {
        // TODO: Execute all tests
        // TODO: Report results
        // TODO: Handle async tests
    }
};

// SAMPLE TEST CASES
// TODO: Add test cases for your implementations
/*
testRunner.add('Email validation', () => {
    // TODO: Test email validation with various inputs
});

testRunner.add('Phone formatting', () => {
    // TODO: Test phone number formatting
});

testRunner.add('User registration', async () => {
    // TODO: Test complete registration flow
});

// Run tests
testRunner.runAll();
*/

// INTEGRATION CHALLENGE
// TODO: Combine everything into a complete user management system
async function completeUserManagement() {
  // 1. Fetch user data from API (simulated here with sample data)
  const fetchUsers = async () => {
    return [
      { email: "User1@example.COM ", age: 25, username: "user1" },
      { email: "invalid-email", age: 17, username: "user2" },
      { email: "user3@example.com", age: 30, username: "user3" },
      { email: "user4@sample.com", age: 19, username: "admin" } // reserved username
    ];
  };

  // 2. Validate & clean data
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanAndValidate = user => {
    const email = user.email.trim().toLowerCase();
    const validEmail = emailRegex.test(email);
    const validAge = Number.isInteger(user.age) && user.age >= 18;
    const validUsername = typeof user.username === "string" && user.username.length >= 3;
    return {
      cleaned: { ...user, email },
      valid: validEmail && validAge && validUsername,
      errors: [
        !validEmail && "Invalid email",
        !validAge && "Age must be 18+",
        !validUsername && "Username too short"
      ].filter(Boolean)
    };
  };

  // 3. Process in batches (chunk size 2)
  const processBatch = async batch => {
    // Simulate async processing delay
    await new Promise(res => setTimeout(res, 500));
    return batch.map(cleanAndValidate);
  };

  // Main
  try {
    const users = await fetchUsers();

    const batchSize = 2;
    let results = [];
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      const processed = await processBatch(batch);
      results = results.concat(processed);
    }

    // 4. Generate report
    const validUsers = results.filter(r => r.valid).map(r => r.cleaned);
    const invalidUsers = results.filter(r => !r.valid);

    console.log("Valid users:", validUsers);
    console.log("Invalid users and errors:", invalidUsers);

    // 5. All errors handled with try/catch and validation checks
  } catch (error) {
    console.error("Error in user management:", error);
  }
}

console.log("Practical challenges loaded. Complete TODOs step by step.");
console.log("Test each challenge independently before moving to the next.");

// TRAINER NOTES:
/*
These challenges are designed to:
1. Reinforce individual concepts
2. Show real-world applications
3. Combine all three topics naturally
4. Progressively increase difficulty
5. Include proper error handling throughout

Encourage students to:
- Test each function individually
- Use console.log for debugging
- Handle edge cases
- Think about performance
- Consider user experience

Common areas where students struggle:
- Combining arrow functions with async/await
- Proper error handling in async code
- Understanding regex lookaheads/lookbehinds
- Managing complex validation flows
*/

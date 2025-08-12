// ASYNC/AWAIT TRAINING EXERCISES
// Complete the TODOs below. Test in browser console.

console.log("=== ASYNC/AWAIT EXERCISES ===");

// 1. Basic Promise to Async/Await Conversion
// TODO: Convert this Promise chain to async/await
function fetchUserData() {
    return fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
        .then(data => {
            console.log('User data:', data.name);
            return data;
        })
        .catch(error => console.error('Error:', error));
}

async function fetchUserDataAsync() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        console.log('User data:', data.name);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// 2. Multiple Async Operations
// TODO: Create async function that fetches user and their posts
async function fetchUserWithPosts(userId) {
    try {
        const userResponse = await fetch(https://jsonplaceholder.typicode.com/users/${userId});
        const user = await userResponse.json();

        const postsResponse = await fetch(https://jsonplaceholder.typicode.com/posts?userId=${userId});
        const posts = await postsResponse.json();

        return { user, posts };
    } catch (error) {
        console.error('Error fetching user or posts:', error);
        return null;
    }
}

// 3. Parallel vs Sequential Execution
// TODO: Implement both approaches
async function sequentialFetch() {
    const startTime = Date.now();
    const user1 = await fetch('https://jsonplaceholder.typicode.com/users/1').then(res => res.json());
    const user2 = await fetch('https://jsonplaceholder.typicode.com/users/2').then(res => res.json());
    const user3 = await fetch('https://jsonplaceholder.typicode.com/users/3').then(res => res.json());
    console.log('Sequential users:', user1.name, user2.name, user3.name);
    const endTime = Date.now();
    console.log(Sequential time: ${endTime - startTime}ms);
}

async function parallelFetch() {
    const startTime = Date.now();
    const urls = [
        'https://jsonplaceholder.typicode.com/users/1',
        'https://jsonplaceholder.typicode.com/users/2',
        'https://jsonplaceholder.typicode.com/users/3'
    ];
    const fetches = urls.map(url => fetch(url).then(res => res.json()));
    const [user1, user2, user3] = await Promise.all(fetches);
    console.log('Parallel users:', user1.name, user2.name, user3.name);
    const endTime = Date.now();
    console.log(Parallel time: ${endTime - startTime}ms);
}

// 4. Error Handling Patterns
// TODO: Complete this function with proper error handling
async function robustDataFetch(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Primary failed');
        return await response.json();
    } catch (error1) {
        console.warn('Primary failed, trying backup...');
        try {
            const responseBackup = await fetch(url + '?backup=true');
            if (!responseBackup.ok) throw new Error('Backup failed');
            return await responseBackup.json();
        } catch (error2) {
            return { error: 'Data unavailable' };
        }
    }
}

// 5. Async/Await with Array Methods
const userIds = [1, 2, 3, 4, 5];

// TODO: Implement async function that processes array of IDs
async function processUserIds(ids) {
    const results = await Promise.all(ids.map(async id => {
        try {
            const response = await fetch(https://jsonplaceholder.typicode.com/users/${id});
            const user = await response.json();
            return { name: user.name, email: user.email };
        } catch (e) {
            return { name: 'Unknown', email: 'N/A' };
        }
    }));
    return results;
}

// 6. Custom Promise with Async/Await
// TODO: Create a function that simulates async operation
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function countdownTimer(seconds) {
    for (let i = seconds; i >= 0; i--) {
        console.log(i);
        await delay(1000);
    }
    console.log('Done!');
}

// 7. Advanced: Race Conditions and Timeouts
// TODO: Implement fetch with timeout
async function fetchWithTimeout(url, timeoutMs = 5000) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
    });
    const fetchPromise = fetch(url).then(res => res.json());
    return Promise.race([fetchPromise, timeout]);
}

// 8. Async Generators (Advanced)
// TODO: Create async generator that yields data progressively
async function* dataStream() {
    for (let i = 1; i <= 5; i++) {
        const response = await fetch(https://jsonplaceholder.typicode.com/users/${i});
        const user = await response.json();
        yield user;
        await delay(1000);
    }
}

// 9. Error Recovery Patterns
// TODO: Implement retry logic
async function fetchWithRetry(url, maxRetries = 3) {
    let attempts = 0;
    let lastError;

    while (attempts < maxRetries) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed');
            return await response.json();
        } catch (error) {
            lastError = error;
            attempts++;
            const wait = 2 ** attempts * 100; // exponential backoff
            console.log(Retrying in ${wait}ms...);
            await delay(wait);
        }
    }

    throw lastError;
}


// 10. Real-world Scenario
// TODO: Build a complete data processing pipeline
async function buildUserReport() {
    try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await usersResponse.json();

        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await postsResponse.json();

        const report = users.map(user => {
            const userPosts = posts.filter(p => p.userId === user.id);
            return {
                name: user.name,
                totalPosts: userPosts.length
            };
        });

        const totalPosts = posts.length;
        const avgPosts = totalPosts / users.length;

        return {
            totalUsers: users.length,
            totalPosts,
            avgPostsPerUser: avgPosts.toFixed(2),
            report
        };
    } catch (error) {
        console.error('Failed to build report:', error);
        return { error: 'Could not generate report' };
    }
}

// Testing Functions (uncomment after completing TODOs):
/*
// Test basic functions
fetchUserDataAsync();

// Test parallel vs sequential
sequentialFetch();
parallelFetch();

// Test user processing
processUserIds([1, 2, 3]).then(users => 
    console.log('Processed users:', users)
);

// Test countdown
countdownTimer(3);

// Test async generator
(async () => {
    for await (const user of dataStream()) {
        console.log('Streamed user:', user.name);
    }
})();

// Test complete pipeline
buildUserReport().then(report => 
    console.log('User report:', report)
);
*/

// CHALLENGE: Combine all concepts
// TODO: Create an async function that uses arrow functions, proper error handling,
// and processes data from multiple API endpoints to create a dashboard summary

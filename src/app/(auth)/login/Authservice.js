// ============================================
// FAKE AUTHENTICATION UTILITY
// This file contains mock authentication logic
// Replace with real API calls when backend is ready
// ============================================

// Mock user database
export const FAKE_USERS = [
    {
        id: 1,
        username: '010101011',
        password: 'admin123',
        name: 'admin admin',
        email: 'admin@rda.gov.ge',
        role: 'admin'
    },
    {
        id: 2,
        username: '010101012',
        password: 'password123',
        name: 'moder',
        email: 'nino.gelashvili@rda.gov.ge',
        role: 'user'
    },
    {
        id: 3,
        username: '010101013',
        password: 'test123',
        name: 'ტესტ მომხმარებელი',
        email: 'test@email.com',
        role: 'user'
    }
];

/**
 * Fake login function - simulates API call
 * @param {string} username - Username or email or personal ID
 * @param {string} password - User password
 * @returns {Promise} Resolves with user data or rejects with error
 */
export const fakeLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        // Simulate network delay (500ms - 1500ms)
        const delay = Math.random() * 1000 + 500;

        setTimeout(() => {
            // Find user in fake database
            const user = FAKE_USERS.find(
                u => (u.username === username || u.email === username) && u.password === password
            );

            if (user) {
                // Success - return user data (without password)
                const { password: _, ...userWithoutPassword } = user;
                resolve({
                    success: true,
                    user: userWithoutPassword,
                    token: `fake_token_${user.id}_${Date.now()}`, // Fake JWT token
                    message: 'შესვლა წარმატებული'
                });
            } else {
                // Failure - return error
                reject({
                    success: false,
                    message: 'არასწორი მომხმარებელი ან პაროლი',
                    error: 'INVALID_CREDENTIALS'
                });
            }
        }, delay);
    });
};

/**
 * Fake registration function
 * @param {object} userData - User registration data
 * @returns {Promise} Resolves with new user data or rejects with error
 */
export const fakeRegister = (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Check if user already exists
            const exists = FAKE_USERS.find(
                u => u.username === userData.username || u.email === userData.email
            );

            if (exists) {
                reject({
                    success: false,
                    message: 'მომხმარებელი უკვე არსებობს',
                    error: 'USER_EXISTS'
                });
            } else {
                // Create new user
                const newUser = {
                    id: FAKE_USERS.length + 1,
                    ...userData,
                    role: 'user'
                };

                // In real app, this would save to database
                FAKE_USERS.push(newUser);

                const { password: _, ...userWithoutPassword } = newUser;
                resolve({
                    success: true,
                    user: userWithoutPassword,
                    token: `fake_token_${newUser.id}_${Date.now()}`,
                    message: 'რეგისტრაცია წარმატებული'
                });
            }
        }, 1000);
    });
};

/**
 * Store user session in localStorage
 */
export const storeSession = (user, token) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('authToken', token);
    localStorage.setItem('loginTime', new Date().toISOString());
};

/**
 * Get current user from localStorage
 */
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
};

/**
 * Get auth token from localStorage
 */
export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
    return !!getAuthToken() && !!getCurrentUser();
};

/**
 * Logout user - clear session
 */
export const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('loginTime');
};

// ============================================
// REAL API IMPLEMENTATION (COMMENTED OUT)
// Uncomment and modify when backend is ready
// ============================================

/*
export const realLogin = async (username, password) => {
  try {
    const response = await fetch('https://api.rda.gov.ge/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    throw {
      success: false,
      message: error.message || 'სერვერთან დაკავშირება ვერ მოხერხდა',
      error: error
    };
  }
};

export const realRegister = async (userData) => {
  try {
    const response = await fetch('https://api.rda.gov.ge/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw {
      success: false,
      message: error.message || 'სერვერთან დაკავშირება ვერ მოხერხდა',
      error: error
    };
  }
};
*/
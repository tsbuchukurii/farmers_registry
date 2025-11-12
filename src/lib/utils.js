
/**
 * Check if user has required role
 */
export function hasRole(userRole, allowedRoles) {
    if (!userRole || !allowedRoles) return false;
    return allowedRoles.includes(userRole);
}

/**
 * Check if user can perform action based on role
 */
export function canPerformAction(userRole, action) {
    const permissions = {
        admin: ["create", "read", "update", "delete", "manage_users", "view_analytics"],
        manager: ["create", "read", "update", "view_analytics"],
        user: ["read", "update_own"]
    };

    return permissions[userRole]?.includes(action) || false;
}

/**
 * Format user role for display
 */
export function formatRole(role) {
    const roleMap = {
        admin: "Administrator",
        manager: "Manager",
        user: "User"
    };

    return roleMap[role] || role;
}

/**
 * Get role badge color
 */
export function getRoleBadgeColor(role) {
    const colorMap = {
        admin: "bg-red-100 text-red-800",
        manager: "bg-blue-100 text-blue-800",
        user: "bg-green-100 text-green-800"
    };

    return colorMap[role] || "bg-gray-100 text-gray-800";
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strength = {
        isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
        feedback: []
    };

    if (password.length < minLength) {
        strength.feedback.push(`Password must be at least ${minLength} characters`);
    }
    if (!hasUpperCase) {
        strength.feedback.push("Add uppercase letters");
    }
    if (!hasLowerCase) {
        strength.feedback.push("Add lowercase letters");
    }
    if (!hasNumbers) {
        strength.feedback.push("Add numbers");
    }
    if (!hasSpecialChar) {
        strength.feedback.push("Consider adding special characters for extra security");
    }

    return strength;
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error) {
    if (error.response) {
        // Server responded with error
        return {
            message: error.response.data?.message || "An error occurred",
            status: error.response.status,
            details: error.response.data
        };
    } else if (error.request) {
        // Request made but no response
        return {
            message: "No response from server. Please check your connection.",
            status: 0
        };
    } else {
        // Something else happened
        return {
            message: error.message || "An unexpected error occurred",
            status: -1
        };
    }
}
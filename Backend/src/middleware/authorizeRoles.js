import ErrorHandler from "../utils/errorHandler"; // Import custom error handler

// Middleware to authorize users based on their roles
const authorizeRoles = (...allowedRoles) => {

    return (req, res, next) => {

        // Ensure authenticated user exists
        if (!req.user) {
            return next(new ErrorHandler("Unauthorized! Please login again.", 401));
        }

        // Check if the user has at least one of the allowed roles
        const hasAccess = req.user.roles.some((role) =>
            allowedRoles.includes(role)
        );

        // If user doesn't have the required role, deny access
        if (!hasAccess) {
            return next(
                new ErrorHandler("You don't have permission to access this resource.", 403)
            );
        }

        // User is authorized, continue to the next middleware/controller
        next();

    };

};




export default authorizeRoles; // Export middleware
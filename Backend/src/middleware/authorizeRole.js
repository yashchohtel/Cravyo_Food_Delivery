import ErrorHandler from "../utils/errorHandler.js";

// Authorize user based on allowed roles
export const authorizeRole = (...allowedRoles) => {

    return (req, res, next) => {

        // Check authentication
        if (!req.user) {
            return next(new ErrorHandler("Not authorized", 401));
        }

        // Check role permission
        const hasPermission = req.user.roles.some((role) =>
            allowedRoles.includes(role)
        );

        // Reject unauthorized role
        if (!hasPermission) {
            return next(new ErrorHandler("Access denied", 403));
        }

        // go to next middleware
        next();

    };

};
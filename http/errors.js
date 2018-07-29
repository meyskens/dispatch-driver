export default function ({ app }) {
    app.use(function (err, req, res, next) {
        if (err.name === "UnauthorizedError" && err.message === "jwt expired") {
            return res.status(419).json({
                result: "error",
                error: "Your session has expired.",
            });
        }

        if (err.name === "UnauthorizedError") {
            return res.status(401).json({
                result: "error",
                error: "You are not authenticated.",
            });
        }

        if (err.name === "NotFoundError") {
            return res.status(404).json({
                result: "error",
                error: err.message || "Not found",
            });
        }

        if (err.name === "BadRequestError") {
            return res.status(400).json({
                result: "error",
                error: err.message || "Missing information",
            });
        }

        if (err.name === "AccessDeniedError") {
            return res.status(403).json({
                result: "error",
                error: err.message || "Access denied",
            });
        }
        res.status(500);
        if (req.accepts("json")) {
            return res.json({
                result: "error",
                error: err.message,
            });
        }
        return res.send(err.message);
    });
}
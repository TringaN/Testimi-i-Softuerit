import jwt from "jsonwebtoken";

// Middleware për të gjithë user-at (kontrollon token)
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ruaj info të user-it (id, role)
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

// Middleware vetëm për admin
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied, admin only" });
  }
  next();
};

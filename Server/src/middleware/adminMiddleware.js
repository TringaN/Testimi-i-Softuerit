// middleware/adminMiddleware.js
export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // lejo qasjen
  } else {
    return res.status(403).json({ error: "Access denied. Admins only!" });
  }
};

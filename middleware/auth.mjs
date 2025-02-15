import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const adminAuthMiddleware = async (req, res, next) => {
    console.log(jwtSecret);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ errorMessage: "Unauthorized request. Login again to continue" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      console.log(token, jwtSecret);
      const decoded = jwt.verify(token, jwtSecret);
      const admin = await AdminLoginCredentials.findByPk(decoded.userName);
  
      if (!admin) {
        return res
          .status(401)
          .json({ errorMessage: "AdminLoginCredentials not found" });
      }
  
      req.admin = admin;
      next();
    } catch (error) {
      return res.status(401).json({ errorMessage: "Invalid token" });
    }
  };
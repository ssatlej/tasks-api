import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_SECRET, NODE_ENV } from "../config.js";
import pool from "../database/index.js";

const auth = async (req, res, next) => {
    if(NODE_ENV !== 'production'){
      req.user.id = req?.body?.user || 1
    }
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({
        success: false,
        code: 403,
        message: "Access Denied: No token provided",
        status: "Forbidden",
      });
    }
  
    try {
      const tokenDetails = jwt.verify(token, ACCESS_TOKEN_SECRET);
      const result = await pool.query(
        "SELECT id, name, email, created_at FROM users WHERE id = $1",
        [tokenDetails.id]
      );
      req.user = result.rows[0];
      console.log(tokenDetails)
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({
          success: false,
          code: 403,
          message: "Access Denied: Token Expired",
          status: "Forbidden",
        });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json({
          success: false,
          code: 403,
          message: "Access Denied: Invalid token",
          status: "Forbidden",
        });
      } else console.log(err.name);
    }
  };

export default auth;
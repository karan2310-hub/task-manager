// Ab tak hum login kar rahe hain,
// par backend ko kaise pata chalega kaun user hai?

// 👉 JWT verify karna padega
import jwt from "jsonwebtoken";

export const verifyToken = (req) => {
  try {
    const authHeader = req.headers.get("authorization");//method-post,
    // body json.stringify.. and ek hota hai authorization   fe ke copde mai, api hit ke samay

    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];// token jo banaya tha usme 3 chej dali thi,
    //id secret expiry->  to[1] se secret wala cheej a jayega .. lekin sab sath tha tophle sp=lit use kiya hum logo ne

    const decoded = jwt.verify(token, "secret");

    return decoded; //agr dopno match kiye to return 
  } catch (err) {
    return null;
  }
};
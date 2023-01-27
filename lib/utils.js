import { jwtVerify } from "jose";

export const verifyToken = async (token) => {
  try {
    if (token) {
      // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const verified = await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      // return decodedToken?.issuer;
      return verified.payload && verified.payload?.issuer;
    }
  } catch (error) {
    return null;
  }
};

import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    return decodedToken?.issuer;
  }

  return null;
};

import { magicAdmin } from "../../lib/magic";
import jwt from "jsonwebtoken";
import { isNewUser } from "@/lib/db/hasura";

const login = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { authorization: auth } = req.headers;
      const didToken = auth ? auth.split(" ")[1] : "";

      if (didToken.length === 0) {
        throw new Error("Something went wrong");
      }

      const { issuer, ...metadata } = await magicAdmin.users.getMetadataByToken(
        didToken
      );

      console.log({ metadata });

      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": issuer,
          },
        },
        process.env.JWT_SECRET
      );

      console.log({ token });

      const isNewUserQuery = await isNewUser(token, issuer);

      return res.status(200).json({ done: true, isNewUserQuery });
    } catch (error) {
      console.log("Something went wrong logging in", error);
      return res.status(500).json({ done: false });
    }
  }

  res.status(404).json({ done: false });
};

export default login;

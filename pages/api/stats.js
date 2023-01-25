import jwt from "jsonwebtoken";
import { findVideoIdByUser } from "../../lib/db/hasura";

const stats = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { token } = req.cookies;
      const videoId = req.query.videoId;

      if (!token) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.issuer;
      const findedVideoId = await findVideoIdByUser(token, userId, videoId);

      return res
        .status(200)
        .json({ message: "Done", decodedToken, findedVideoId });
    } catch (error) {
      console.log("Error occurred /stats", error);
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.messge });
    }
  }

  res.status(403).json({ message: "Error" });
};

export default stats;

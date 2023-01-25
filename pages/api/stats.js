import jwt from "jsonwebtoken";
import { findVideoIdByUser, updateStats } from "../../lib/db/hasura";

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
      const doesStatsExists = await findVideoIdByUser(token, userId, videoId);

      if (doesStatsExists) {
        // update it
        const response = await updateStats(token, {
          videoId: "bKh2G73gCCs",
          userId,
          watched: true,
          favourited: 5,
        });

        return res.status(201).json({ message: "Done", updateStats: response });
      } else {
        // create it
      }

      // return res
      //   .status(200)
      //   .json({ message: "Done", decodedToken, doesStatsExists });
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

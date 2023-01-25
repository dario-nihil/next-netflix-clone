import jwt from "jsonwebtoken";
import {
  findVideoIdByUser,
  updateStats,
  insertStats,
} from "../../lib/db/hasura";

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
          videoId,
          userId,
          watched: true,
          favourited: 5,
        });

        return res.status(201).json({ message: "Done", updateStats: response });
      } else {
        // create it
        const response = await insertStats(token, {
          videoId,
          userId,
          watched: false,
          favourited: 0,
        });

        return res.status(201).json({ message: "Done", updateStats: response });
      }
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

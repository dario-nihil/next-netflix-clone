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
      console.log(req.body);
      const { videoId, favourited, watched = true } = req.body;
      console.log({ videoId });

      if (!videoId) {
        return res
          .status(500)
          .json({ message: "Something went wrong, videoId is required" });
      }

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
          watched,
          favourited,
        });

        return res.status(201).json({ response });
      } else {
        // create it
        const response = await insertStats(token, {
          videoId,
          userId,
          watched,
          favourited,
        });

        return res.status(201).json({ response });
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
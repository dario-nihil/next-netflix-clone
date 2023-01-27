import {
  findVideoIdByUser,
  updateStats,
  insertStats,
} from "../../lib/db/hasura";
import { verifyToken } from "../../lib/utils";

const stats = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { videoId } = req.method === "POST" ? req.body : req.query;

    if (!token) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!videoId) {
      return res
        .status(500)
        .json({ message: "Something went wrong, videoId is required" });
    }

    const userId = await verifyToken(token);
    const findVideo = await findVideoIdByUser(token, userId, videoId);
    const doesStatsExists = findVideo?.length > 0;

    if (req.method === "POST") {
      const { favourited, watched = true } = req.body;
      let response;

      if (doesStatsExists) {
        // update it
        response = await updateStats(token, {
          videoId,
          userId,
          watched,
          favourited,
        });
      } else {
        // create it
        response = await insertStats(token, {
          videoId,
          userId,
          watched,
          favourited,
        });
      }

      return res.status(201).json({ response });
    }

    if (req.method === "GET") {
      if (doesStatsExists) {
        return res.status(200).json({ findVideo });
      }

      return res.status(404).json({ video: null, msg: "Video not found" });
    }
  } catch (error) {
    console.log("Error occurred /stats", error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.messge });
  }

  res.status(403).json({ message: "Error" });
};

export default stats;

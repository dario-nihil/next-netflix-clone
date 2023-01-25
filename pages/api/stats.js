import jwt from "jsonwebtoken";
import { findVideoIdByUser } from "../../lib/db/hasura";

const stats = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log({ decoded });
      const userId = "did:ethr:0x1B82eEb77f0693a3D336AB8557B94FE5E6f28c9F";
      const videoId = "bKh2G73gCCs";

      const findedVideoId = await findVideoIdByUser(token, userId, videoId);

      console.log({ findedVideoId });

      return res.status(200).json({ message: "Done", decoded, findedVideoId });
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

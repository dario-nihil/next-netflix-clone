import jwt from "jsonwebtoken";

const stats = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { token } = req.cookies;
      if (!token) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log({ decoded });

      return res.status(200).json({ message: "Done", decoded });
    } catch (error) {
      console.log("Error occurred /stats", error);
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.messge });
    }
  }

  res.status(403).json({ message: "Error" });
};

export default stats;

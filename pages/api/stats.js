const stats = async (req, res) => {
  if (req.method === "POST") {
    const { token } = req.cookies;

    try {
      if (!token) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      return res.status(200).json({ message: "Done" });
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

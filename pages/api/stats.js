const stats = async (req, res) => {
  if (req.method === "POST") {
    res.status(200).json({ message: "Done" });
  }

  res.status(403).json({ message: "Error" });
};

export default stats;

const login = async (req, res) => {
  if (req.method === "POST") {
    try {
      res.status(200).json({ done: true });
    } catch (error) {
      console.log("Something went wrong logging in", error);
      res.status(500).json({ done: false });
    }
  }

  res.status(404).json({ done: false });
};

export default login;

import axios from "axios";

const IfoodControllers = {
  login: async (req, res) => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "kminchelle",
        password: "0lelplR",
        // expiresInMins: 60, // optional
      }),
    })
      .then((fetchRes) => fetchRes.json())
      .then((data) => res.status(200).json({ data }))
      .catch((error) => res.status(500).json({ error: error.message }));
  },
  loginAxios: async (req, res) => {
    try {
      const axiosPayload = {
        username: req.body.username,
        password: req.body.password,
      };
      const { data } = await axios.post(
        "https://dummyjson.com/auth/login",
        axiosPayload,
        {
          "Content-Type": "application/json",
        }
      );
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const { data } = await axios.get("https://dummyjson.com/products");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

export default IfoodControllers;

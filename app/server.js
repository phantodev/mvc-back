import express from "express";
import UsersRoutes from "./routes/usersRoutes.js";

const app = express();

const port = 4000;

app.use(express.json());

app.use("/api", UsersRoutes);

app.listen(port, () => {
  console.log("RODANDO SERVIDOR NODE!");
});

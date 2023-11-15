import express from "express";
import cors from "cors";
import UsersRoutes from "./routes/usersRoutes.js";
import UtilsRoutes from "./routes/utilsRoutes.js";
import IfoodRoutes from "./routes/ifoodRoutes.js";

const app = express();

const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/api", UsersRoutes);
app.use("/api", UtilsRoutes);
app.use("/api", IfoodRoutes);

app.listen(port, () => {
  console.log("RODANDO SERVIDOR NODE!");
});

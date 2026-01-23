import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contestantRoute from "./routes/contestantRoute";
import competitionRoute from "./routes/competitionRoute";
import routeRoute from "./routes/routeRoute";
import "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/competitions", competitionRoute);
app.use("/api/contestants", contestantRoute);
app.use("/api/routes", routeRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT:${PORT}`);
});

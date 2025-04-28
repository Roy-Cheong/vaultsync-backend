// src/server.ts
import express from "express";
import cors from "cors";
import secretsRouter from "./routes/secrets";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/secrets", secretsRouter);

app.get("/", (_req, res) => {
  res.send("VaultSync Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

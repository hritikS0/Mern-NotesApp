import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import notesRoutes from "./routes/notesRoute.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// Middleware
app.use(express.json());
//our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req url is ${req.url}`);
//   next();
// });
const __dirname = path.resolve();
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
// DB

connectDb().then(() => {
  // Start Server
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});

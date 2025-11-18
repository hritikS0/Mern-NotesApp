import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoute.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// Middleware
app.use(express.json());
//our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req url is ${req.url}`);
//   next();
// });

app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes);
// DB

connectDb().then(() => {
  // Start Server
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});

import express from "express";
import expressLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(expressLayouts);

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("layout", "layouts/main");

app.use("/", imageRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


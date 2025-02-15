import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./models/index.mjs";
import authMiddleware from "./middleware/auth.mjs";
import loginRoutes from "./routes/loginRoute.mjs";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/login", loginRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log(`Database ${process.env.DB_NAME} connected!`);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

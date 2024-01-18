import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { ItemRoute } from "./routes/itemRoute";
import { UnitCategoryRoute } from "./routes/unitCategoryRoute";
import { UnitRoute } from "./routes/unitRoute";
import { ItemCategoryRoute } from "./routes/itemCategoryRoute";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(express.json());

app.use("/api", ItemRoute);
app.use("/api", UnitCategoryRoute);
app.use("/api", UnitRoute);
app.use("/api", ItemCategoryRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server up and running... ${process.env.PORT}`);
});

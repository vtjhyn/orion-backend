import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import { verifyToken } from "./middleware/middleware";
import {
  AuthRoute,
  CategoryRoute,
  MaterialRoute,
  ProductRoute,
  RoleRoute,
  UnitRoute,
  UserRoute,
} from "./routes";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());

app.use(AuthRoute);
app.use(RoleRoute);

app.use(verifyToken)

app.use(CategoryRoute);
app.use(MaterialRoute);
app.use(ProductRoute);
app.use(UnitRoute);
app.use(UserRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server up and running... ${process.env.PORT}`);
});

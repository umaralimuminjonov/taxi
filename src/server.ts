import express from "express";
import cors from "cors";

import env from "./config/environments";
import loaders from "./loaders";
import routes from "./routes";
import { errorLogger, errorResponder } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.use(errorLogger);
app.use(errorResponder);

const run = async () => {
  await loaders();
  app.listen(env.PORT, () =>
    console.log(`Server started on the port ${env.PORT}`)
  );
};

run().catch(console.error);

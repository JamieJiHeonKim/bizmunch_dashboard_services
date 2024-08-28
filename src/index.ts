import express from "express"
import { registerComponents } from "./components"
import { config, errorHandler } from "./middleware"
import { printRoutes } from "./middleware/printRoutes";
import { lang } from "./@types/lang";
// import { CognitoExpress } from "cognito-express";

declare module "express-serve-static-core" {
  interface Request {
    language: lang;
    user: any;
  }
}

const app = express();

config(app);
registerComponents(app);
errorHandler(app);

const server = app.listen(process.env.PORT || 3001, function () {
  // const port = server.address().port
  console.log("App started at port:", process.env.PORT || 3001)
})

export default app;

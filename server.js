const { createServer } = require("http");
// const dotenv = require("dotenv");
const path = require("path");
const next = require("next");

// dotenv.config();
const app = next({
  dev: process.env.NODE_ENV !== "production",
});

const routes = require("./routes");
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err;
    console.log("Server is started on port 3000");
  });
});

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const routes = {
  "/api/auth": "http://localhost:5001/auth",
  "/api/users": "http://localhost:5001/users",
  "/api/msgs": "http://localhost:5000/msgs",
};

for (const route in routes) {
  const target = routes[route];
  app.use(route, createProxyMiddleware({ target, changeOrigin: true }));
}

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Api gateway listening at port : ${PORT}`);
});

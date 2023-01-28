const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/products", (req, res) => {
  res.send("getting products");
});

app.post("/products", (req, res) => {
  res.send("Creating products");
});

app.put("/products", (req, res) => {
  res.send("updating products");
});

app.delete("/products", (req, res) => {
  res.send("deleting products");
});

app.get("/products/:id", (req, res) => {
  res.send("getting a product by id");
});

app.listen(3000);
console.log(`Server on port ${3000}`);

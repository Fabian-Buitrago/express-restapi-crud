const express = require("express");
const morgan = require("morgan");

const app = express();
const products = [
  {
    id: 1,
    name: "Emilio",
    price: 5000,
  },
];

app.use(morgan("dev"));
app.use(express.json());

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  console.log(req.body);
  const newProduct = {
    ...req.body,
    id: products.length + 1,
  };

  products.push(newProduct);
  res.send(newProduct);
});

app.put("/products", (req, res) => {
  res.send("updating products");
});

app.delete("/products", (req, res) => {
  res.send("deleting products");
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const productFound = products.find((p) => p.id === parseInt(id));

  if (!productFound) {
    return res.status(400).json({
      message: "Product not found",
    });
  }
  res.json(productFound);
});

app.listen(3000);
console.log(`Server on port ${3000}`);

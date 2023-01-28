const express = require("express");
const morgan = require("morgan");

const app = express();
let products = [
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
  const newProduct = {
    ...req.body,
    id: products.length + 1,
  };

  products.push(newProduct);
  res.send(newProduct);
});

app.put("/products/:id", (req, res) => {
  const newData = req.body;
  const { id } = req.params;
  const productFound = products.find((p) => p.id === parseInt(id));

  if (!productFound) {
    return res.status(400).json({
      message: "Product not found",
    });
  }

  products = products.map((p) =>
    p.id === parseInt(id) ? { ...p, ...newData } : p
  );

  res.json({
    message: "Product updated successfully",
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const productFound = products.find((p) => p.id === parseInt(id));

  if (!productFound) {
    return res.status(400).json({
      message: "Product not found",
    });
  }

  products = products.filter((p) => p.id !== parseInt(id));
  res.sendStatus(204);
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

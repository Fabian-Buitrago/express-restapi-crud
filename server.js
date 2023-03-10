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

// Settings
app.set("appName", "Express Rest Api");
app.set("port", 3000);
//Use only when it is necessary to respect upper and lower case letters in the url
// app.set("case sensitive routing", true);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
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

app.listen(app.get("port"));
console.log(`Server ${app.get("appName")} on port ${app.get("port")}`);

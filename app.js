const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { connectToDB } = require("./connections/connectToDB");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const favouriteRoutes = require("./routes/favourite");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

app.use(cors());
app.use(express.json());

connectToDB(process.env.URI)
  .then(() => console.log("Successfully connected ..."))
  .catch(() => console.log("could not connect"));

app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/favourite", favouriteRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server Started ...");
});

const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000,
  socketTimeoutMS: 45000,
  family: 4,
});

// API Creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.filename}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for Images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Creating API for Deleting Products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  try {
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Product has been saved");
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.log("Error saving product:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Creating API for Deleting Products
app.post("/removeproducts", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product has been removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API for Getting All Products
app.get("/getallproduct", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products has been fetched");
  res.send(products);
});

// Schema creating for User model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating Endpoint for Registering the User
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, error: "Email Sudah Digunakan!" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

// Creating Endpoint for User Login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Password Salah" });
    }
  } else {
    res.json({ success: false, error: "Email Salah" });
  }
});

// Endpoint for New Collection
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  // lastProduct = products.length;
  // firstCollection = products.length - 2;
  // console.log(-lastProduct);
  // console.log(firstCollection);

  let newcollection = products.slice(products.length - 2);
  console.log("Koleksi Baru Berhasil Ditampilkan");
  res.send(newcollection);
});

// Endpoint for Popular Product
app.get("/popular", async (req, res) => {
  let products = await Product.find({});

  let popular = products.slice(0, 3);
  console.log("Produk Populer Berhasil Ditampilkan");
  res.send(popular);
});

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using valid token" });
    }
  }
};

// Endpoint for Add Product to Cart
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Berhasil ditambahkan", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Produk telah ditambahkan ke dalam keranjang");
  // console.log(req.body, req.user);
});

// Endpoint to remove product from cart
app.post("/removecart", fetchUser, async (req, res) => {
  console.log("Berhasil dihapus", req.body.itemId);

  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Produk telah dihapus dari keranjang");
});

// Endpoint to get cart
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("Get Cart");

  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port" + port);
  } else {
    console.log("Error: " + error);
  }
});

// Schema for Creating Products
// const Schema = mongoose.Schema;
// const ProductSchema = new Schema({
//   id: {
//     type: Number,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   new_price: {
//     type: Number,
//     required: true,
//   },
//   old_price: {
//     type: Number,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   available: {
//     type: Boolean,
//     default: true,
//   },
// });
// const Product = mongoose.model("Product", ProductSchema);

// app.post("/addproduct", async (req, res) => {
//   try {
//     await mongoose.connect(process.env.MONGODB_CONNECT_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//     const { id, name, image, category, new_price, old_price } = req.body;

//     console.log(id, name, image, category, new_price, old_price);

//     const product = new Product({
//       id,
//       name,
//       image,
//       category,
//       new_price,
//       old_price,
//     });
//     await product.save();
//     console.log("Data berhasil disimpan ke database");
//     // alert("Pesanan Anda Berhasil! Selamat Bersenang-senang!");
//     // res.redirect("/cart");
//   } catch (err) {
//     console.error("Tidak dapat menyimpan data ke database:", err);
//     res.status(500).send("Terjadi kesalahan saat menyimpan data ke database");
//   }
// });

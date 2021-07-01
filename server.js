import express from "express";
import mongoose from "mongoose";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middlewares

// db setup
const connection_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// api end points
app.get("/", (req, res) => res.status(200).send("hello world"));

// listener
app.listen(port, () => console.log("Started listener on port", port));

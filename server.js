import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";

// app config
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());

// db setup
const connection_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// api end points
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/api/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

// listener
app.listen(port, () => console.log("Started listener on port", port));

import express from "express";
import { createToDo, updatedToDo } from "../backend/types.js";
import mongoose from "mongoose";
import cors from 'cors';
const app = express();
const PORT = 3000;

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6"
  )
  .then(() => console.log("Connected To DB"))
  .catch((err) => console.error(err));

const User = mongoose.Schema({
  title: mongoose.Schema.Types.String,
  description: mongoose.Schema.Types.String,
  isCompleted: mongoose.Schema.Types.Boolean,
});

const ToDo = mongoose.model("ToDo", User);
app.use(express.json());
app.use(cors());

app.get("/todo", async (request, response) => {
  const todo = await ToDo.find({});
  return response.json(todo);
});

app.post("/todo", async (request, response) => {
  const createPayload = request.body;
  const parsedPayload = createToDo.safeParse(createPayload);

  if (!parsedPayload.success) {
    return response.status(411).json({
      msg: "Wrong Inputs",
    });
  }

  const newToDo = await new ToDo({
    title: createPayload.title,
    description: createPayload.description,
    isCompleted: false,
  });

  await newToDo.save();

  return response.status(201).json({
    msg: "Created Sucessfulyy",
  });
});

app.put("/completed", async (request, response) => {
  const updateToDo = request.body;
  const parsedPayload = updatedToDo.safeParse(updateToDo);

  if (!parsedPayload.success) {
    return response.status(400).json({
      msg: "wrong inputs",
    });
  }

  await ToDo.updateOne({_id : request.body._id} , {isCompleted : true});

  response.status(200).json({
    msg: "updated sucssefully",
  });
});

app.listen(PORT, () => {
  console.log("SERVER UP");
});

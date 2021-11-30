const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../Schemas/todoSchema");
const router = express.Router();

const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL TODOS
router.get("/:id", async (req, res) => {
  await Todo.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "You Got One Data by Id",
      });
    }
  });
});

// GET ALL TODOS BY ID
router.get("/", async (req, res) => {
  await Todo.find({ status: "inactive" })
    .select({
      _id: 0,
      date: 0,
    })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Todo was inserted successfully",
        });
      }
    });
});

// POST A TODOS
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully",
      });
    }
  });
});

// POST MULTIPLE TODOS
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(500).json({
        message: "Tods ware inserted successfully!",
      });
    }
  });
});

// PUT TODOS
router.put("/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
        title: "dfrsgdfgdfhfghfghgf, ",
      },
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error",
        });
      } else {
        res.status(500).json({
          message: "Tods ware updated!",
        });
      }
    }
  );
  console.log(result);
});

// DELETE TODOS
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        message: "Todo Was Deleted Successfully",
      });
    }
  });
});

module.exports = router;

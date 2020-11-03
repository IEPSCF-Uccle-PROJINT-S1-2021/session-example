const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("todo-list", { title: "Todo list", todos: req.session.todos });
});

router.post("/", (req, res) => {
  if (!req.session.todos) {
    req.session.todos = [];
  }
  const newTodoId = uuidv4();
  const newTodo = {
    id: newTodoId,
    text: req.body.text,
    deleteUrl: `/${newTodoId}/delete`,
  };
  req.session.todos.push(newTodo);
  res.redirect("/");
});

router.get("/:id/delete", (req, res, next) => {
  const todos = req.session.todos;
  const todoId = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    res.redirect("/");
  } else {
    next(createError(404, "ID not found"));
  }
});

module.exports = router;

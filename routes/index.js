const express = require("express");
const router = express.Router();
const createError = require("http-errors");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("todo-list", { title: "Todo list", todos: req.session.todos });
});

router.post("/", (req, res) => {
  if (!req.session.todos) {
    req.session.todos = [];
  }
  const newTodoId = req.app.locals.counter++;
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
  const todoId = Number.parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);
  todos.splice(todoIndex, 1);
  res.redirect("/");
});

module.exports = router;

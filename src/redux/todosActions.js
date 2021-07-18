import { createAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

const addTodo = createAction("todos/addTodo", (text) => ({
  payload: {
    id: uuidv4(),
    text,
    completed: false,
  },
}))

const deleteTodo = createAction("todos/deleteTodo")

const changeFilter = createAction("todos/changeFilter")

export default {
  addTodo,
  deleteTodo,
  changeFilter,
}

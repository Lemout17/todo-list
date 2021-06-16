import { Component } from "react"
import "./styles/base.scss"
import { v4 as uuidv4 } from "uuid"
import Title from "./components/Title"
import Container from "./components/Container"
import TodoEditor from "./components/TodoEditor"
import TodoList from "./components/TodoList"
import TodoFilter from "./components/TodoFilter"
import Modal from "./components/Modal"
import IconButton from "./components/IconButton"
import { ReactComponent as AddIcon } from "./svg/add.svg"

export default class App extends Component {
  state = {
    todos: [],
    filter: "",
    showModal: false,
  }
  componentDidMount() {
    const localTodos = localStorage.getItem("todos")
    const parsedTodos = JSON.parse(localTodos)
    if (parsedTodos) {
      this.setState({
        todos: parsedTodos,
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextTodos = this.state.todos
    const prevTodos = prevState.todos

    if (nextTodos !== prevTodos) {
      localStorage.setItem(
        "todos",
        JSON.stringify(nextTodos)
      )
    }

    if (
      nextTodos.length > prevTodos.length &&
      prevTodos.length !== 0
    ) {
      this.toggleModal()
    }
  }

  addTodo = (text) => {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
    }

    this.setState(({ todos }) => ({
      todos: [newTodo, ...todos],
    }))
  }

  deleteTodo = (todoId) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter(
        (todo) => todo.id !== todoId
      ),
    }))
  }

  toggleCompleted = (todoId) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) =>
        todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      ),
    }))
  }

  changeFilter = (e) => {
    this.setState({
      filter: e.target.value,
    })
  }

  getFilteredTodos = () => {
    const { todos, filter } = this.state
    const normalizedFilter = filter.toLowerCase()
    return todos
      .filter((todo) =>
        todo.text.toLowerCase().includes(normalizedFilter)
      )
      .sort((a, b) => a.text.localeCompare(b.text))
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  }

  render() {
    const { filter, showModal } = this.state
    const filteredTodos = this.getFilteredTodos()
    return (
      <div>
        <Title
          title={"The to do list to organize work & life"}
        />

        <Container>
          <IconButton
            onClick={this.toggleModal}
            aria-label="Add todo"
          >
            <AddIcon
              width="32px"
              height="32px"
              fill="#fff"
            />
          </IconButton>

          <TodoFilter
            value={filter}
            onChange={this.changeFilter}
          />
        </Container>

        <TodoList
          todos={filteredTodos}
          onDelete={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}
      </div>
    )
  }
}

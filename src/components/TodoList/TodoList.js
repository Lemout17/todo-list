import classNames from "classnames"
import "./TodoList.scss"
import { ReactComponent as Delete } from "../../svg/delete.svg"

const TodoList = ({
  todos,
  onDelete,
  onToggleCompleted,
}) => (
  <ul className="TodoList">
    {todos.map(({ text, id, completed }) => (
      <li
        key={id}
        className={classNames("TodoList-item", {
          "TodoList-item--completed": completed,
        })}
      >
        <input
          className="TodoList-checkbox"
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
        />
        <p className="TodoList-text">{text}</p>

        <Delete
          className="TodoList-btn"
          onClick={() => onDelete(id)}
          width="32px"
          height="32px"
          fill="#d32f2f"
        />
      </li>
    ))}
  </ul>
)

export default TodoList

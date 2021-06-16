import PropTypes from "prop-types"
import "./TodoFilter.scss"

const TodoFilter = ({ value, onChange }) => (
  <label className="TodoFilter-label">
    Filter by name
    <input
      className="TodoFilter-input"
      type="text"
      value={value}
      onChange={onChange}
    />
  </label>
)

TodoFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TodoFilter

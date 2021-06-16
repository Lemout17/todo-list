import { Component } from "react"
import "./TodoEditor.scss"

export default class TodoEditor extends Component {
  state = {
    message: "",
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.props.onSubmit(this.state.message)
    this.setState({
      message: "",
    })
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <form
          className="TodoEditor"
          onSubmit={this.handleSubmit}
        >
          <textarea
            className="TodoEditor-textarea"
            value={this.state.message}
            onChange={this.handleChange}
          ></textarea>
          <button
            className="TodoEditor-button"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    )
  }
}

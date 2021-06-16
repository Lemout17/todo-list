import { Component } from "react"
import { createPortal } from "react-dom"
import "./Modal.scss"

const modalRoot = document.querySelector("#modal-root")

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown)
  }
  componentWillUnmount() {
    window.removeEventListener(
      "keydown",
      this.handleKeydown
    )
  }

  handleKeydown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose()
    }
  }

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose()
    }
  }

  render() {
    return createPortal(
      <div
        className="Modal-backdrop"
        onClick={this.handleBackdropClick}
      >
        <div className="Modal-content">
          {this.props.children}
        </div>
      </div>,
      modalRoot
    )
  }
}

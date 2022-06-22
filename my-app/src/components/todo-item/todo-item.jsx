import React from "react";
import "./index.scss";
export default class TodoItem extends React.Component {
  static defaultProps = {
    item: { id: 0, label: "test", important: false, done: false },
    handlerImportant: () => {},
    handlerRemove: () => {}
  };
  render() {
    const { item, handlerImportant, handlerRemove } = this.props;

    return (
      <div className="todo-item" onClick={handlerImportant}>
        {item.label}
        <div className="nav">
          {item.important && <div className="red" />}
          <div
          className="delete"
          onClick={ handlerRemove}
          >
          &#128465;
          </div>
          
          <div
            className="check"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            ✓
          </div>
        </div>
      </div>
    );
  }
}

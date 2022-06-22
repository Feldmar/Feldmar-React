import React from "react";
import "./index.scss";
export default class TodoItem extends React.Component {
  static defaultProps = {
    item: { id: 0, label: "test", important: false, done: false },
    handlerImportant: () => {},
    handlerRemove: () => {},
    handlerComplet: () => {}
  };
  render() {
    const { item, handlerImportant, handlerRemove, handlerComplet } = this.props;

    return (
      <div className="todo-item" onClick={handlerImportant}>
        <div className={item.done ? 'complet' : ''}>{item.label}</div>
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
            onClick={handlerComplet}
          >
            ✓
          </div>
        </div>
      </div>
    );
  }
}

import React from "react";
import TodoItem from "../todo-item/todo-item";

export default class TodoList extends React.Component {
  static defaultProps = {
    todoList: [],
    handlerImportant: () => {},
    handlerRemove: () => {},
    handlerComplet: () => {}
  };

  render() {
    const { todoList, handlerImportant, handlerRemove,handlerComplet } = this.props;

    return (
      <div>
        {todoList.map((el) => (
          <TodoItem
            key={el.id}
            item={el}
            handlerImportant={handlerImportant(el.id)}
            handlerRemove={handlerRemove(el.id)}
            handlerComplet = {handlerComplet(el.id)}
          />
        ))}
      </div>
    );
  }
}

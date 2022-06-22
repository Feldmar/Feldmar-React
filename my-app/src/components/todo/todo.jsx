import React from "react";
import TodoList from "../todo-list";
import AddTodo from "../add-todo";
import SearchTodo from "../search-todo";
import "./index";

const initialTodoList = [
  { id: 0, label: "Lern React", important: false, done: false },
  { id: 1, label: "Lern JS", important: false, done: false },
  { id: 2, label: "Lern HTML", important: false, done: false },
  { id: 3, label: "Lern CSS", important: false, done: false }
];

export default class Todo extends React.Component {
  state = {
    todoList: initialTodoList,
    term: ""
  };

  handlerImportant = (id) => {
    return (_e) => {
      const arr = this.state.todoList.map((el) => {
        if (el.id === id) {
          return { ...el, important: !el.important };
        } else {
          return el;
        }
      });
      this.setState({ ...this.state, todoList: arr });
    };
  };
  handlerAddTodo = (taskName) => {
    const idx = this.state.todoList.at(-1).id;
    this.setState((prevState) => ({
      ...prevState,
      todoList: [
        ...prevState.todoList,
        { id: idx + 1, label: taskName, important: false, done: false }
      ]
    }));
  };
  handlerSerach = (e) => {
    this.setState({ ...this.state, term: e.target.value });
  };

  filterList = () => {
    if (this.state.term) {
      return this.state.todoList.filter((el) =>
        el.label.toLocaleLowerCase().includes(this.state.term)
      );
    }
    return this.state.todoList;
  };

  handlerRemove = (id) => {

    // this.setState((state) => {
    //   const indx = this.state.todoList.findIndex((el) => el.id === id);
    //   const todoList = [
    //     ...state.todoList.slice(0, indx),
    //     ...state.todoList.slice(indx + 1)
    //   ];
    //   return { todoList };
    
    return (e) => {
      e.stopPropagation();
      const data = this.state.todoList.filter((el) => {
        return el.id !== id;
      });
      this.setState({
        ...this.state, 
        todoList: data 
      })
    };
  }
    

  render() {
    const todos = this.filterList();
    console.log(todos);

    return (
      <div className="todo">
        <SearchTodo
          value={this.state.term}
          handlerChange={this.handlerSerach}
        />
        <TodoList
        todoList={todos}
        handlerImportant={this.handlerImportant}
        handlerRemove = {this.handlerRemove}
        />
        <hr />
        <AddTodo handlerAddTodo={this.handlerAddTodo} />
      </div>
    );
  }
}

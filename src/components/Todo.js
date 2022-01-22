import { useState, useEffect } from "react";
import axios from "axios";

function Todo({ todo, setTodos }) {

  const toggleTodo = () => {
    console.log(todo);
    axios
      .put(`https://todos-backend-test-deployment.herokuapp.com/todos/${todo.id}`)
      .then((res) => {
        setTodos((todos) => {
          return todos.map((element) => {
            if (element.id === res.data.id) {
              element.completed = res.data.completed;
            }
            return element;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodo = () => {
    axios
      .delete(`https://todos-backend-test-deployment.herokuapp.com/todos/${todo.id}`)
      .then((res) => {
        setTodos((todos) => {
          return todos.filter((element) => {
            return element.id !== todo.id;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>{todo.title}</p>
      <button onClick={toggleTodo}>Toggle</button>
      <button onClick={deleteTodo}>Delete</button>
    </div>
  );
}

export default Todo;

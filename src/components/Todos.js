import { useState, useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../reducers/user/actions";
import axios from "axios";
import Todo from "./Todo";

function Todos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
      token: state.userReducer.token,
    };
  });

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const logout = (e) => {
    const action = removeUser();
    dispatch(action);
    navigate("/login");
  };

  const addTodo = () => {
    const data = {
      title: todo,
      user: {
        id: state.user.id,
      },
    };

    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };

    axios
      .post("https://todos-backend-test-deployment.herokuapp.com/todos", data, config)
      .then((res) => {
        setTodos([...todos, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let isMounted = true;

    const config = {
      headers: { Authorization: `Bearer ${state.token}` },
    };

    axios
      .get(`https://todos-backend-test-deployment.herokuapp.com/users/${state.user.id}`, config)
      .then((res) => {
        if (isMounted) {
          setTodos(res.data.todos);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {state.user.id ? (
        <div>
          <input type="text" onChange={handleChange} />
          <button onClick={addTodo}> Add </button>
          <button onClick={logout}> Logout </button>
          {todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} setTodos={setTodos} />;
          })}
        </div>
      ) : (
        <Navigate to="/login" from={{ from: location }} />
      )}
    </>
  );
}

export default Todos;

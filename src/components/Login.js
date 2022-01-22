import { useState, useEffect } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, addToken } from "../reducers/user/actions";
import axios from "axios";
import jwt_decode from "jwt-decode";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state) => {
    return {
      user: state.userReducer.user,
    };
  });

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const addTodo = () => {
    const data = {
      email,
      password,
    };

    axios
      .post("https://todos-backend-test-deployment.herokuapp.com/login", data)
      .then((res) => {
        console.log(res.data);
        const token = res.data.access_token
        const decoded = jwt_decode(token);
        console.log(decoded);

        // add to redux
        const user_action = addUser({
          id: decoded.id,
          email: decoded.sub
        });

        const token_action = addToken(token);

        dispatch(user_action);
        dispatch(token_action);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!state.user.id ? (
        <div>
          <input type="text" onChange={handleChangeEmail} />
          <input type="text" onChange={handleChangePassword} />
          <button onClick={addTodo}> Login </button>
        </div>
      ) : (
        <Navigate to="/" from={{ from: location }} />
      )}
    </>
  );
}

export default Login;

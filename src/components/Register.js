import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import {addUser} from "../reducers/user/actions";
import axios from "axios";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      .post("https://todos-backend-test-deployment.herokuapp.com/users", data)
      .then((res) => {
        // add to redux
        // const action = addUser(res.data)
        // dispatch(action)
        navigate('/login')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="text" onChange={handleChangeEmail} />
      <input type="text" onChange={handleChangePassword} />
      <button onClick={addTodo}> Add </button>
    </div>
  );
}

export default Register;

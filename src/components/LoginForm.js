import { useState } from "react";
import loginService from "../services/login";
import noteService from "../services/notes";
import PropTypes from "prop-types";

const LoginForm = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      noteService.setToken(user.token);
      noteService.setUserId(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }
  };
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ marginBottom: 20 }}>
        <div>
          username
          <input
            id="input-username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="input-password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="button-login" type="submit">
          login
        </button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default LoginForm;

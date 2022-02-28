import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../actions/authActions";

import { TextBtn } from "../../components/ui/Buttons";
import { InputGroup, Input, InputPrep } from "../../components/ui/Inputs";
import { AlertCard } from "../../components/ui/Cards";

const Login = e => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(e => e.auth);
  const errors = useSelector(e => e.errors)
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    errors: {}
  })

  useEffect(() => {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, [auth.isAuthenticated])

  const onChange = e => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let checkForUsername = re.test(state.email) ? state.email : ""
    e.preventDefault();

    const userData = {
      username: checkForUsername,
      email: state.email,
      password: state.password
    };

    dispatch(loginUser(userData));
  };

  return (
    <div className="dfc jc-c ai-c p-3 mxw-30r ma">
      {(errors.email || errors.emailnotfound) ? (
        <AlertCard variant="warning">
          {errors.email || errors.emailnotfound}
        </AlertCard>
      ) : null}
      {(errors.password || errors.passwordincorrect) ? (
        <AlertCard variant="warning">
          {errors.password || errors.passwordincorrect}
        </AlertCard>
      ) : null}
      <div className="df jc-c">
        <h4 className="mb-5 mt-4">
          <b>Log In</b> below
        </h4>
      </div>
      <form className="dfc ai-c" noValidate onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <InputPrep variant="pillL" htmlFor="email">Mail/User</InputPrep>
          <Input
            variant="pillR"
            onChange={onChange}
            value={state.email}
            placeholder="avatar@avatar.com"
            id="email"
            type="email"
          />
        </InputGroup>
        <InputGroup className="mb-5">
          <InputPrep variant="pillL" htmlFor="password">Password</InputPrep>
          <Input
            height="2rem"
            variant="pillR"
            onChange={onChange}
            value={state.password}
            placeholder="password here"
            id="password"
            type="password"
          />
        </InputGroup>
        <div className="dfc jc-c ai-c w-100">
          <TextBtn type="submit" variant="info" size="md" className=" mb-3">
            Login
          </TextBtn>
          <a href="#/forgotpassword">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login

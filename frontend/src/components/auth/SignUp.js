import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { registerUser } from "../../actions/authActions";

import { TextBtn } from "../../components/ui/Buttons";
import { InputGroup, Input, InputPrep } from "../../components/ui/Inputs";
import { AlertCard } from "../../components/ui/Cards";

const SignUp = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(e => e.auth);
  const errors = useSelector(e => e.errors)
  const [state, setState] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    password2: "",

    errors: {}
  })

  useEffect(() => {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, [])

  const onChange = e => {
    const { id, value } = e.target
    setState({
      ...state, [id]: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: state.name,
      surname: state.surname,
      username: state.username,
      email: state.email,
      phone: state.phone,
      password: state.password,
      password2: state.password2,
    };
    dispatch(registerUser(newUser, history));
  };

  return (
    <div className="dfc jc-c ai-c p-3 mxw-30r ma">
      <div>
        {errors.name ? (
          <AlertCard variant="warning">
            Name field is required !
          </AlertCard>
        ) : null}
        {errors.surname ? (
          <AlertCard variant="warning">
            Surname field is required !
          </AlertCard>
        ) : null}
        {errors.username ? (
            <AlertCard variant="warning">
              {errors.username}
            </AlertCard>
          ) : null}
        {errors.email ? (
          <AlertCard variant="warning">
            {errors.email}
          </AlertCard>
        ) : null}

        {errors.password ? (
          <AlertCard variant="warning">
            Password must be at least 6 characters !
          </AlertCard>
        ) : null}

        {errors.password2 ? (
          <AlertCard variant="warning">
            Repeat Password field is required !
          </AlertCard>
        ) : null}

      </div>
      <form noValidate onSubmit={onSubmit}>
        <div className="df jc-c">
          <h4 className="mb-3 mt-3">
            <b>Sign Up</b> Essential's
          </h4>
        </div>
        <div className="dfc ai-c jc-c">
          <InputGroup className="mb-3">
            <InputPrep variant="pillL" >Avatar</InputPrep>
            <Input
              variant="pillM"
              onChange={onChange}
              value={state.name}
              id="name"
              type="text"
              placeholder="Name"
            />
            <Input
              variant="pillR"
              onChange={onChange}
              value={state.surname}
              id="surname"
              type="text"
              placeholder="Surname"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputPrep variant="pillL">Username</InputPrep>
            <Input
              variant="pillR"
              onChange={onChange}
              value={state.username}
              id="username"
              type="text"
              placeholder="Username"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputPrep variant="pillL">Email</InputPrep>
            <Input
              variant="pillR"
              onChange={onChange}
              value={state.email}
              id="email"
              type="email"
              placeholder="avatar@avatar.com"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputPrep variant="pillL">Phone</InputPrep>
            <Input
              variant="pillR"
              onChange={onChange}
              value={state.phone}
              id="phone"
              type="tel"
              pattern="[0-9]{3} [0-9]{3} [0-9]{2} [0-9]{2}"
              placeholder="+00 (000) 000 00 00 (optional)"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputPrep variant="pillL">Password</InputPrep>
            <Input
              variant="pillR"
              onChange={onChange}
              value={state.password}
              id="password"
              type="password"
              placeholder="min 6 characters"
            />
          </InputGroup>
          <InputGroup className="mb-5">
            <InputPrep variant="pillL">Repeat</InputPrep>
            <Input
              variant="pillR"
              onChange={onChange}
              value={state.password2}
              error={errors.password2}
              id="password2"
              type="password"
              placeholder="repeat password"
            />
          </InputGroup>
        </div>
        <span className="df p-2 ai-c jc-c">
          <TextBtn className="bra-1" variant="info" size="md" type="submit">
            Confirm
          </TextBtn></span>
      </form>
    </div>

  );
}

export default SignUp
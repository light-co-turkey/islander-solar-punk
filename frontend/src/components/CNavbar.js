import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { ToggleContainer, NewsBtn, ProfileBtn, PanelBtn, LinkTextBtn, DaoBtn, FarmBtn } from "../components/ui/Buttons";

//styles
import Logo from '../assets/logo.png'
import { ReactComponent as MoonIcon } from '../assets/moon_stars.svg';
import { ReactComponent as SunIcon } from '../assets/sun.svg';
import './components.scss';

const imgStyles = { maxWidth: "1.8rem", maxHeight: "1.8rem", margin: "auto" }

const authToggle = {
  color: "white",
  backgroundColor: "#65A3FF"
}

const CNavbar = props => {
  const auth = useSelector(state => state.auth)
  const location = props.location

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const theme = props.theme;
  const toggleTheme = props.toggleTheme;
  const isLight = theme === 'light';

  const clientLoc = location.pathname

  let isLoggedIn = auth.isAuthenticated
  let isAdmin = false

  function AdminPanel() {
    if (isAdmin) {
      return (
        <>
          <a href="#/panel" className="dfc button-circle mlra">
            <PanelBtn style={imgStyles} fill={clientLoc === "/panel" ? "#65A3FF" : "white"} />
            <p className="f-07 td-n mt-1" style={clientLoc === "/panel" ? { color: "#65A3FF" } : { color: "white" }}>panel</p>
          </a>
        </>
      )
    } return null
  };

  const GuestGreeting = () => (
    <div className="avatar-nav">
      <a href="#/" className="">
        <FarmBtn style={imgStyles} fill={clientLoc === "/" ? "#65A3FF" : "white"} />
        <p className="f-3 td-n" style={clientLoc === "/" ? { color: "#65A3FF" } : { color: "white" }}>landing</p>
      </a>
      <a href="#/posts" className="">
        <NewsBtn style={imgStyles} fill={clientLoc === "/posts" ? "#65A3FF" : "white"} />
        <p className="f-3 td-n" style={clientLoc === "/posts" ? { color: "#65A3FF" } : { color: "white" }}>posts</p>
      </a>
      <span className="df">
        <LinkTextBtn variant="info" href="#/signup" style={clientLoc === "/signup" ? authToggle : null}
          size="sm" >Sign Up</LinkTextBtn>
        <LinkTextBtn variant="info" href="#/login" style={clientLoc === "/login" ? authToggle : null}
          size="sm" className="ml-3">Log In</LinkTextBtn>
      </span>
    </div>
  );

  const UserGreeting = () => (
    <div className="avatar-nav">
      <a href="#/" className="">
        <FarmBtn style={imgStyles} fill={clientLoc === "/" ? "#65A3FF" : "white"} />
        <p className="f-3 td-n" style={clientLoc === "/" ? { color: "#65A3FF" } : { color: "white" }}>landing</p>
      </a>
      <a href="#/posts" className="">
        <NewsBtn style={imgStyles} fill={clientLoc === "/posts" ? "#65A3FF" : "white"} />
        <p className="f-3 td-n" style={clientLoc === "/posts" ? { color: "#65A3FF" } : { color: "white" }}>posts</p>
      </a>
      <a href="#/profile" className="">
        <ProfileBtn style={imgStyles} fill={clientLoc === "/profile" ? "#65A3FF" : "white"} />
        <p className="f-3 td-n" style={clientLoc === "/profile" ? { color: "#65A3FF" } : { color: "white" }}>profile</p>
      </a>
      {AdminPanel()}
    </div>
  );

  function Greeting() {
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }

  return (
    <div className="nav-div csticky-top">
      <div className="nav-inner-div">
        <a href="/" className="df">
          <img className="brand" src={Logo} alt="Logo" />
        </a>
        <Greeting />
        <ToggleContainer lightTheme={isLight} onClick={toggleTheme} >
          <SunIcon />
          <MoonIcon />
        </ToggleContainer>
      </div>
    </div >
  );
}

export default CNavbar
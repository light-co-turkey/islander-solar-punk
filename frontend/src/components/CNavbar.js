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
  backgroundColor: "#00ba0c"
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
            <PanelBtn style={imgStyles} fill={clientLoc === "/panel" ? "#00ba0c" : "white"} />
            <p className="f-07 td-n mt-1" style={clientLoc === "/panel" ? { color: "#00ba0c" } : { color: "white" }}>panel</p>
          </a>
        </>
      )
    } return null
  };

  const GuestGreeting = () => (
    <div className="avatar-nav">
      <a href="#/" className="">
        <NewsBtn style={imgStyles} fill={clientLoc === "/" ? "#00ba0c" : "white"} />
        <p className="f-3 td-n" style={clientLoc === "/" ? { color: "#00ba0c" } : { color: "white" }}>posts</p>
      </a>
      <a href="#/info" className="">
        <FarmBtn style={imgStyles} fill={clientLoc === "/info" ? "#00ba0c" : "white"} />
        <p className="f-3 td-n" style={clientLoc === "/info" ? { color: "#00ba0c" } : { color: "white" }}>info</p>
      </a>
      <span className="df">
        <LinkTextBtn variant="info" href="#/auth" style={clientLoc === "/auth" ? authToggle : null}
          size="sm" >Sign/Login</LinkTextBtn>
      </span>
    </div>
  );

  const UserGreeting = () => (
    <div className="avatar-nav">
      <a href="#/" className="">
        <NewsBtn style={imgStyles} fill={clientLoc === "/" ? "#00ba0c" : "white"} />
        <p className="f-3 td-n" style={clientLoc === "/" ? { color: "#00ba0c" } : { color: "white" }}>posts</p>
      </a>
      <a href="#/info" className="">
        <FarmBtn style={imgStyles} fill={clientLoc === "/info" ? "#00ba0c" : "white"} />
        <p className="f-3 td-n" style={clientLoc === "/info" ? { color: "#00ba0c" } : { color: "white" }}>info</p>
      </a>
      <a href="#/profile" className="">
        <ProfileBtn style={imgStyles} fill={clientLoc === "/profile" ? "#00ba0c" : "white"} />
        <p className="f-3 td-n" style={clientLoc === "/profile" ? { color: "#00ba0c" } : { color: "white" }}>profile</p>
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
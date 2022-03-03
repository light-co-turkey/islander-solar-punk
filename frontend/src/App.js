import React, { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { Route, Switch, useLocation } from 'react-router-dom';

//Actions
import { setCurrentUser, logoutUser } from "./actions/authActions";
//Components
import CNavbar from './components/CNavbar';
import CFooter from './components/CFooter';

//Views
import { Login, SignUp, ForgotPassword, NewPassword } from "./components/auth"
import NotFound from "./views/NotFound"
import Posts from './views/Posts';

//Styles
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./utils/toggleTheme/UseDarkMode"
import { GlobalStyles } from "./utils/toggleTheme/GlobalStyles";
import { lightTheme, darkTheme } from "./utils/toggleTheme/Themes"
import './global.scss'
import { Profile } from './views/Profile';
import { getUser } from './actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import PostView from './components/PostView';
import { getAllUsers, setAllUsers, setParamIsLoaded } from './actions/paramActions';
import { Landing } from './views/Landing';
import { Auth } from './views/Auth';

const appBody = {
  position: "relative",
  top: "80px",
  maxWidth: "1200px",
  minHeight: "calc(100% - 64px - 10rem)",
  padding: "1rem",
  margin: "auto"
}

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/login";
  }
}

const App = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const param = useSelector(state => state.param)
  const location = useLocation()
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    if (!auth.isAuthenticated) { } else { dispatch(getUser(auth.user.id)) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated, param.isLoaded])

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <div className="App">
          <CNavbar theme={theme} toggleTheme={themeToggler} location={location} />
          <div style={appBody}>
            <Switch>
              <Route exact path='/'><Posts isAuthenticated={auth.isAuthenticated} /></Route>
              <Route exact path='/info'><Landing /></Route>
              <Route exact path="/signup"><SignUp /></Route>
              <Route exact path="/login"><Login /></Route>
              <Route exact path="/auth"><Auth /></Route>
              <Route exact path="/forgotpassword"><ForgotPassword /></Route>
              <Route path="/reset/:token"><NewPassword /></Route>
              <Route exact path='/profile'><Profile /></Route>
              <Route path="/post/:id"><PostView /></Route>
              <Switch>
                <Route><NotFound /></Route>
              </Switch>
            </Switch>
          </div>
          <CFooter />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;

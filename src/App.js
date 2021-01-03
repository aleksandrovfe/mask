import './App.css';
import React, {useEffect, useState} from "react"
import {Route, Switch, useHistory} from "react-router-dom";
import Home from "./pages/home";
import SingUp from "./pages/signup";
import NavBar from "./components/layout/NavBar";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import Login from "./pages/login";
import AuthRoute from "./util/AuthRouter";
import jwtDecode from "jwt-decode";
import {connect} from "react-redux";
import {getUserData, logoutUser} from "./redux/actions/userActions";
import {store} from "./redux/store";
import axios from "axios";
import {SET_AUTHENTICATED} from "./redux/action-types";
import UserPage from "./pages/UserPage";

axios.defaults.baseURL = 'https://us-central1-cloud-fun-a0417.cloudfunctions.net/api'

const App = () => {
    const [token, setToken] = useState('')
    let history = useHistory()

    useEffect(() => {
        setToken(localStorage.FBIdToken)
    }, [history])

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < Date.now()) {
                store.dispatch(logoutUser())

                history.push("/login");
            } else {
                store.dispatch({ type: SET_AUTHENTICATED })
                axios.defaults.headers.common['Authorization'] = token
                store.dispatch(getUserData())
            }
        }
    }, [token, history])


    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#ffebee',
                contrastText: '#fff',
            },
            secondary: {
                main: '#ccb9bc',
                contrastText: '#fff',
            },
            dark: {
                main: '#ccb9bc',
                contrastText: '#000000',
            },
        },
    })

    return (
        <MuiThemeProvider theme={theme}>
            <div className="app">
                <NavBar/>
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <AuthRoute exact path="/login" component={Login}/>
                        <AuthRoute exact path="/signup" component={SingUp}/>
                        <Route exact path="/user/:handle" component={UserPage}/>
                        <Route exact path="/user/:handle/scream/:screamId" component={UserPage}/>
                    </Switch>
                </div>
            </div>
        </MuiThemeProvider>
    );
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {getUserData})(App);

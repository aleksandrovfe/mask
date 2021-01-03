import React, {useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link, useHistory} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from "react-redux";
import {loginUser} from "../redux/actions/userActions";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    form: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        position: 'relative',
        height: '60px'
    },
    progress: {
        position: "absolute",
    }
}));

const Login = (props) => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

    let history = useHistory()

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const {loading, errors} = props.UI

    const login = async (event) => {
        event.preventDefault()

        const userData = {
            email: email,
            password: password,
        }

        props.loginUser(userData, history)
    }

    return (
        <div>
            <h1 className="login__title">Login</h1>
            <div style={modalStyle} className={classes.form}>
                <form className="login__form">
                    <TextField
                        className="login__form-input"
                        placeholder="Email"
                        type="email"
                        helperText={errors ? errors.email : null}
                        error={errors ? !!errors.email : null}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        className="login__form-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        helperText={errors ? errors.password || errors.general : null}
                        error={errors ? !!errors.password || errors.general : null}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        disabled={loading}
                        color={"secondary"}
                        onClick={login}
                        className={classes.button}
                    >
                        LOGIN
                        {loading
                            ? <CircularProgress className={classes.progress}/>
                            : null
                        }
                    </Button>
                    <small className="login__form-signup-link">Don't have an
                        account? sign up <Link
                            className='login__form-signup-link--color'
                            to="/signup">here</Link></small>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
})

export default connect(mapStateToProps, {loginUser})(Login)

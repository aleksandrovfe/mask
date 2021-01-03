import React, {useState} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link, useHistory} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {connect} from "react-redux";
import {signupUser} from "../redux/actions/userActions";

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

export const SingUp = (props) => {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

    let history = useHistory()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [handle, setHandle] = useState('')

    const {loading, errors} = props.UI

    const signup = async (event) => {
        event.preventDefault()

        const newUserData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            handle: handle,
        }

        props.signupUser(newUserData, history)
    }

    return (
        <div>
            <h1 className="signup__title">Sign Up</h1>
            <div style={modalStyle} className={classes.form}>
                <form className="signup__form">
                    <TextField
                        className="signup__form-input"
                        placeholder="Email"
                        type="email"
                        helperText={errors ? errors.email : null}
                        error={errors ? !!errors.email : null}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        className="signup__form-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        helperText={errors ? errors.password : null}
                        error={errors ? !!errors.password : null}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        className="signup__form-input"
                        placeholder="Confirm password"
                        type="password"
                        value={confirmPassword}
                        helperText={errors ? errors.confirmPassword : null}
                        error={errors ? !!errors.confirmPassword : null}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <TextField
                        className="signup__form-input"
                        placeholder="Handle"
                        type="text"
                        value={handle}
                        helperText={errors ? errors.handle : null}
                        error={errors ? !!errors.handle : null}
                        onChange={(e) => setHandle(e.target.value)}
                    />
                    <Button
                        disabled={loading}
                        color={"secondary"}
                        onClick={signup}
                        className={classes.button}
                    >
                        SIGN UP
                        {loading
                            ? <CircularProgress className={classes.progress}/>
                            : null
                        }
                    </Button>
                    <small className="signup__form-signup-link">Already have an
                        account? log in <Link className='signup__form-signup-link--color' to="/login">here</Link></small>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI,
})

export default connect(mapStateToProps, {signupUser})(SingUp)
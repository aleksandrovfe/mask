import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logoutUser} from "../../redux/actions/userActions";
import EditIcon from "@material-ui/icons/Edit";
import {CustomIconButton} from "../../util/CustomIconButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";

export const NavBar = (props) => {
    const {
        authenticated,
    } = props.user

    return (
        <div>
            <AppBar>
                <Toolbar variant="dense">
                    <Link to="/">
                        <CustomIconButton
                            title={'Home'}
                            placement={'bottom'}

                        >
                            <HomeIcon />
                        </CustomIconButton>
                    </Link>
                    {!authenticated ? (
                        <div>
                            <Button  component={Link}
                                    to="/login">Login</Button>
                            <Button  component={Link}
                                    to="/signup">Sign Up</Button>
                        </div>
                    ) : <div>
                        <PostScream />
                        <Notifications />
                        <CustomIconButton
                            title={'Logout'}
                            placement={'bottom'}
                            handle={props.logoutUser}
                        >
                            <ExitToAppIcon/>
                        </CustomIconButton>
                    </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
})

export default connect(mapStateToProps, {logoutUser})(NavBar)
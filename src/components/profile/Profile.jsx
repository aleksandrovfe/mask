import React from "react";
import {connect} from "react-redux";
import {Paper} from "@material-ui/core";
import {Link} from "react-router-dom";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import WebIcon from '@material-ui/icons/Web';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import EditIcon from "@material-ui/icons/Edit";
import {uploadImage} from "../../redux/actions/userActions";
import EditDetails from "./EditDetails";
import {CustomIconButton} from "../../util/CustomIconButton";

const Profile = (props) => {
    const {
        loading,
        authenticated,
        credentials: {
            handle,
            imageUrl,
            bio,
            website,
            location
        }
    } = props.user

    const handleImage = (event) => {
        const image = event.target.files[0]
        const formData = new FormData()

        formData.append('image', image, image.name)
        props.uploadImage(formData)
    }

    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }

    return !loading ? (authenticated ? (
        <Paper>
            <div className="profile__wrapper">
                <div className="profile__avatar-wrapper">
                    <img className="profile__avatar" src={imageUrl} alt=""/>
                    <div className="profile__edit-picture-btn">
                        <input type="file" id="imageInput" hidden="hidden"
                               onChange={handleImage}/>
                        <CustomIconButton
                            title={'Edit profile picture'}
                            placement={'top'}
                            handle={handleEditPicture}
                            color={"secondary"}
                        >
                            <EditIcon color="secondary"/>
                        </CustomIconButton>
                    </div>
                </div>
                <div className="profile__info-wrapper">
                    <Link className='profile__info-item profile__handle'
                          to={`/user/${handle}`}>@{handle}</Link>
                    {bio ? (
                        <div className="profile__info-item-wrapper">
                            <FingerprintIcon/>
                            <p className="profile__info-item">{bio}</p>
                        </div>) : null}
                    {website ? (
                        <div className="profile__info-item-wrapper">
                            <WebIcon/>
                            <p className="profile__info-item">{website}</p>
                        </div>) : null}
                    {location ? (
                        <div className="profile__info-item-wrapper">
                            <PersonPinCircleIcon/>
                            <p className="profile__info-item">{location}</p>
                        </div>) : null}
                    <EditDetails/>
                </div>
            </div>
        </Paper>
    ) : (
        <Paper className="profile__unauth">
            <h3>You are not authorized <br/> please <Link className="profile__unauth-link"
                to={'/login'}>login</Link> or <Link  className="profile__unauth-link" to={'/signup'}>sign
                up</Link>
            </h3>
        </Paper>
    )) : (<p>Loading...</p>)
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, {uploadImage})(Profile)
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getUserData} from "../redux/actions/dataActions";
import axios from "axios";
import Scream from "../components/scream/Scream";
import WebIcon from "@material-ui/icons/Web";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import {Paper} from "@material-ui/core";
import FingerprintIcon from "@material-ui/icons/Fingerprint";

const UserPage = (props) => {
    const [handle, setHandle] = useState(null)
    const [screamId, setScreamId] = useState(null)
    const [profile, setProfile] = useState(null)
    const {screams, loading} = props.data

    useEffect(() => {
        setHandle(props.match.params.handle)
        if (props.match.params.screamId) {
            setScreamId(props.match.params.screamId)
        }
    }, [props.match.params])

    useEffect(() => {
        if (handle) {
            props.getUserData(handle)
            const getUserProfile = async () => {
                try {
                    const response = await axios.get(`/user/${handle}`)
                    setProfile(response.data.user)
                } catch (error) {
                    console.log(error)
                }
            }
            getUserProfile()
        }
    }, [handle])

    const screamMarkup = loading
        ? (<p>loading data</p>)
        : screams === null
            ? (<p>No screams for this user</p>)
            : !screamId
                ? (screams.map(scream => <Scream key={scream.screamId} scream={scream}/>))
                : (screams.map(scream => {
                    if (scream.screamId !== screamId) {
                        return <Scream key={scream.screamId} scream={scream}/>
                    } else {
                        return <Scream key={scream.screamId} scream={scream} openDialog={true}/>
                    }
                }))

    const profileMarkup = profile ? (<Paper>
        <div className="profile__wrapper">
            <div className="profile__avatar-wrapper">
                <img className="profile__avatar" src={profile.imageUrl} alt=""/>
            </div>
            <div className="profile__info-wrapper">
                <h6 className='profile__info-item profile__handle'>{profile.handle}</h6>
                {profile.bio ? (
                    <div className="profile__info-item-wrapper">
                        <FingerprintIcon/>
                        <p className="profile__info-item">{profile.bio}</p>
                    </div>) : null}
                {profile.website ? (
                    <div className="profile__info-item-wrapper">
                        <WebIcon/>
                        <p className="profile__info-item">{profile.website}</p>
                    </div>) : null}
                {profile.location ? (
                    <div className="profile__info-item-wrapper">
                        <PersonPinCircleIcon/>
                        <p className="profile__info-item">{profile.location}</p>
                    </div>) : null}
            </div>
        </div>
    </Paper>) : (<p>Loading profile</p>)

    return (
        <div className="user-page">
            <p style={{color: 'red'}}>{loading}</p>
            <div className="user-page__screams">
                {screamMarkup}
            </div>
            <div className="user-page__profile">
                {profileMarkup}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getUserData})(UserPage)
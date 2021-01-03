import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {editUserProfile} from "../../redux/actions/userActions";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {CustomIconButton} from "../../util/CustomIconButton";

const EditDetails = (props) => {
    const [bio, setBio] = useState("")
    const [website, setWebsite] = useState("")
    const [location, setLocation] = useState("")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setUserDetails(props.credentials)
    }, [])

    const setUserDetails = (credentials) => {
        setBio(credentials && credentials.bio ? credentials.bio : '')
        setWebsite(credentials && credentials.website ? credentials.website : '')
        setLocation(credentials && credentials.location ? credentials.location : '')
    }

    const handleSubmit = () => {
        const userData = {
            bio,
            website,
            location
        }

        props.editUserProfile(userData)
        setOpen(false)
    }

    const handleOpenMenu = () => {
        setUserDetails(props.credentials)
        setOpen(true)
    }

    return (
        <div>
            <div className="profile__edit-details-btn">
                <CustomIconButton
                    title={'Edit details'}
                    placement={'top'}
                    handle={handleOpenMenu}
                    color={"secondary"}
                >
                    <EditIcon color="secondary"/>
                </CustomIconButton>
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Edit profile details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="A short bio about yourself"
                            value={bio}
                            onChange={(event) => setBio(event.target.value)}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            type="text"
                            label="Website"
                            multiline
                            rows="1"
                            placeholder="Your personal/professional website"
                            value={website}
                            onChange={(event) => setWebsite(event.target.value)}
                            fullWidth
                        />
                        <TextField
                            name="location"
                            type="text"
                            label="Location"
                            multiline
                            rows="1"
                            placeholder="Where you leave"
                            value={location}
                            onChange={(event) => setLocation(event.target.value)}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button color="secondary" onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
    credentials: state.user.credentials,
})

export default connect(mapStateToProps, {editUserProfile})(EditDetails)
import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import {CustomIconButton} from "../../util/CustomIconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {clearErrors, postScream} from "../../redux/actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    button: {
        position: 'relative',
        height: '60px'
    },
    progress: {
        position: "absolute",
    }
}));

const PostScream = (props) => {
    const classes = useStyles()
    const {loading, errors} = props.UI
    const [open, setOpen] = useState(false)
    const [body, setBody] = useState('')

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        props.clearErrors()
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        await props.postScream({body})
        if (body.trim().length > 0) setOpen(false)
    }

    return (
        <Fragment>
            <CustomIconButton
                title={'Add new post'}
                placement={'bottom'}
                handle={handleOpen}
            >
                <AddIcon/>
            </CustomIconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>Post a new scream</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name="scream"
                            type="text"
                            label="Scream"
                            multiline
                            rows="5"
                            placeholder="Scream at your fellow apes"
                            value={body}
                            onChange={(event) => setBody(event.target.value)}
                            fullWidth
                            error={errors && !!errors.body}
                            helperText={errors && errors.body}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button className={classes.button} disabled={loading}
                            color="secondary" onClick={handleSubmit}>
                        {loading
                            ? <CircularProgress className={classes.progress}/>
                            : null
                        }
                        Submit</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    UI: state.UI,
})

export default connect(mapStateToProps, {postScream, clearErrors})(PostScream)
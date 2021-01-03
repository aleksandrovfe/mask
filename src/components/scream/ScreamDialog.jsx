import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {clearErrors, getScream} from "../../redux/actions/dataActions";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import {CustomIconButton} from "../../util/CustomIconButton";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import dayjs from "dayjs";
import LikeBtn from "./LikeBtn";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Comments from "./Comments";
import {Link} from "react-router-dom";
import PostComment from "./PostComment";

const ScreamDialog = (props) => {
    const [open, setOpen] = useState(false)
    const [oldPath, setOldPath] = useState('')
    // const [newPath, setNewPath] = useState('')
    const {loading} = props.UI
    const {scream} = props

    const handleOpen = () => {
        const {userHandle, screamId} = props

        setOldPath(window.location.pathname)
        const newPath = `/user/${userHandle}/scream/${screamId}`

        if (newPath === oldPath) setOldPath(`/user/${userHandle}`)

        window.history.pushState(null, null, newPath)

        setOpen(true)
        props.getScream(props.screamId)
    }
    const handleClose = () => {
        window.history.pushState(null, null, oldPath)

        setOpen(false)
        props.clearErrors()
    }

    useEffect(() => {
        if (props.openDialog) handleOpen()
    }, [])

    const dialogMarkup = loading ? (
       <div className="scream-dialog__circular-progress-wrapper">
           <CircularProgress size={50}/>
       </div>
    ) : (
        <Fragment>
            <div className="scream-dialog">
                <img className="scream-dialog__img" src={scream && scream.userImage}
                     alt=""/>
                <div className="scream-dialog__box">
                    <Link className='scream-dialog__user-handle'
                          to={`/user/${scream && scream.userHandle}`}>
                        {`@${scream && scream.userHandle}`}
                    </Link>
                    <hr className="scream-dialog__hr"/>
                    <p className="scream-dialog__time">
                        {dayjs(scream && scream.createdAt).format('h:mm a, MMM DD YYYY')}
                    </p>
                    <LikeBtn scream={scream && scream}/>
                    <span>{scream && scream.likeCount}</span>
                    <CustomIconButton
                        title={'Comment'}
                        placement={'top'}
                        color={"secondary"}
                    >
                        <ChatBubbleIcon color="secondary"/>
                    </CustomIconButton>
                    <span>{scream && scream.commentCount}</span>
                </div>
            </div>
            <p className="scream-dialog__body">{scream && scream.body}</p>
            <PostComment screamId={scream && scream.screamId}/>
            <Comments comments={scream && scream.comments}/>
        </Fragment>
    )

    return (
        <div>
            <CustomIconButton
                title={'Show more'}
                placement={'top'}
                handle={handleOpen}
                color={"secondary"}
            >
                <UnfoldMoreIcon color="secondary"/>
            </CustomIconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </div>
    )
}

const mapDispatchToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
})

export default connect(mapDispatchToProps, {getScream, clearErrors})(ScreamDialog)
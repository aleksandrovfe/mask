import React from "react";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import {connect} from "react-redux";
import {CustomIconButton} from "../../util/CustomIconButton";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeBtn from "./LikeBtn";

const Scream = ({scream, user, openDialog}) => {
    dayjs.extend(relativeTime)

    const deleteBtn = user.authenticated && user.credentials.handle === scream.userHandle
        ? (<DeleteScream screamId={scream.screamId}/>)
        : null

    return (
        <div className='scream'>
            <img src={scream.userImage} className="scream__image" alt=""/>
            <div className="scream__container">
                <div className="scream__wrapper">
                    <div className="scream__info scream__info-item">
                        <Link className='scream__user'
                              to={`/user/${scream.userHandle}`}>@{scream.userHandle}</Link>
                        <h5 className='scream__created'>{dayjs(scream.createdAt).fromNow()}</h5>
                        <p className='scream__body'>{scream.body}</p>
                    </div>
                </div>
                <div className="scream__actions">
                    <div className="scream__actions-box">
                        <ScreamDialog screamId={scream.screamId}
                                      userHandle={scream.userHandle}
                                      openDialog={openDialog}
                        />
                        <LikeBtn scream={scream}/>
                        {scream.likeCount}
                        <CustomIconButton
                            title={'Comment'}
                            placement={'top'}
                            color={"secondary"}
                        >
                            <ChatBubbleIcon color="secondary"/>
                        </CustomIconButton>
                        {scream.commentCount}
                    </div>
                    {deleteBtn}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {})(Scream)
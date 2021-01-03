import React from "react";
import dayjs from "dayjs";
import {Link} from "react-router-dom";

const Comments = ({comments}) => {
    return (
        <div>
            {comments && comments.length > 0 ?
            comments.map(comment => (
                <div key={comment.createdAt} className="scream-comment__wrapper">
                    <img className="scream-comment__img" src={comment.userImage} alt=""/>
                    <div className="scream-comment__box">
                        <div className="scream-comment__box-header">
                            <Link className='scream-comment__user'
                                  to={`/user/${comment.userHandle}`}>
                                {`@${comment.userHandle}`}
                            </Link>
                            <p className="scream-comment__time">{dayjs(comment.createdAt).format('h:mm a, MMM DD YYYY')}</p>
                        </div>
                        <p className="scream-comment__body">{comment.body}</p>
                    </div>
                </div>
            )) : null}
        </div>
    )
}

export default Comments
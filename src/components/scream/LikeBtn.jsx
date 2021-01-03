import React from "react";
import {CustomIconButton} from "../../util/CustomIconButton";
import {Link} from "react-router-dom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {likeScream, unlikeScream} from "../../redux/actions/dataActions";
import {connect} from "react-redux";

const LikeBtn = (props) => {
    const {user, likeScream, unlikeScream, scream} = props

    const handleLikeScream = () => likeScream(scream.screamId)
    const handleUnlikeScream = () => unlikeScream(scream.screamId)

    const likedScream = () => {
        return user.likes && user.likes.find(like => like.screamId === scream.screamId)
    }

    return !user.authenticated ? (
            <CustomIconButton
                title={'Like'}
                placement={'top'}
                handle={handleUnlikeScream}
                color={"secondary"}
            >
                <Link className="scream__like-link" to="/login">
                    <FavoriteBorderIcon color="secondary"/>
                </Link>

            </CustomIconButton>)
        :
        likedScream() ? (
            <CustomIconButton
                title={'Undo like'}
                placement={'top'}
                handle={handleUnlikeScream}
                color={"secondary"}
            >
                <FavoriteIcon color="secondary"/>
            </CustomIconButton>
        ) : (
            <CustomIconButton
                title={'Like'}
                placement={'top'}
                handle={handleLikeScream}
                color={"secondary"}
            >
                <FavoriteBorderIcon color="secondary"/>
            </CustomIconButton>
        )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {likeScream, unlikeScream})(LikeBtn)
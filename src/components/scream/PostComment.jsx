import React, {useState} from "react";
import {connect} from "react-redux";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {submitComment} from "../../redux/actions/dataActions";

const PostComment = (props) => {
    const {authenticated, UI} = props
    const [body, setBody] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(props.screamId)
        await props.submitComment(props.screamId, {body: body})
        setBody('')
    }

    const commentsMarkup = authenticated ? (
        <div>
            <form onSubmit={handleSubmit} className="post-comment__form">
                <TextField
                    name="body"
                    type="text"
                    label="Comment on scream"
                    error={UI.errors ? !!UI.errors.error : null}
                    helperText={UI.errors ? UI.errors.error : null}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    fullWidth
                />
                <Button
                    type="submit"
                    color="secondary"
                >Submit</Button>
            </form>
        </div>
    ) : null
    return (
        <div>
            {commentsMarkup}
        </div>
    )
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {submitComment})(PostComment)
import React, {Fragment} from "react";
import {CustomIconButton} from "../../util/CustomIconButton";
import {connect} from "react-redux";
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteScream} from "../../redux/actions/dataActions";

const DeleteScream = (props) => {
    const handleDelete = () => {
        props.deleteScream(props.screamId)
    }

    return (
        <Fragment>
            <CustomIconButton
                title={'Delete scream'}
                placement={'top'}
                handle={handleDelete}
                color={"secondary"}
            >
                <DeleteIcon color="secondary"/>
            </CustomIconButton>
        </Fragment>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {deleteScream})(DeleteScream)




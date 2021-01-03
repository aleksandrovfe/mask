import React from "react";
import {Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

export const CustomIconButton = (props) => {
    return (
        <Tooltip title={props.title} placement={props.placement}>
            <IconButton onClick={props.handle}>
                {props.children}
            </IconButton>
        </Tooltip>
    )
}
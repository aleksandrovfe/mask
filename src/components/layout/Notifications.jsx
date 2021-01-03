import React, {Fragment, useEffect, useState} from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {connect} from "react-redux";
import {markNotificationsRead} from "../../redux/actions/userActions";
import {Badge, Menu, MenuItem, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from '@material-ui/icons/Chat';
import dayjs from "dayjs";

const Notifications = (props) => {
    const [anchor, setAncgor] = useState(null)
    const [notifyIcon, setNotifyIcon] = useState(null)

    useEffect(() => {
        if (props.notifications && props.notifications.length > 0) {
            const notReadNotifications = props.notifications.filter(not => not.read === false).length
            notReadNotifications > 0
                ? setNotifyIcon(
                <Badge
                    badgeContent={notReadNotifications}>
                    <NotificationsIcon/>
                </Badge>
                )
                : setNotifyIcon(<NotificationsIcon/>)
        } else {
            setNotifyIcon(<NotificationsIcon/>)
        }
    }, [props.notifications])

    const notificationsMarkup = props.notifications && props.notifications.length ?
        props.notifications.map(not => {
            const verb = not.type === 'like' ? 'liked' : 'commented on'
            const time = dayjs(not.createdAt).fromNow()
            const iconColor = not.read ? 'secondary' : 'primary'
            const icon = not.type === 'like'
                ? <FavoriteIcon color={iconColor}/>
                : <ChatIcon color={iconColor}/>

            return (
                <MenuItem key={not.createdAt} onClick={() => setAncgor(null)}>
                    {icon}
                    <a className="notifications__link" href={`/user/${not.recipient}/scream/${not.screamId}`}>
                        {not.sender} {verb} your scream {time}
                    </a>
                </MenuItem>
            )
        }) : <MenuItem onClick={() => setAncgor(null)}>
            You have no notifications yet
        </MenuItem>

    const onMenuOpened = () => {
        const unreadNotificationsIds = props.notifications
            .filter(not => !not.read)
            .map(not => not.notificationId)
        props.markNotificationsRead(unreadNotificationsIds)
    }

    return (
        <Fragment>
            <Tooltip placement="top" title="notifications">
                <IconButton
                    aria-owns={anchor ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={(event) => setAncgor(event.target)}
                >
                    {notifyIcon}
                </IconButton>

            </Tooltip>
            <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={() => setAncgor(null)}
                onEnter={onMenuOpened}
            >
                {notificationsMarkup}
            </Menu>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, {markNotificationsRead})(Notifications)
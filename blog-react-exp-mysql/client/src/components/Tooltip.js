import React, { useCallback } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Avatar from "@mui/material/Avatar";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import {styled} from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {userLogout} from "../store/userSlice";
import {useDispatch, useSelector} from "react-redux";

export const UserMenuPopper = ({dataUser, ...props}) => {
    const dispatch = useDispatch()

    const DataUser = dataUser

    const [openTooltip, setOpenTooltip] = React.useState(false);
    const handleTooltipClose = () => {
        setOpenTooltip(false);
    };
    const handleTooltipOpen = () => {
        setOpenTooltip(true);
    };
    let itemStyle = !props.itemStyle ? {flexGrow: 1, m: 1, fontSize: '0.875rem'} : Object.assign({
        flexGrow: 1,
        m: 1,
        fontSize: '0.875rem',
    }, props.itemStyle)

    const censorWord = function (str) {
        return str[0] + str[1] + str[2] + "*".repeat(4) + str.slice(-1);
    }
    const censorEmail = function (email) {
        var arr = email.split("@");
        return "@" + censorWord(arr[0]);
    }

    const signOut = useCallback(() => {
        dispatch(userLogout());
    }, [dispatch]);

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <div>
                <CustomTooltip
                    // PopperProps={{
                    //     disablePortal: true
                    // }}
                    onClose={handleTooltipClose}
                    open={openTooltip}
                    // disableFocusListener
                    // disableHoverListener
                    // disableTouchListener
                    title={
                        <React.Fragment>
                            <Box sx={{display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1}}>
                                <Box sx={itemStyle}>
                                    <Avatar onClick={handleTooltipOpen}
                                            className="topImg">{DataUser.user?.userData?.image ? <image
                                        src={DataUser.user?.userData?.image}/> : DataUser.user?.userData?.username[0].toUpperCase()}</Avatar>
                                </Box>
                                <Box sx={itemStyle}>
                                    <Typography color="inherit"
                                                sx={{fontSize: '1em'}}>{DataUser.user?.userData?.username}</Typography>
                                    <Typography color="inherit"
                                                sx={{fontSize: '1em'}}>{censorEmail(DataUser.user?.userData?.email)}</Typography>
                                </Box>
                            </Box>
                            <MenuList>
                                <MenuItem>
                                    <ListItemIcon>
                                        <SettingsIcon fontSize="small"/>
                                    </ListItemIcon>
                                    <Typography variant="body2" color="text.secondary">
                                        Trang cá nhân
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small"/>
                                    </ListItemIcon>
                                    <Typography variant="body2" color="text.secondary" onClick={signOut}>
                                        Đăng xuất
                                    </Typography>
                                </MenuItem>
                            </MenuList>
                        </React.Fragment>
                    }
                >
                    <Avatar onClick={handleTooltipOpen}
                            className="topImg">{DataUser.user?.userData?.username ? DataUser.user?.userData?.username[0].toUpperCase() : '?'}</Avatar>
                </CustomTooltip>
            </div>
        </ClickAwayListener>
    )
}

export const CustomTooltip = styled(({className, ...props}) => {
    return (
        <Tooltip {...props} classes={{popper: className}}/>
)})(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));
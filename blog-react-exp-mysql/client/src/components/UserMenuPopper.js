import React from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import {CustomTooltip} from './Tooltip'
import Tooltip from "@mui/material/Tooltip/Tooltip";

export const UserMenuPopper = ({dataUser}) => {
    const DataUser = dataUser

    const [openTooltip, setOpenTooltip] = React.useState(false);
    const handleTooltipClose = () => {
        setOpenTooltip(false);
    };
    const handleTooltipOpen = () => {
        setOpenTooltip(true);
    };

    let itemStyle = {
        flexGrow: 1,
        m: 1,
        fontSize: '0.875rem',
    }

    const censorWord = function (str) {
        return str[0] + str[1] + str[2] + "*".repeat(4) + str.slice(-1);
    }
    const censorEmail = function (email){
        var arr = email.split("@");
        return "@" + censorWord(arr[0]);
    }

    return (
        <ClickAwayListener onClickAway={handleTooltipClose}>
            <CustomTooltip

                // disableFocusListener
                // disableHoverListener
                // disableTouchListener
                // PopperProps={{
                //     disablePortal: true
                // }}
                onClose={handleTooltipClose}
                open={openTooltip}
                title={
                    <>
                        <Box sx={{display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1}}>
                            <Box sx={itemStyle}>
                                <Avatar onClick={handleTooltipOpen}
                                        className="topImg">{DataUser.user?.userData?.image ? <image
                                    src={DataUser.user?.userData?.image}/> : DataUser.user?.userData?.username[0].toUpperCase()}</Avatar>
                            </Box>
                            <Box sx={itemStyle}>
                                <Typography color="inherit" sx={{fontSize: '1em'}}>{DataUser.user?.userData?.username}</Typography>
                                <Typography color="inherit" sx={{fontSize: '1em'}}>{censorEmail(DataUser.user?.userData?.email)}</Typography>
                            </Box>
                        </Box>
                        <MenuList>
                            <MenuItem>
                                <ListItemIcon>
                                    <SettingsIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="body2" color="text.secondary">
                                    Trang cá nhân
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="body2" color="text.secondary">
                                    Đăng xuất
                                </Typography>
                            </MenuItem>
                        </MenuList>
                    </>
                }
            >
                <Avatar onClick={handleTooltipOpen}
                        className="topImg">{DataUser.user?.userData?.username ? DataUser.user?.userData?.username[0].toUpperCase() : '?'}</Avatar>
            </CustomTooltip>
        </ClickAwayListener>
    )
}

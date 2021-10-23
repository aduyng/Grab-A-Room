import React from "react"
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import styled from "@mui/material/styles/styled";
import {DRAWER_WIDTH} from "../../consts";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import {Notifications} from "@mui/icons-material";

interface StyledAppBarProps extends MuiAppBarProps {
    open?: boolean;
}

interface AppBarProps extends StyledAppBarProps {
    toggleDrawer: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<StyledAppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function AppBar({open, toggleDrawer}: AppBarProps) {
    return (
        <StyledAppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && {display: 'none'}),
                    }}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{flexGrow: 1}}
                >
                    Grab-A-Room
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <Notifications/>
                    </Badge>
                </IconButton>
            </Toolbar>
        </StyledAppBar>
    )
}

import React from 'react';
import {IconButton, MenuItem} from "@mui/material";
import {StyledMenu} from "../menu/menu";
import AuthStore from "../auth/auth-store";

const UserActions = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-haspopup="true"
                onClick={handleClick}
                aria-expanded={open ? 'true' : undefined}
                id="user-actions"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12C4 13.1 4.9 14 6 14C6.53043 14 7.03914 13.7893 7.41421 13.4142C7.78929 13.0391 8 12.5304 8 12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10ZM18 10C17.4696 10 16.9609 10.2107 16.5858 10.5858C16.2107 10.9609 16 11.4696 16 12C16 13.1 16.9 14 18 14C18.5304 14 19.0391 13.7893 19.4142 13.4142C19.7893 13.0391 20 12.5304 20 12C20 11.4696 19.7893 10.9609 19.4142 10.5858C19.0391 10.2107 18.5304 10 18 10ZM12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 13.1 10.9 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10Z" fill="#98A2B3" fill-opacity="0.5"/>
                </svg>
            </IconButton>
            <StyledMenu
                id="user-actions"
                MenuListProps={{
                    'aria-labelledby': 'user-actions',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => AuthStore.logout()} disableRipple>
                    <svg className="me-3" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.22222 3.44445C3.22222 2.09442 4.31663 1 5.66667 1H14.1111C15.4611 1 16.5556 2.09442 16.5556 3.44444V14.5556C16.5556 15.9056 15.4611 17 14.1111 17H5.66667C4.31664 17 3.22222 15.9056 3.22222 14.5556V11H4.55556V14.5556C4.55556 15.1692 5.05302 15.6667 5.66667 15.6667H14.1111C14.7248 15.6667 15.2222 15.1692 15.2222 14.5556V3.44444C15.2222 2.83079 14.7248 2.33333 14.1111 2.33333H5.66667C5.05302 2.33333 4.55556 2.8308 4.55556 3.44445V6.77778H3.22222V3.44445ZM8.97304 4.97304C8.71269 5.23339 8.71269 5.6555 8.97304 5.91585L11.3905 8.33333L1.66667 8.33333C1.29848 8.33333 1 8.63181 1 8.99999C1 9.36819 1.29848 9.66666 1.66667 9.66666L11.3905 9.66667L8.97304 12.0842C8.71269 12.3445 8.71269 12.7666 8.97304 13.027C9.23339 13.2873 9.6555 13.2873 9.91585 13.027L13.4714 9.47141C13.7318 9.21105 13.7318 8.78894 13.4714 8.5286L9.91585 4.97304C9.6555 4.71269 9.23339 4.71269 8.97304 4.97304Z" fill="#98A2B3"/>
                    </svg>
                    Logout
                </MenuItem>
            </StyledMenu>
        </div>
    );
};

export default UserActions;
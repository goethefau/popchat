import React from 'react';
import {IconButton, MenuItem} from "@mui/material";
import {StyledMenu} from "../menu/menu";
import AuthStore from "../auth/auth-store";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, getFirestore, orderBy, query} from "firebase/firestore";
import {app} from "../firestore/firebase-config";
import useRemoveDoc from "../firestore/useRemoveDoc";
import {doc} from "firebase/firestore"

const UserActions = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {remove} = useRemoveDoc()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [value, loading, error] = useCollection(
        query(collection(getFirestore(app), 'messages'), orderBy("createdAt")),
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    );

    const clearChat = () => {
        if (value) {
            value.docs.forEach(document => {
                remove(doc(AuthStore.firestore, "messages", `${document.id}`))
            })
        }
    }

    return (
        <div>
            <IconButton
                aria-haspopup="true"
                onClick={handleClick}
                aria-expanded={open ? 'true' : undefined}
                id="user-actions"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 10C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12C4 13.1 4.9 14 6 14C6.53043 14 7.03914 13.7893 7.41421 13.4142C7.78929 13.0391 8 12.5304 8 12C8 11.4696 7.78929 10.9609 7.41421 10.5858C7.03914 10.2107 6.53043 10 6 10ZM18 10C17.4696 10 16.9609 10.2107 16.5858 10.5858C16.2107 10.9609 16 11.4696 16 12C16 13.1 16.9 14 18 14C18.5304 14 19.0391 13.7893 19.4142 13.4142C19.7893 13.0391 20 12.5304 20 12C20 11.4696 19.7893 10.9609 19.4142 10.5858C19.0391 10.2107 18.5304 10 18 10ZM12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 13.1 10.9 14 12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10Z"
                        fill="#98A2B3" fill-opacity="0.5"/>
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
                    <svg className="me-3" width="18" height="18" viewBox="0 0 18 18" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.22222 3.44445C3.22222 2.09442 4.31663 1 5.66667 1H14.1111C15.4611 1 16.5556 2.09442 16.5556 3.44444V14.5556C16.5556 15.9056 15.4611 17 14.1111 17H5.66667C4.31664 17 3.22222 15.9056 3.22222 14.5556V11H4.55556V14.5556C4.55556 15.1692 5.05302 15.6667 5.66667 15.6667H14.1111C14.7248 15.6667 15.2222 15.1692 15.2222 14.5556V3.44444C15.2222 2.83079 14.7248 2.33333 14.1111 2.33333H5.66667C5.05302 2.33333 4.55556 2.8308 4.55556 3.44445V6.77778H3.22222V3.44445ZM8.97304 4.97304C8.71269 5.23339 8.71269 5.6555 8.97304 5.91585L11.3905 8.33333L1.66667 8.33333C1.29848 8.33333 1 8.63181 1 8.99999C1 9.36819 1.29848 9.66666 1.66667 9.66666L11.3905 9.66667L8.97304 12.0842C8.71269 12.3445 8.71269 12.7666 8.97304 13.027C9.23339 13.2873 9.6555 13.2873 9.91585 13.027L13.4714 9.47141C13.7318 9.21105 13.7318 8.78894 13.4714 8.5286L9.91585 4.97304C9.6555 4.71269 9.23339 4.71269 8.97304 4.97304Z"
                            fill="#98A2B3"/>
                    </svg>
                    Logout
                </MenuItem>
                <MenuItem onClick={clearChat} disableRipple>
                    <svg className="me-3" width="15" height="16" viewBox="0 0 15 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.8 1.19712C9.02091 1.19712 9.2 1.37578 9.2 1.59616V2.39424H5.2V1.59616C5.2 1.37578 5.37909 1.19712 5.6 1.19712H8.8ZM4 1.59616V2.39424H0.6C0.268629 2.39424 0 2.66223 0 2.9928C0 3.32338 0.268629 3.59136 0.6 3.59136H1.6V14.4038C1.6 15.2854 2.31634 16 3.2 16H11.2C12.0837 16 12.8 15.2854 12.8 14.4038V3.59136H13.8C14.1314 3.59136 14.4 3.32338 14.4 2.9928C14.4 2.66223 14.1314 2.39424 13.8 2.39424H10.4V1.59616C10.4 0.714626 9.68365 0 8.8 0H5.6C4.71634 0 4 0.714626 4 1.59616ZM11.6 3.59136V14.4038C11.6 14.6242 11.4209 14.8029 11.2 14.8029H3.2C2.97909 14.8029 2.8 14.6242 2.8 14.4038V3.59136H11.6ZM8.4 5.38705L8.4 12.9688C8.4 13.2994 8.66863 13.5674 9 13.5674C9.33137 13.5674 9.6 13.2994 9.6 12.9688L9.6 5.38705C9.6 5.05647 9.33137 4.78848 9 4.78848C8.66863 4.78848 8.4 5.05647 8.4 5.38705ZM4.8 12.9688V5.38705C4.8 5.05647 5.06863 4.78848 5.4 4.78848C5.73137 4.78848 6 5.05647 6 5.38705V12.9688C6 13.2994 5.73137 13.5674 5.4 13.5674C5.06863 13.5674 4.8 13.2994 4.8 12.9688Z"
                            fill="#98A2B3"/>
                    </svg>

                    Clear Chat
                </MenuItem>
            </StyledMenu>
        </div>
    );
};

export default UserActions;
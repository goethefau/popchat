import {Menu, MenuItem, MenuItemProps, MenuProps, styled} from "@mui/material";
import {typography_theme_props} from "../page_components/typography";

export const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        {...props}
    />
))(() => ({
    '& .MuiPaper-root': {
        minWidth: 180,
        boxShadow: "0px 1px 1px 0px rgba(152, 162, 179, 0.25)",
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            color: typography_theme_props.$light,
            fontSize: 16,
            fontFamily: typography_theme_props.regular,
            maxHeight: 36,
            minHeight: 36,

            '& .MuiSvgIcon-root': {
                fontSize: 16,
                color: typography_theme_props.$light,
                marginRight: 16,
            },
            '&:active, &:hover': {
                backgroundColor: "rgba(238, 244, 255, 0.5)"
            },
        },
    }
}))
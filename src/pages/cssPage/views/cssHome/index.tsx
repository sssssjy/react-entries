import {Outlet, useLocation, useNavigate} from "react-router";
import {Menu, Grid, MenuItem, Paper, Container, ListItem, List, ListItemText} from '@mui/material';
import {useEffect, useState} from "react";
import routes from '../../router'

const CssHome = () => {

    const [menuList, setMenuList] = useState<Array<any>>([]);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onMenuItemClick = menu => {
        navigate(menu.path);
        setAnchorEl(null);
    }

    useEffect(() => {
        const cssMenu = routes.find(item => item.path === '/cssHome') || [] as any;
        setMenuList(cssMenu.children || []);
    }, []);

    useEffect(() => {
        // console.log(location, menuList)
        if (!location.pathname || !menuList?.length) return;
        const findIndex = menuList.findIndex(item => item.path === location.pathname);
        setSelectedIndex(findIndex);
    }, [location, menuList]);

    return <Grid container spacing={2}>
        <Grid item xs={'auto'}>
            <Paper>
                <List
                    component="nav"
                    aria-label="Device settings"
                    sx={{ bgcolor: 'background.paper' }}
                >
                    <ListItem
                        button
                        id="lock-button"
                        aria-haspopup="listbox"
                        aria-controls="lock-menu"
                        aria-label="when device is locked"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickListItem}
                    >
                        <ListItemText
                            primary={menuList[selectedIndex]?.name}
                            secondary={menuList[selectedIndex]?.path}
                        />
                    </ListItem>
                </List>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'lock-button',
                        role: 'listbox',
                    }}
                >
                    {
                        menuList.map((menu, index) =>
                            <MenuItem
                                key={menu.path}
                                onClick={() => onMenuItemClick(menu)}
                                selected={index === selectedIndex}
                            >
                                {menu.name}
                            </MenuItem>)
                    }
                </Menu>
            </Paper>
        </Grid>
        <Grid item xs>
            <Container fixed>
                <Outlet />
            </Container>
        </Grid>
    </Grid>
}

export default CssHome;

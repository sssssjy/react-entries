import {Outlet, useNavigate} from "react-router";
import {MenuList, Grid, MenuItem, Paper, Container} from '@mui/material';
import {useEffect, useState} from "react";
import routes from '../../router'

const CssHome = () => {

    const [menuList, setMenuList] = useState<Array<any>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cssMenu = routes.find(item => item.path === '/cssHome') || [] as any;
        setMenuList(cssMenu.children || []);
    }, []);


    return <Grid container spacing={2}>
        <Grid item xs={4}>
            <Paper>
                <MenuList>
                    {
                        menuList.map(menu => <MenuItem key={menu.path} onClick={() => navigate(menu.path)}>{menu.name}</MenuItem>)
                    }
                </MenuList>
            </Paper>
        </Grid>
        <Grid item xs={8}>
            <Container fixed>
                <Outlet />
            </Container>
        </Grid>
    </Grid>
}

export default CssHome;

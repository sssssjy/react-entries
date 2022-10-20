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

        Object.prototype[Symbol.iterator] = function () {
            const keys = Object.keys(this);
            const values = this;
            let i = 0;
            let length = keys.length;
            return {
                next: function (props) {
                    if (i < length ) {
                        return {
                            value: values[keys[i]],
                            done: false
                        }
                    } else {
                         return {
                            value: '',
                            done: true
                        }
                    }
                }
            }
        }
        // @ts-ignore
        const [a,b] = {a:1,b:1}
        console.log('a', a, 'b', b);
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

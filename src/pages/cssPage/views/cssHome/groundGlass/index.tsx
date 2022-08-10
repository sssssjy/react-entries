import styles from './index.module.scss'
import {Button, Grid, Stack, CircularProgress, Typography, Box} from '@mui/material'

export default () => {
    return <div className={styles.groundGlass}>
        <div className="header" />
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Commodi deleniti deserunt dignissimos doloribus earum eveniet
            illo illum necessitatibus, omnis pariatur quis ratione sed
            tempore veniam vero vitae voluptates? Nesciunt, numquam.
        </div>
        <Grid>
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
        </Grid>
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
            <CircularProgress color="success" />
            <CircularProgress color="inherit" />
        </Stack>
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h1" component="div" gutterBottom>
                h1. Heading
            </Typography>
            <Typography variant="h2" gutterBottom component="div">
                h2. Heading
            </Typography>
            <Typography variant="h3" gutterBottom component="div">
                h3. Heading
            </Typography>
            <Typography variant="h4" gutterBottom component="div">
                h4. Heading
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                h5. Heading
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
                h6. Heading
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
                subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
                subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur
            </Typography>
            <Typography variant="body1" gutterBottom>
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                quasi quidem quibusdam.
            </Typography>
            <Typography variant="body2" gutterBottom>
                body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                quasi quidem quibusdam.
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
                button text
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
                caption text
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
                overline text
            </Typography>
        </Box>
    </div>
}

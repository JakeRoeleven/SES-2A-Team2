import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href='/land'>
        Course Recommendations System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    body: {
        margin:theme.spacing(1, 'auto'),
    },
    root: {
        flexGrow: 1,
        margin: 0,
    },
    title: {
        flexGrow: 1,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6];

export default function Album() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <img alt='' src={window.location.origin + '/small-light-logo.png'} style={{ cursor: 'pointer', width: '2vw', marginRight: '10px'}} onClick={() => history.push('/land')} ></img>
                <Typography variant="h6" className={classes.title}>
                    Course4You
                </Typography>
                </Toolbar>
            </AppBar>
        </div>
      
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom>
               The right courses for you
            </Typography>
            <Typography variant="h5" align="left" color="textSecondary" paragraph>
            Ready to take the next step? <br/> We are here to help! 
            </Typography>
            <Typography variant="h6" align="left" color="textSecondary" paragraph>
            The Most Reliable Course Recommender Within Your Reach.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="left">
                <Grid item>
                  <Button href="/login" variant="contained" color="primary">
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button href="/register" variant="outlined" color="primary">
                    Register
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <hr/>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Faculty
                    </Typography>
                    <Typography>
                      Faculty info
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <hr/>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
            <IconButton color="inherit" href="https://github.com/JakeRoeleven/SES-2A-Team2">
                <GitHubIcon  fontSize="large" alignItems="center"/>
            </IconButton>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          for all courses within UTS Handbook          
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
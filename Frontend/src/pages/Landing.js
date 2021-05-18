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
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
//import AccountCircle from '@material-ui/icons/AccountCircle';
import {useHistory} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' style={{ marginTop: '1.5%' }}>
            {'Copyright © '}
            <Link color='inherit'>Team 2 (UTS SES 2A)</Link> {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    body: {
        margin: theme.spacing(1, 'auto'),
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
		textAlign: 'center',
		paddingBottom: '5px !important'
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
		paddingLeft: '2.5%',
		paddingRight: '2.5%'
    },
}));

const cards = ['Engineering', 'Science', ' Business', 'Health', 'Education', 'Law'];
const cardImg = ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
'https://images.unsplash.com/photo-1518152006812-edab29b069ac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
'https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80', 
'https://images.unsplash.com/photo-1567057419565-4349c49d8a04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80', 
'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',];


export default function Album(props) {
    const classes = useStyles();
    let history = useHistory();

    document.body.style.overflow = 'auto';

	if (sessionStorage.getItem('user_id') === null) {
		return (
			<React.Fragment>
				<CssBaseline />
	
				<div className={classes.root}>
					<AppBar position='static'>
						<Toolbar>
							<img alt='' src={window.location.origin + '/small-light-logo.png'} style={{cursor: 'pointer', width: '2vw', marginRight: '10px'}} onClick={() => history.push('/')}></img>
							<Typography variant='h6' className={classes.title}>
								Course Recommender
							</Typography>
						</Toolbar>
					</AppBar>
				</div>
	
				<main>
					{/* Hero unit */}
					<div className={classes.heroContent + ' animated'}>
						<Container style={{padding: '3%', maxWidth: '95%', textAlign: 'center ', color: 'white', fontWeight: '100'}}>
							<img alt='' src={window.location.origin + '/small-light-logo.png'} style={{cursor: 'pointer', width: '12vw', marginRight: '10px'}} onClick={() => history.push('/')}></img>
							<Typography component='h1' variant='h2' gutterBottom style={{fontWeight: 'bold'}}>
								{' '}
								FIND THE COURSES YOU NEED, NOW!{' '}
							</Typography>
							<Typography variant='h5' paragraph style={{textTransform: 'uppercase', fontWeight: '100'}}>
								Ready to take the next step? <br /> We are here to help!
							</Typography>
							<div className={classes.heroButtons}>
								<Grid container spacing={2} justify='center'>
									<Grid item>
										<Button href='/login' size='large' variant='outlined' style={{color: 'white', borderColor: 'white'}}>
											Login
										</Button>
									</Grid>
									<Grid item>
										<Button href='/register' size='large' variant='contained' style={{fontWeight: '400', color: '#289dcc', background: 'white', borderColor: 'white'}}>
											Register
										</Button>
									</Grid>
								</Grid>
							</div>
						</Container>
					</div>
					<Container className={classes.cardGrid} maxWidth='md'>
						{/* End hero unit */}
						<Grid container spacing={4} style={{ paddingTop: '0px'}}>
							{cards.map((card, index) => (
								<Grid item key={card} xs={12} sm={6} md={4}>
									<Card className={classes.card + ' animatedHover'}>
										<CardMedia className={classes.cardMedia} image={cardImg[index]} title='Image title' />
										<CardContent className={classes.cardContent}>
											<Typography gutterBottom variant='h5' component='h2'>{card}</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Container>
				</main>
				{/* Footer */}
				<footer className={classes.footer}>
					<Grid container spacing={4} fullWidth={true}>
						<Grid item  style={{ textAlign: 'left' }} xs={6}>
							<Copyright />
						</Grid>
						<Grid item style={{ textAlign: 'right' }} xs={6}>
							<Typography variant='subtitle1' color='textSecondary' component='p'>
								<span style={{ marginRight: '30px', marginTop: '10px'}}>Works with all courses in the UTS Handbook</span>
								<IconButton size='small' color='inherit' href='https://github.com/JakeRoeleven/SES-2A-Team2'>
									<GitHubIcon fontSize='large' alignItems='center' />
								</IconButton>
							</Typography>
						</Grid>
					</Grid>
				</footer>
				{/* End footer */}
			</React.Fragment>
		);
	} else {
		return <Redirect to="/home" />
	}

}

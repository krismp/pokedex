import React from 'react';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Alert from "./Alert";
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert, closeAlert } from '../store';
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  body: {
    marginTop: `5rem`,
    margin: `3rem auto`,
    maxWidth: `900px`,
    padding: `3em`
  },
  title: {
    flexGrow: 1,
  },
  link: {
    fontFamily: theme.typography.fontFamily,
    textDecoration: `none`,
    color: theme.palette.primary.contrastText,
    marginRight: `20px`
  }
}));

export function Layout(props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <BubbleChartIcon />
          </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link href="/">
                <a className={classes.link}>Pokédex</a>
              </Link>
            </Typography>
            <Link href="/pokemons/my-list">
              <a className={classes.link}>My Pokemon List Page</a>
            </Link>
        </Toolbar>
      </AppBar>
      <Box className={classes.body}>
        {props.children}
      </Box>
      <Alert
        isOpen={props.displayAlert.show}
        autoHideDuration={props.displayAlert.autoHideDuration}
        message={props.displayAlert.message}
        severity={props.displayAlert.severity}
        onClose={props.closeAlert}
      />
    </Box>
  );
}

function mapStateToProps(state) {
  const { displayAlert } = state
  return { displayAlert }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ closeAlert, showAlert }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
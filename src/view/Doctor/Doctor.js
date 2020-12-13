import React, { useState, useEffect, useReducer } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import {reactLocalStorage} from 'reactjs-localstorage';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import FormHelperText from '@material-ui/core/FormHelperText';
import moment from 'moment';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: '100%'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexShrink: 0,
    width: '400px'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexShrink: 0,
    width: '300px'
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 0,
  },
  baseline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'baseline',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

var Doctor = inject('auth')(
  observer(({ auth }) => {
  const classes = useStyles();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  let doctorsObj = reactLocalStorage.getObject('doctors')
  let doctorsArr = Array.from(doctorsObj, x => x)

  const removeReception = (id) => {
    let newReception = auth.name[0].receptions.filter(i => i.id != id)
    doctorsArr.forEach(i => (i.name == auth.name[0].name) ?  i.receptions = newReception : null)
    reactLocalStorage.setObject('doctors', doctorsArr)
    forceUpdate();
  }

  return (
    <Container component="main" maxWidth="xs">
      <AppBar position="absolute" className={classes.appBarShift}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Hello {doctorsArr[auth.doctorID].name}!
          </Typography>
          <IconButton color="inherit">
            <Button variant="contained" onClick={() => auth.logOutAdmin()}>Log out</Button>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.paper}>
        {doctorsArr[auth.doctorID].receptions.map(i => (
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                <AccessibleForwardIcon /> {i.patientName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {i.disease}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {i.date}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={() => removeReception(i.id)}>
                Submit
              </Button>
              <Button size="small" color="secondary" onClick={() => removeReception(i.id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
})
)

export default Doctor
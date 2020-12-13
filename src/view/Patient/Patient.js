import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Select from '@material-ui/core/Select';
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  }
}));

function dates(current) {
  var week= new Array(); 
  // Starting Monday not Sunday
  current.setDate((current.getDate() - current.getDay() +1));
  for (var i = 0; i < 7; i++) {
      week.push(
          new Date(current)
      ); 
      current.setDate(current.getDate() +1);
  }
  return week; 
}

const week = dates(new Date)

var Patient = inject('auth')(
  observer(({ auth }) => {
  const classes = useStyles();

  const [date, setDate] = React.useState('');

  let doctorsObj = reactLocalStorage.getObject('doctors')
  let doctorsArr = Array.from(doctorsObj, x => x)


  const setReception = (date) => {
    let doc = doctorsArr.filter(i => i.name == auth.name[0].doctor)
    let newReception = {id: Math.random(), patientName: auth.name[0].name, disease: auth.name[0].disease, date: date}
    doctorsArr.splice(doc[0].id, 1, {id: doc[0].id, name: doc[0].name, profile: doc[0].profile, available: doc[0].available, receptions: newReception, pass: doc[0].pass});
    reactLocalStorage.setObject('doctors', doctorsArr)
  }

  const cancelReception = () => {
    let doc = doctorsArr.filter(i => i.name == auth.name[0].doctor)
    doctorsArr.splice(doc[0].id, 1, {id: doc[0].id, name: doc[0].name, profile: doc[0].profile, available: doc[0].available, receptions: [], pass: doc[0].pass});
    reactLocalStorage.setObject('doctors', doctorsArr)
  }

  const handleChange = (event) => {
    setDate(event.target.value)
    setReception(event.target.value)
  };

  const cancelAppointment = () => {
    setDate('')
    cancelReception()
  }

  return (
    <Container component="main" maxWidth="xs">
      <AppBar position="absolute" className={classes.appBarShift}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Hello {auth.name[0].name}!
          </Typography>
          <IconButton color="inherit">
            <Button variant="contained" onClick={() => auth.logOutAdmin()}>Log out</Button>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.paper}>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Your's name:</Typography>
          <Typography className={classes.secondaryHeading}>{auth.name[0].name}</Typography>
        </AccordionSummary>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Your's disease:</Typography>
          <Typography className={classes.secondaryHeading}>{auth.name[0].disease}</Typography>
        </AccordionSummary>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Your's doctor:</Typography>
          <Typography className={classes.secondaryHeading}>{auth.name[0].doctor}</Typography>
        </AccordionSummary>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.baseline}
        >
          <Typography className={classes.heading}>Make an appointment</Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Date</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={date}
                onChange={handleChange}
              >
                {week.map(i => (
                  <MenuItem value={moment(i).format('DD/MM/YYYY')}>{moment(i).format('DD/MM/YYYY')}</MenuItem>
                ))}
              </Select>
            </FormControl>
        </AccordionSummary>
        <AccordionSummary
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Cancel an appointment</Typography>
          <Typography className={classes.secondaryHeading}>
            <Button variant="contained" color="secondary" onClick={() => cancelAppointment()}>
              Cancel
            </Button>
          </Typography>
        </AccordionSummary>
      </div>
    </Container>
  );
})
)

export default Patient
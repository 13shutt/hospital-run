import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Title from './Title';
import Grid from '@material-ui/core/Grid';
import {reactLocalStorage} from 'reactjs-localstorage';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { doctors } from '../../db/users';



// Generate Order Data

let doctorsObj = reactLocalStorage.getObject('doctors')
let doctorsArr = Array.from(doctorsObj, x => x)

const addNewDoctor = (name, profile, available) => {
  doctorsArr.push({id: Math.random(), name, profile, available})
  reactLocalStorage.setObject('doctors', doctorsArr)
}

const removeDoctor = (id) => {
  let newArr = doctorsArr.filter(i => i.id != id);
  console.log(newArr)
  reactLocalStorage.setObject('doctors', newArr)
  window.location.reload()
}


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



export default function Doctors(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState('');
  const [profile, setProfile] = useState('');
  const [available, setAvailable] = useState('');

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleProfile = (e) => {
    setProfile(e.target.value)
  }

  const handleAvailable = (e) => {
    setAvailable(e.target.value)
  }

  const submitButton = (e) => {
    e.preventDefault()
    if (name === '' || profile === ''|| available === '') {
      alert('Fields are empty!')
    } else {
      addNewDoctor(name, profile, available)
      handleClose()
    }
  }

  console.log(doctorsArr)
  return (
    <React.Fragment>
      <Title>Doctors</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Profile</TableCell>
            <TableCell>Available</TableCell>
            <TableCell align="right">Remove Doctor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctorsArr.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.profile}</TableCell>
              <TableCell>{row.available}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="secondary" onClick={() => removeDoctor(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add new doctor
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Add a new Doctor</h2>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                onChange={(e) => handleName(e)}
              />
              <TextField
                required
                id="profile"
                name="profile"
                label="Profile"
                fullWidth
                onChange={(e) => handleProfile(e)}
              />
              <TextField
                required
                id="available"
                name="available"
                label="Available"
                fullWidth
                onChange={(e) => handleAvailable(e)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => submitButton(e)}
              >
                Add
              </Button>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
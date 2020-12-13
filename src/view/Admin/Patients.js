import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Input } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import {reactLocalStorage} from 'reactjs-localstorage';

// Generate Order Data


let patientsObj = reactLocalStorage.getObject('patients')
let patientsArr = Array.from(patientsObj, x => x)

const removePatient = (id) => {
  let newArr = patientsArr.filter(i => i.id != id);
  reactLocalStorage.setObject('patients', newArr)
  window.location.reload()
}

const addNewPatient = (name, disease, doctor, stay) => {
  patientsArr.push({id: Math.random(), date: moment().format('DD/MM/YYYY'), name, disease, doctor, stay})
  reactLocalStorage.setObject('patients', patientsArr)
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

export default function Patients() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState('');
  const [disease, setDisease] = useState('');
  const [doctor, setDoctor] = useState('');
  const [stay, setStay] = useState('');

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleDisease = (e) => {
    setDisease(e.target.value)
  }
  const handleDoctor = (e) => {
    setDoctor(e.target.value)
  }
  const handleStay = (e) => {
    setStay(e.target.value)
  }

  const submitButton = (e) => {
    e.preventDefault()
    if (name === '' || disease === ''|| doctor === '' || stay === '') {
      alert('Fields are empty!')
    } else {
      addNewPatient(name, disease, doctor, stay)
      handleClose()
    }
  }
  return (
    <React.Fragment>
      <Title>Patients</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Disease</TableCell>
            <TableCell>Doctor</TableCell>
            <TableCell>Stay</TableCell>
            <TableCell align="right">Remove patient</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patientsArr.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.disease}</TableCell>
              <TableCell>{row.doctor}</TableCell>
              <TableCell>{row.stay}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="secondary" onClick={() => removePatient(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add new patient
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
                id="disease"
                name="disease"
                label="Disease"
                fullWidth
                onChange={(e) => handleDisease(e)}
              />
              <TextField
                required
                id="doctor"
                name="doctor"
                label="Doctor"
                fullWidth
                onChange={(e) => handleDoctor(e)}
              />
              <TextField
                required
                id="stay"
                name="stay"
                label="Stay"
                fullWidth
                onChange={(e) => handleStay(e)}
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
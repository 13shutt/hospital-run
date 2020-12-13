import moment from 'moment';

export const admin = {
  name: 'admin',
  pass: 'admin',
  role: 'admin'
}

function createData(id, date, name, disease, doctor, stay, password) {
  return { id, date, name, disease, doctor, stay, password };
}

export const patients = [
  createData(0, moment().format('DD/MM/YYYY'), 'Elvis Presley', 'Corona', 'Dr. House', 'Hospitalized', '123'),
  createData(1, moment().format('DD/MM/YYYY'), 'Paul McCartney', 'Corona', 'Dr. Dre', 'Home treatment', '123'),
  createData(2, moment().format('DD/MM/YYYY'), 'Tom Scholz', 'Corona', 'Dr. House', 'Hospitalized', '123'),
  createData(3, moment().format('DD/MM/YYYY'), 'Michael Jackson', 'Corona', 'Dr. House', 'Home treatment', '123'),
  createData(4, moment().format('DD/MM/YYYY'), 'Bruce Springsteen', 'Corona', 'Dr. Dre', 'Home treatment', '123'),
  createData(5, moment().format('DD/MM/YYYY'), 'Arsen', 'Huge Big Сock', 'Dr. Someone', 'Hospitalized', '123'),
];

function createDoctors(id, name, profile, available, receptions, pass) {
  return { id, name, profile, available, receptions, pass };
}

export const doctors = [
  createDoctors(0, 'Dr. Dre', 'Surgeon', 'Available', [], '123' ),
  createDoctors(1, 'Dr. House', 'Cardiologist','Available', [{id: 0, patientName: 'Elvis Presley', disease: 'Corona', date: "14/12/2020"}], '123'),
  createDoctors(2, 'Dr. Who', 'Dermatologist', 'Non Available', [], '123'),
  createDoctors(3, 'Dr. Someone', 'Big Dick Scientist', 'Available', [{id: 1, patientName: 'Arsen', disease: 'Huge Big Сock', date: "14/12/2020"}], '123'),
];
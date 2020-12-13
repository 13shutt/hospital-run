import React, { Component, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { Route, Switch, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
//import Login from './Login'
import Admin from './Admin'
import Patient from './Patient'
import Doctor from './Doctor'
import loader from '../assets/loader.gif'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loader: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh'
  },
}));

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <img src={loader} />
    </div>
  )
}

const Login = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import("./Login")), 2000);
  });
});

@inject('routing')
@inject('doctors')
@inject('patients')
@observer
export default class App extends Component {
  componentDidMount() {
    this.props.doctors.setDocs()
    this.props.patients.setPatients()
  }
  render() {
    {console.log(this.props)}
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Hospital Run</title>
        </Helmet>

        <Suspense fallback={<Spinner />}>
          <Switch>
            <Redirect exact from="/" to="login" />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={Admin} />
            <Route path="/patient" component={Patient} />
            <Route path="/doctor" component={Doctor} />
          </Switch>
        </Suspense>
      </>
    )
  }
}
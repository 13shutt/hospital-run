import { patients } from '../db/users'
import { observable, action, reaction } from 'mobx'
import { reactLocalStorage } from 'reactjs-localstorage';


class PatientsStore {

  setPatients() {
    let obj = reactLocalStorage.getObject('patients')

    if (Object.keys(obj).length === 0) {
      reactLocalStorage.setObject('patients', patients)
    } else {
      console.log('patients are seted')
    }
  }
}


export default new PatientsStore()
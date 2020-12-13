import { doctors } from '../db/users'
import { observable, action, reaction } from 'mobx'
import { reactLocalStorage } from 'reactjs-localstorage';


class DoctorsStore {

  setDocs() {
    let obj = reactLocalStorage.getObject('doctors')

    if (Object.keys(obj).length === 0) {
      reactLocalStorage.setObject('doctors', doctors)
    } else {
      console.log('doctors are seted')
    }
  }
}


export default new DoctorsStore()
import { observable, action, reaction } from 'mobx'
import { admin, patients, doctors } from '../db/users'
import { routing } from './routing'

class AuthStore {
  @observable authenticated = false

  @observable name = []

  @observable patientAuthorized = false

  @observable docAuthorized = false

  @observable doctorID = false
  

  loginUser(name, pass, role) {
    switch (role) {
      case 'admin':
        let userAuth = {name, pass, role}
        if (JSON.stringify(userAuth) == JSON.stringify(admin)) {
          this.name = name.toUpperCase()
          this.authenticated = true
          routing.push('/admin')
        } else {
          alert( "Oooooops, someting went wrong!" );
        }
        break;
      case 'doctor':
        let docAuth = {name, pass, role}
        let docID
        let doc
        doctors.forEach(i => {
          if (((i.name == docAuth.name) && (i.pass == docAuth.pass))) {
            docID = i.id
            this.doctorID = i.id
            doc = doctors.filter(i => i.id == docID)
            this.name = doc
            this.docAuthorized = true
            routing.push('/doctor')
          }})
        if (this.docAuthorized == false) {
          alert( "Oooooops, someting went wrong!" );
        } 
        break;
      case 'patient':
        let patientAuth = {name, pass, role}
        let authoredID
        let authored
        patients.forEach(i => {
          if (((i.name == patientAuth.name) && (i.password == patientAuth.pass))) {
            authoredID = i.id
            authored = patients.filter(i => i.id == authoredID)
            this.name = authored
            this.patientAuthorized = true
            routing.push('/patient')
          }})
        if (this.patientAuthorized == false) {
          alert( "Oooooops, someting went wrong!" );
        } 
        break;
      default:
        alert( "Oooooops, someting went wrong!" );
    }
  }

  logOutAdmin() {
    this.authenticated = false
    this.patientAuthorized = false
    this.docAuthorized = false
    routing.push('/login')
  }

  setUserData(res) {
    this.user = res
    console.log(this.user)
  }
}

export default new AuthStore()
import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'

const browserHistory = createBrowserHistory()
const routing = new RouterStore()

const history = syncHistoryWithStore(browserHistory, routing)

export { routing, history }
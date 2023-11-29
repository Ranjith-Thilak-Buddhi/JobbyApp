import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './LoginForm/index'
import Home from './Home/index'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute/index'
import JobsPage from './JobsPage/index'
import JobDetails from './JobDetails/index'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobsPage} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App

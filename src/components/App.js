import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"



function App() {

  return (

    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ height: '100vh' }}
          >
            <div className="d-flex justify-content-evenly">
              <div className='left-title-image' >
              {/* bg-dark text-light d-flex align-items-center rounded  */}
              {/* "h2 text-center m-3 */}
                <h1 className='left-title-text'>Дневник преподавателя</h1>
              </div>

              <div style={{ width: '50vw', maxWidth: '500px' }}>
                <div className="p-4" >
                  <PrivateRoute path="/update-profile" component={UpdateProfile} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </div>

              </div>
            </div>
          </Container>
        </Switch>
      </AuthProvider>
    </Router>

  )
}

export default App

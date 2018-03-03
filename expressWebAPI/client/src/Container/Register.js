import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AskInput from '../Components/AskInput';

class Register extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      registerSuccess: false,
    }
  }
  register(registerCreds) {
      fetch( "/users/register", {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify( registerCreds ),
      })
      .then( response => response.json() )
      .then( responseJson => {
        this.setState({
          registerSuccess: true
        })
      })
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AskInput
              buttonLabel="register"
              handleClick={(registerCreds) => this.register(registerCreds)} />
          <br />
          <Link to='/user/login'>
            <RaisedButton label='Back to Login' />
          </Link>

          </div>
        </MuiThemeProvider>
        {
          this.state.registerSuccess
          ? (<Redirect to="/user/login" />)
          : null
        }
      </div>
    );
  }
}
export default Register;

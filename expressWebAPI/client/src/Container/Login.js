import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AskInput from '../Components/AskInput';


class Login extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      email: '',
      loginSuccess: false,
    }
  }

  login(loginCreds) {
      fetch( "/users/login", {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(loginCreds ),
      })
      .then( response => response.json() )
      .then( responseJson => {
        this.setState({
          loginSuccess: true,
          email: loginCreds.email
        })
      })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AskInput
              buttonLabel="login"
              handleClick={(loginCreds) => this.login(loginCreds)} />
            <br />
            <Link to='/user/register'>
              <RaisedButton label='Register' />
            </Link>
            </div>
        </MuiThemeProvider>
        {
          this.state.loginSuccess
          ? (<Redirect to={ "/user/" + this.state.email } />)
          : null
        }
      </div>
    );
  }
}
export default Login;

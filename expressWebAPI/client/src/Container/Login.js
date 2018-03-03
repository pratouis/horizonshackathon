import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';



class Login extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      email: '',
      password: '',
      loginSuccess: false,
    }
  }
  login() {
    if( this.state.email.trim() && this.state.password.trim() ) {
      fetch( "/users/login", {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify( this.state ),
      })
      .then( response => response.json() )
      .then( responseJson => {
        this.setState({
          loginSuccess: true
        })
      })
    }
  }
  render() {
    return (
      <div>
        <input type="text" placeholder="Email"
          onChange={ (e) => this.setState({ email: e.target.value }) } />
        <br/>
        <input type="password" placeholder="Password"
          onChange={ (e) => this.setState({ password: e.target.value }) } />
        <br/>
        <button onClick={ () => this.login() } >
          Log In
        </button>
        <br/>
        <Link to="/users/register">
          <button>Register</button>
        </Link>
        {
          this.state.loginSuccess
          ? (<Redirect to={ "/users/" + this.state.email } />)
          : null
        }
      </div>
    );
  }
}
export default Login;

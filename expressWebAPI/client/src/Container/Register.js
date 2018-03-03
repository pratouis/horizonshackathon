import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Register extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      email: '',
      password: '',
      registerSuccess: false,
    }
  }
  register() {
    if( this.state.email.trim() && this.state.password.trim() ) {
      fetch( "/users/register", {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify( this.state ),
      })
      .then( response => response.json() )
      .then( responseJson => {
        this.setState({
          registerSuccess: true
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
        <button onClick={ () => this.register() } >
          Register
        </button>
        {
          this.state.registerSuccess
          ? (<Redirect to="/users/login" />)
          : null
        }
      </div>
    );
  }
}
export default Register;

import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AskInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: true,
      loginSuccess: false,
      password: '',
      email: '',
    }
  }

  handleChange() {
    if(this.state.email && this.state.password){
      console.log('here');
      this.setState({disable: false});
    }
  }

  handleSubmit() {
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
  render() {
    return(<div>
      <MuiThemeProvider>
        <h2>excelerate</h2>
      <TextField
        floatingLabelText="email"
        onChange={(e) => {this.setState({email: e.target.value}); this.handleChange()}}
      />
    <br />
    <TextField
      floatingLabelText="password"
      type="password"
      onChange={(e) => {this.setState({password: e.target.value}); this.handleChange()}}
    />
    <br />
    <RaisedButton
      label="Login"
      disabled={this.state.disable}
      onClick={() => this.handleSubmit()}
      />
      </MuiThemeProvider>
      {
        this.state.loginSuccess
        ? (<Redirect to={ "/users/" + this.state.email } />)
        : null
      }
    </div>);
  }
}
export default AskInput;

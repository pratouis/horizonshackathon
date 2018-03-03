import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


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
      this.setState({disable: false});
    }
  }

  render() {
    return(<div>
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
      label={this.props.buttonLabel}
      disabled={this.state.disable}
      onClick={() => this.props.handleClick( this.state )}
      />
    </div>);
  }
}
export default AskInput;

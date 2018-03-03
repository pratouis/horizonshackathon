import React, { Component } from 'react';
//import '../App.css';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PotentialGraph from '../Components/PotentialGraph';

class MuiDashboard extends Component {
  constructor(props){
    super(props);
    // console.log(this.props.param);
    this.state = {
      shortcuts: [],
      used: [],
      potential: []
    }
  }

  componentDidMount(){
    fetch( `/${this.props.match.params.email}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then (res => res.json())
    .then( responseJson => {
      this.setState({
        shortcuts: responseJson.shortcuts,
        used: responseJson.used,
        potential: responseJson.potential
      });
      console.log( "state after login: ", this.state );
    })
    .catch(err => console.log('error in getting user statistics: '+err) )
  }
  render() {
    return( <MuiThemeProvider>
    <Table stripedRows={true}>
          <TableHeader
            displaySelectAll={false}
          adjustForCheckbox={false}>
            <TableRow>
             <TableHeaderColumn tooltip="The ID">description</TableHeaderColumn>
             <TableHeaderColumn tooltip="The Name">shortcut</TableHeaderColumn>
             <TableHeaderColumn tooltip="The Status">progress</TableHeaderColumn>
           </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}>
            {this.state.shortcuts.map( (shortcut, index) => (
              <TableRow key={index}>
                <TableRowColumn>{shortcut.desc}</TableRowColumn>
                <TableRowColumn>{shortcut.keys}</TableRowColumn>
                <TableRowColumn><PotentialGraph usedArr={ this.state.used[ index ] }/></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
    </Table>
  </MuiThemeProvider>)
  }
}
export default MuiDashboard;

import React, { Component } from 'react';
import '../App.css';
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
      potential: [],
      descBox: {
        msg: '',
        top: -60
      }
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
        potential: responseJson.potential,
        descBox: {
          msg: '',
          top: -60
        }
      });
      console.log( "state after login: ", this.state );
    })
    .catch(err => console.log('error in getting user statistics: '+err) )
  }
  handleTableCellClick( row ) {
    const msg = this.state.shortcuts[ row ].desc;
    this.setState({
      descBox: {
        msg: msg,
        top: 134 + row * 51,
      }
    })
  }
  render() {
    return(
    <div>
      <div style={{height: '50px'}}>
        <p style={{fontSize: '24px'}}>Welcome, {this.props.match.params.email}!</p>
      </div>
    <MuiThemeProvider>
      <Table
           stripedRows={true}
           onCellClick={(rn)=> this.handleTableCellClick(rn)}
           onRowHover={ (e) => {console.log('table: ', e); alert('table',e);}}
    >
          <TableHeader
            displaySelectAll={false}
          adjustForCheckbox={false}>
            <TableRow >
             <TableHeaderColumn>Command</TableHeaderColumn>
             <TableHeaderColumn>Shortcut</TableHeaderColumn>
             <TableHeaderColumn>Progress</TableHeaderColumn>
           </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            onRowHover={ (e) => {console.log('table body: ', e); alert('table body',e);}}>
            {this.state.shortcuts.map( (shortcut, index) => (
              <TableRow key={index}
                //onCellClick={()=>alert(`${shortcut.desc}`)}
                onRowHover={ (e) => {console.log('table row: ', e); alert('table row',e);}}
                >
                <TableRowColumn key={index}>{shortcut.desc}</TableRowColumn>
                <TableRowColumn>{shortcut.keys}</TableRowColumn>
                <TableRowColumn><PotentialGraph usedArr={ this.state.used[ index ] }/></TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
      </Table>
    </MuiThemeProvider>
    { this.state.descBox.msg ?
      (<div className="descBox" style={{ top: `${this.state.descBox.top}px` }}>
        { this.state.descBox.msg }
      </div>) : null
    }
  </div>)
  }
}
export default MuiDashboard;

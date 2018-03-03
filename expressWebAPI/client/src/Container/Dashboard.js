import React, { Component } from 'react';
import '../App.css';
import PotentialGraph from '../Components/PotentialGraph';

class Dashboard extends Component {
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
    return(<div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Shortcut Description</th>
            <th style={{ width: "30%" }}>Input Keys</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
        { this.state.shortcuts.map( ( item, index ) => {
            return (
              <tr>
                { item.desc.length <= 50
                  ? (<td> { item.desc } </td>)
                  : (<td className="descTooltip">
                      { item.desc.slice(0,47) + '...' }
                      <span className="descTooltipText"> { item.desc } </span>
                    </td>)
                }
                <td> { item.keys } </td>
                <td><PotentialGraph usedArr={ this.state.used[ index ] }/></td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>)
  }
}
export default Dashboard;

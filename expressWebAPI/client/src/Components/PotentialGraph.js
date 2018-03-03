import React, { Component } from 'react';
import '../App.css';

class PotentialGraph extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      numTrue: 0,
      numFalse: 0,
      trueBoxWidth: "0%",
      falseBoxWidth: "0%",
    }
  }
  componentDidMount() {
    const usedArr = this.props.usedArr;
    let numTrue = 0;
    let numFalse = 0;
    usedArr.forEach( item => {
      item ? numTrue++ : numFalse++
    });
    let trueBoxWidth = numTrue * 5;
    let falseBoxWidth = numFalse * 5;
    if( numTrue + numFalse > 20 ) {
      trueBoxWidth = trueBoxWidth / ( numTrue + numFalse ) * 20;
      falseBoxWidth = falseBoxWidth / ( numTrue + numFalse ) * 20;
    }
    this.setState({
      numTrue: numTrue,
      numFalse: numFalse,
      trueBoxWidth: `${trueBoxWidth}%`,
      falseBoxWidth: `${falseBoxWidth}%`,
    })
  }
  render() {
    const styles = {
      graphFalseBox: {
        width: this.state.falseBoxWidth,
        backgroundColor: 'red',
        height:'20px',
        float: 'left'
      },
      graphTrueBox: {
        width: this.state.trueBoxWidth,
        backgroundColor: 'green',
        height:'20px',
        float: 'left'
      },
      // graphRestBox:{
      //   backgroundColor: 'gray';
      //   width:
      // },
      // emptyGraphBox: {
      //   backgroundColor: 'gray';
      //   width: '100%'
      // }
    };

    return (
      <div align="left" style={{backgroundColor: 'gray'}}>
        <div style={styles.graphFalseBox}></div>
        <div style={styles.graphTrueBox}></div>
      </div>
    );
  }
}

export default PotentialGraph;

import React from 'react';
import Grid from 'react-grid-layout';
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
import './index.css';
class GridComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index
    };
  }
  render(){
    return (<div className="Grid">      
        
      </div>
    );
  }
}

export default GridComp;

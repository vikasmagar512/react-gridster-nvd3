import React from 'react';
import './index.css';
// import GridLayout from '../GridLayout';
import ShowCaseLayout from '../ShowCaseLayout';
const originalLayouts = getFromLS("layouts") || [];

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      // layout: [],
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);    
  }
  
  onLayoutChange(layout) {
    saveToLS("layouts", layouts);
    this.setState({ layout: layout });
  }

  stringifyLayout() {
    return this.state.layout.map(function(l) {
      return (
        <div className="layoutItem" key={l.i}>
          <b>{l.i}</b>: [{l.x}, {l.y}, {l.w}, {l.h}]
        </div>
      );
    });
  }

  render(){
    return (<div className="Tab">
          <div>
            <div className="layoutJSON">  
                Displayed as <code>[x, y, w, h]</code>:
                <div className="columns">{this.stringifyLayout()}</div>
            </div>
            <ShowCaseLayout onLayoutChange={this.onLayoutChange} />
          </div>
        {this.props.children}
      </div>
    );
  }
}

export default Tab;

function generateLayout() {
  return _.map(_.range(0, 25), function(item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05
    };
  });
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}
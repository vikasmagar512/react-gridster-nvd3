import React from 'react';
import Grid from 'react-grid-layout';
import NVD3Chart from 'react-nvd3'
 import _ from "lodash";
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
import './index.css';
class GridComp extends React.Component {
  constructor(props) {
    super(props);
    this.createElement = this.createElement.bind(this)
    const datum = [{
        key: "Cumulative Return",
        values: [
          {
            "label" : "A" ,
            "value" : -29.765957771107
          } ,
          {
            "label" : "B" ,
            "value" : 0
          } ,
          {
            "label" : "C" ,
            "value" : 32.807804682612
          } ,
          {
            "label" : "D" ,
            "value" : 196.45946739256
          } ,
          {
            "label" : "E" ,
            "value" : 0.19434030906893
          } ,
          {
            "label" : "F" ,
            "value" : -98.079782601442
          } ,
          {
            "label" : "G" ,
            "value" : -13.925743130903
          } ,
          {
            "label" : "H" ,
            "value" : -5.1387322875705
          }
        ]
      }
    ];
    this.state = {
      index: props.index,
      datum,
      chartData : {
        // margin : {
        //   top: 40,
        //   right: 20,
        //   bottom: 30,
        //   left: 55
        // },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        // valueFormat: function(d){
        //     return d3.format(',.0f')(d);
        // },
        duration: 500,
        xAxis: {
            axisLabel: 'X Axis',
            axisLabelDistance: -10
        },
        yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: -10
        }
      }
    }
  }
  
  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "9px",
      top: "2px",
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el}>
        {el.add ? (
          <span
            className="add text"
            onClick={this.props.onAddItem}
            title="You can add an item by clicking here, too."
          >
            Add +
          </span>
        ) : (
          <span className="text">{i}</span>
        )}
        <span
          className="remove"
          style={removeStyle}
          onClick={(i)=>this.props.onRemoveItem(i)}
        >
          x
        </span>
      </div>
    );
  }
  render(){
    let l = this.props.layout
    const mins = [l.minW, l.minH],
    maxes = [l.maxW, l.maxH];

    return (<div className="Grid box">      
                <div className="box-header">
                  <h3>{this.state.index}</h3>      
                  {this.createElement(l)}            
                  {/* <div className="minMax">{"min:" + mins + " - max:" + maxes}</div> */}
                </div>
                <div className="box-content">
                  {/* <NVD3Chart id="barChart" type="discreteBarChart" datum={this.state.datum} x="label" y="value" {...this.state.chartData}/>, */}
                  <NVD3Chart id="barChart" type="discreteBarChart" datum={this.state.datum} x="label" y="value"/>,
                </div>
            </div>
    );
  }
}


export default GridComp;

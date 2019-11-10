
import React from 'react';

import Grid from 'react-grid-layout';
import NVD3Chart from 'react-nvd3'
 import _ from "lodash";
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import d3 from "d3";

import './index.css';
// var d3 = require("d3");

function getDatum(j) {
  var sin = [],
      cos = [];

  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/j)});
    cos.push({x: i, y: .5 * Math.cos(i/j)});
  }

  return [
    {
      values: sin,
      key: 'Sine Wave',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    }
  ];
}
const chartData={
  'discreteBarChart':{
    type:'discreteBarChart',
    datum: [{
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
    ],
    // config:{
       // margin : {
      //   top: 40,
      //   right: 20,
      //   bottom: 30,
      //   left: 55
      // },
      x:"label",
      y:"value",
      // x: function(d){return d.label;},
      // y: function(d){return d.value;},
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
    // }
  },
  'lineChart':{
    type:'lineChart',
    datum: getDatum(10),
    // config:{
      xAxis: {
        tickFormat: function(d){ return d; },
        axisLabel: 'Period'
      },
      yAxis: {
        tickFormat: function(d) {return parseFloat(d).toFixed(2); }
      },
      xDomain: [-10, 120],
      // datum,
      x: 'label',
      y: 'value',
      duration: 1,
      margin: {
        left: 200
      },
      renderEnd: function(){
        console.log('renderEnd');
      }
    // }
  }
}

class GridComp extends React.Component {
  constructor(props) {
    super(props);
    this.createElement = this.createElement.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.openDialogue = this.openDialogue.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleChange = this.handleChange.bind(this)
    
    this.state = {
      index: props.index,
      gridHeader:'', 
      value:'', 
      modalShow:false,   
      chart:'lineChart'  
    }
  }
  
  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "9px",
      top: "2px",
      cursor: "pointer"
    };
    const settingsStyle = {
      position: "absolute",
      right: "30px",
      top: "4px",
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
          style={settingsStyle}
          onClick={()=>this.handleOpen()}
        >
          i
        </span>
        <span
          className="remove"
          style={removeStyle}
          onClick={()=>this.props.onRemoveItem(i)}
        >
          x
        </span>
      </div>
    );
  }
  handleClose(){
    this.setState({modalShow:false})
  }
  
  handleOpen(){
    this.setState({modalShow:true})
  } 
  handleChange(e){
    
    this.setState({[e.target.name]:e.target.value},()=>{
      // var svg = d3.select("svg");
      // svg.selectAll("*").remove();
      let k = document.getElementsByClassName('nv-chart') 
      for (var i = 0; i <k.length; i++){
        k[i].parentNode.removeChild(k[i])
      }
    })
  }
  // handleChange(event) {
  //   event.preventDefault()
  //   event.stopPropagation()
  //   this.setState({value: event.target.value});
  // }

  openDialogue(){
    const {gridHeader, chart} = this.state
    return (
      <Modal show={this.state.modalShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Name</Form.Label>
                  {/* <Form.Control 
                    type="text" 
                    name="gridHeader" 
                    value={gridHeader} 
                    onChange={this.handleChange} placeholder="Enter name" /> */}
                     <input type="text" value={this.state.value} onInput={this.handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select" name="chart" value = {chart} onChange={this.handleChange} >
                    {['lineChart','cumulativeLineChart','discreteBarChart','stackedAreaChart','pieChart','boxPlotChart'].map((option,i)=>(
                       <option key={i}>{option}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
  render(){
    let l = this.props.layout
    const mins = [l.minW, l.minH],
    maxes = [l.maxW, l.maxH];

    return (<React.Fragment>
      <div className="Grid box">      
        <div className="box-header">
          <h3>{l.i}</h3>      
          {this.createElement(l)}            
          {/* <div className="minMax">{"min:" + mins + " - max:" + maxes}</div> */}
        </div>
        <div className="box-content">
          {/* <NVD3Chart id="barChart" type="discreteBarChart" datum={this.state.datum} x="label" y="value" {...this.state.chartData}/>, */}
          {this.state.chart !==''
           ?
            <NVD3Chart id="lineChart" {...chartData[this.state.chart]}/>
            : 
            null
          }
        </div>
      </div>
      {this.openDialogue()}
    </React.Fragment>);
  }
}


export default GridComp;

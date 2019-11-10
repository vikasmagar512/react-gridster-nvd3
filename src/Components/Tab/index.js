import React from 'react';
import './index.css';
// import GridLayout from '../GridLayout';
import ShowCaseLayout from '../ShowCaseLayout';

import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import _ from "lodash";

const originalLayouts = getFromLS("layout") || [];

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      newCounter: originalLayouts.length,
      // layout: [],
      layout: originalLayouts,
      modalShow:true
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);    
    this.generateNewLayout = this.generateNewLayout.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
  }
  
  handleClose(){
    this.setState({modalShow:false})
  }

  openDialogue(){
    return (
      <Modal show={this.state.modalShow} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* <Container>
              <Row>
                <Col md={4}>

                </Col>
                <Col md={{ span: 4, offset: 4 }}>{`md={{ span: 4, offset: 4 }}`}</Col>
              </Row>
            </Container> */}
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                 
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Form.Row>             
            </Form>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    )
  }
  
  onLayoutChange(layout,layouts) {
    saveToLS("layout", layouts.lg);
    this.setState({ layout:layouts.lg });
  }
  generateNewLayout() {
    let layout = generateLayout()
    saveToLS("layout", layout);
    this.setState({ layout, newCounter : layout.length });
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
  
  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    let layout = [...this.state.layout,{
        i: this.state.newCounter.toString(),
        x: (this.state.layout.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 4,
        h: 6,
        minW : 4,
        minH : 6,
        maxW : 6,
        maxH : 6,
        // static: Math.random() < 0.05,
        // add:true
    }]
    this.setState({
      // Add a new item. It must have a unique key!
      layout,
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
    saveToLS("layout", layout);
  }
  
  onRemoveItem(i) {
    console.log("removing", i);
    let index = this.state.layout.findIndex(k=>k.i === i)
    let layout = [...this.state.layout.slice(0,index),...this.state.layout.slice(index+1)]
    debugger
    saveToLS("layout", layout);
    this.setState({ layout, newCounter: layout.length });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  render(){
    return (
      <React.Fragment>
        <div className="Tab">
            <div>
              <div className="layoutJSON">  
                  Displayed as <code>[x, y, w, h]</code>:
                  <div className="columns">{this.stringifyLayout()}</div>
              </div>
              <ShowCaseLayout layout={this.state.layout} 
                onLayoutChange={this.onLayoutChange} 
                generateNewLayout = {this.generateNewLayout}
                onAddItem = {this.onAddItem}
                onRemoveItem = {this.onRemoveItem}
              />
            </div>
          {this.props.children}
          {/* {this.openDialogue()} */}

        </div>
      </React.Fragment>
    );
  }
}

export default Tab;

export function generateLayout() {
  return _.range(0, 4).map((i, key,list)=>{
    var y = Math.ceil(Math.random() * 4) + 1; 
    let minW = _.random(1, 6),
      minH = _.random(1, 6);
    let maxW = _.random(minW, 6),
      maxH = _.random(minH, 6);

      minW = 4
      minH = 6
      maxW = 6
      maxH = 6
    
    return {
      x: (_.random(0, 5) * 2) % 12,
      y: Math.floor(i / 6) * y,
      w: 4,
      h: 6,
      i: i.toString(),
      minW,
      maxW,
      minH,
      maxH,
      // static: Math.random() < 0.05,
      // add:true
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
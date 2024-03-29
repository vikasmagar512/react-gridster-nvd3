import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import './index.css';
import GridComp from '../GridComp';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class ShowcaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBreakpoint: "lg",
      compactType: "vertical",
      mounted: false,
      layouts: { lg: props.layout }
    };

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onCompactTypeChange = this.onCompactTypeChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }
  componentWillReceiveProps(newProps,nextState){
    debugger
    if(newProps.layout){
      if(JSON.stringify(newProps.layout) !== JSON.stringify(this.props.layout)){
        this.setState({layouts: { lg: newProps.layout }})
      }
    }
  }

  generateDOM() {
    let k = this
    return _.map(this.state.layouts.lg, function(l, index) {
      return (
        <div key={index} className={l.static ? "static" : ""}>
            <GridComp 
              layout={l}
              onAddItem = {k.onAddItem}
              onRemoveItem = {k.onRemoveItem}
            ></GridComp>
        </div>
      );
    });
  }
  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint
    });
  }

  onCompactTypeChange() {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
          ? null
          : "horizontal";
    this.setState({ compactType });
  }

  onLayoutChange(layout, layouts) {
    this.props.onLayoutChange(layout, layouts);
  }
  
  onNewLayout() {
    this.props.generateNewLayout()
  }
  
  onAddItem(){
    this.props.onAddItem()
  }
  
  onRemoveItem(i){
    this.props.onRemoveItem(i)
  }
  render() {
    return (
      <div>
        <div>
          Current Breakpoint: {this.state.currentBreakpoint} ({
            this.props.cols[this.state.currentBreakpoint]
          }{" "}
          columns)
        </div>
        <div>
          Compaction type:{" "}
          {_.capitalize(this.state.compactType) || "No Compaction"}
        </div>
        <button onClick={this.onNewLayout}>Generate New Layout</button>
        <button onClick={this.onCompactTypeChange}>
          Change Compaction Type
        </button>
        <button onClick={this.onAddItem}>Add Item</button>
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

ShowcaseLayout.propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
  generateNewLayout: PropTypes.func.isRequired,
};

ShowcaseLayout.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function() {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
//   initialLayout: generateLayout()
  initialLayout: []
};

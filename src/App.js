import React from 'react';
import './App.css';
import {Tabs, PanelList, Panel,DragTabList, DragTab,  ExtraButton} from 'react-tabtab';
import simpleSwitch from './move';
import { FaPlus } from 'react-icons/fa';
import {arrayMove} from 'react-sortable-hoc';
import Tab from "./Components/Tab";
import * as customStyle from 'react-tabtab/lib/themes/bootstrap';
 
class App extends React.Component {
  constructor(props) {
    super(props);
    const tabs = this.makeData(3, 'Tab');

    this.state = {
      tabs,
      activeIndex: 0,
      numberOfTabs: tabs.length,
      showExtra: true,
      showModal: true,
      showArrow: true
    };
  }
  makeData = (number, titlePrefix = 'Tab') => {
    const data = [];
    for (let i = 0; i < number; i++) {
      data.push({
        title: `${titlePrefix} ${i}`,
        content:               
          <Tab index={i}>
            <p>Content {i}: Accusamus enim nisi itaque voluptas nesciunt repudiandae velit. <br/>
            Ad molestiae magni quidem saepe et quia voluptatibus minima. <br/>
            Omnis autem distinctio tempore. Qui omnis eum illum adipisci ab. <br/>
            </p>
          </Tab>
      });
    }
    return data;
  }
  handleExtraButton = () => {
    const {tabs} = this.state;
    const newTabs = [...tabs, {title: 'New Draggable Tab', content: 'New Content'}];
    this.setState({tabs: newTabs, activeIndex: newTabs.length - 1});
  }

  handleTabChange = index => {
    this.setState({activeIndex: index});
  }

  handleTabSequenceChange = ({oldIndex, newIndex}) => {
    const {tabs} = this.state;
    const updateTabs = arrayMove(tabs, oldIndex, newIndex);
    this.setState({tabs:updateTabs, activeIndex: newIndex});
  }

  handleEdit = ({type, index}) => {
    this.setState((state) => {
      let {tabs, activeIndex} = state;
      if (type === 'delete') {
        tabs = [...tabs.slice(0, index), ...tabs.slice(index + 1)];
      }
      if (index - 1 >= 0) {
        activeIndex = index - 1;
      } else {
        activeIndex = 0;
      }
      return {tabs, activeIndex};
    });
  }
  // componentDidUpdate() {
  //   [...document.getElementsByClassName('react-contextmenu-wrapper')].forEach((element) => {
  //     element.nextElementSibling.onmousedown = (e) => e.stopPropagation()
  //   })
  // }
  handleChangeTabsNumber = e => {
    let number = e.target.value;
    if (number <= 0 || !number) {
      number = 1;
    }
    if (number > 3000) {
      number = 3000;
    }
    const tabs = this.makeData(number, 'Tab');
    this.setState({tabs, activeIndex: 0, numberOfTabs: number});
  }

  handleToggleExtra = e => {
    const showExtra = e.target.checked;
    this.setState({showExtra});
  }

  handleToggleModal = e => {
    const showModal = e.target.checked;
    this.setState({showModal});
  }

  handleToggleArrow = e => {
    const showArrow = e.target.checked;
    this.setState({showArrow});
  }
  render(){
    const {tabs, activeIndex, numberOfTabs, showArrow, showModal, showExtra} = this.state;
    const tabTemplate = [];
    const panelTemplate = [];
    tabs.forEach((tab, i) => {
      const closable = tabs.length > 1;
      tabTemplate.push(<DragTab key={i} closable={closable}>{tab.title}</DragTab>);
      panelTemplate.push(<Panel key={i}>{tab.content}</Panel>);
    })
  return (
    <div className="App container">
    {/* <Tabs>
        <TabList>
          <Tab>Tab1</Tab>
          <Tab>Tab2</Tab>
        </TabList>
        <PanelList>
          <Panel>Content1</Panel>
          <Panel>Content2</Panel>
        </PanelList>
      </Tabs> */}
      <div>
        <Tabs onTabEdit={this.handleEdit}
              onTabChange={this.handleTabChange}
              activeIndex={activeIndex}
              customStyle={customStyle}
              onTabSequenceChange={this.handleTabSequenceChange}
              showModalButton={showModal}
              showArrowButton={showArrow}
              ExtraButton={showExtra &&
                <ExtraButton onClick={this.handleExtraButton}>
                  <FaPlus/>
                </ExtraButton>
              }>
          <DragTabList>
            {tabTemplate}
          </DragTabList>
          <PanelList>
            {panelTemplate}
          </PanelList>
        </Tabs>
        <form className="pa4">
          <fieldset id="favorite_movies" className="bn">
            <div className="flex items-center mb2">
              <label className="lh-copy">Number of tabs:</label>
              <input className="input-reset ba b--black-20 pa1 mb2 db ml2" type="number"
                     onChange={this.handleChangeTabsNumber}
                     value={numberOfTabs}/>
            </div>
            <div className="flex items-center mb2">
              <input className="mr2" type="checkbox" value="extra" checked={showExtra} onChange={this.handleToggleExtra}/>
              <label htmlFor="extra" className="lh-copy">Show Extra Button</label>
            </div>
            <div className="flex items-center mb2">
              <input className="mr2" type="checkbox" value="modal" checked={showModal} onChange={this.handleToggleModal}/>
              <label htmlFor="modal" className="lh-copy">Show Modal Button</label>
            </div>
            <div className="flex items-center mb2">
              <input className="mr2" type="checkbox" value="arrow" checked={showArrow} onChange={this.handleToggleArrow}/>
              <label htmlFor="arrow" className="lh-copy">Show Arrow Button</label>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
}

export default App;

import React from 'lib-app/react';
import Button from 'component-app/Button';
import Dialog from 'component-app/Dialog';
import ToolTip from 'component-app/ToolTip';
import MainAppButton from './MainAppButton.jsx';
import { Route, Link, Switch } from 'react-router-dom';
import ExtraComponentOne from './ExtraComponentOne.jsx';
import BasicTable from './Table.jsx';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      tableComponentVisible: false,
      otherComponentVisible: false,
    };
    this.handleClickOther = this.handleClickOther.bind(this);
    this.handleClickTable = this.handleClickTable.bind(this);
  }

  handleClickOther(ev) {
    console.log(ev);
    this.setState({
      otherComponentVisible: !this.state.otherComponentVisible,
    });
  }

  handleClickTable(ev) {
    console.log(ev);
    this.setState({
      tableComponentVisible: !this.state.tableComponentVisible,
    });
  }

  render() {
    return (
      <div>
        <h1>Open Dev Tool And Focus On Network,checkout resources details</h1>
        <hr />
        <h2>Main application</h2>
        -------
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/module-app">Module</Link>
            </li>
            <li>
              <Link to="/part-of-main">Other page of main app</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <div>main home app</div>
            </Route>
            <Route path="/module-app">
              <p>
                components hosted on <strong>component-app</strong>
              </p>
              <h4>Buttons:</h4>
              <Button type="primary" />
              <Button type="warning" />
              <h4>Dialog:</h4>
              <button onClick={this.handleClick}>
                click me to open Dialog
              </button>
              <Dialog
                switchVisible={this.handleSwitchVisible}
                visible={this.state.dialogVisible}
              />
              <h4>hover me please!</h4>
              <ToolTip content="hover me please" message="Hello,world!" />
            </Route>

            <Route path="/part-of-main">
              <MainAppButton buttonClick={this.handleClickOther} type="warning">
                Show Other Component
              </MainAppButton>
              {this.state.otherComponentVisible && <ExtraComponentOne />}

              <MainAppButton buttonClick={this.handleClickTable}>
                Show Table
              </MainAppButton>
              {this.state.tableComponentVisible && <BasicTable />}
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

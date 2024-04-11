import React, { Suspense } from 'react';
import MainAppButton from './MainAppButton.jsx';
import { Route, Link, Switch } from 'react-router-dom';
import { AsyncComponentLoader } from './components/AsyncComponentLoader.jsx';
import { importRemote } from '@module-federation/utilities';

function asyncComponent(loader) {
  return () => <AsyncComponentLoader moduleProvider={loader} />;
}

const AsyncComp = asyncComponent(
  async () => (await import('./components')).AsyncComponent
);

const AsyncComponentApp = React.lazy(async () =>
  importRemote({
    url: 'http://localhost:3001',
    scope: 'component_app',
    module: 'CompApp',
  })
);

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
              {/* <ComponentApp /> */}
              <Suspense fallback={<div>Loading Module...</div>}>
                <AsyncComponentApp />
              </Suspense>
            </Route>

            <Route path="/part-of-main">
              <MainAppButton buttonClick={this.handleClickTable}>
                Show Async Table
              </MainAppButton>
              {this.state.tableComponentVisible && <AsyncComp />}
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

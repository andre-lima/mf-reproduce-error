import React from 'react';
import BasicTable from '../Table';

export default class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BasicTable />
      </div>
    );
  }
}

import React from "react";
import withAuth from '../helpers/withAuth';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Dashboard Page</h1>
        <p>You can't go into this page if you are not authenticated.</p>
      </div>
    );
  }
}
export default withAuth(Dashboard);

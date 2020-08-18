import React, { Component } from "react";
import { auth, firebase } from "../lib/firebase";
import { withRouter } from "next/router";

class About extends Component {
  componentDidMount() {
    this.props.router.push("/");
    if (auth.isSignInWithEmailLink(this.props.router.asPath)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      auth
        .signInWithEmailLink(email, this.props.router.asPath)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          this.props.router.push("/");
          console.log(result);
        })
        .catch(function (error) {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }
  render() {
    return <h1>About</h1>;
  }
}
export default withRouter(About);

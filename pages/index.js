import React from "react";
import Link from "next/link";
import { auth, firebase } from "../lib/firebase";
import { withRouter } from "next/router";
class Home extends React.Component {
  handleSignInViaLink() {
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url: "http://localhost:3000/about",
      handleCodeInApp: true,
    };
    let email = "yannick@octan.group";
    auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function (response) {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        console.log(response);
      })
      .catch(function (error) {
        // Some error occurred, you can inspect the code: error.code
        console.log(error);
      });
  }
  handleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    auth
      .signInWithPopup(provider)
      .then(() => {
        alert("You are signed In");
      })
      .catch((err) => {
        alert("OOps something went wrong check your console");
        console.log(err);
      });
  };
  handleLogout = () => {
    auth
      .signOut()
      .then(function () {
        alert("Logout successful");
      })
      .catch(function (error) {
        alert("OOps something went wrong check your console");
        console.log(err);
      });
  };
  // componentDidMount(){
  //   this.props.router.push("/about");
  // }
  // openAbout = () => {
  //   // const router = useRouter();
  //   this.props.router.push("/about");
  // };
  render() {
    return (
      <div>
        <div className="hero">
          <h1 className="title">
            Welcome to Firebase Authentication in Next.js!
          </h1>
          <p className="description">
            Click on the Dashboard link to visit the dashboard page.
          </p>
          <div className="row">
            <Link href="/dashboard">
              <a className="card">
                <h3>Go to Dashboard&rarr;</h3>
                <p>Visit Dashboard</p>
              </a>
            </Link>
            <button
              onClick={this.openAbout}
              className="rounded border border-solid px-8 shadow capitalize mx-2"
            >
              about us
            </button>
            <button
              onClick={this.handleSignInViaLink}
              className="rounded border border-solid px-8 shadow capitalize mx-2"
            >
              Sign In using Link
            </button>
            <button
              onClick={this.handleSignIn}
              className="rounded border border-solid px-8 shadow capitalize mx-2"
            >
              Sign In using google
            </button>
            <button
              onClick={this.handleLogout}
              className="rounded border border-solid px-8 shadow capitalize mx-2"
            >
              Logout
            </button>
          </div>
        </div>
        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 70%;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    );
  }
}
export default withRouter(Home);

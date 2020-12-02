import React, { Component } from 'react';
import { MDBContainer, MDBAlert, MDBFooter, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { ApiCall } from "./lib/api-call";
import { Link } from "react-router-dom";


class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      color: 'd-none'
    };
  }

  onClose(event) {
    console.log(event);
    console.log(this);
  };

  onClosed(event) {
    console.log('closed: ', event);
  }

  onSubmit(event) {
    event.preventDefault();
    event.target.className += " was-validated";

    if (!event.target.checkValidity()) {
      return;
    }

    ApiCall.post('/api/authenticate', this.state).then((res) => {
      console.log('success: ', res);
      location.href = '#/home';
    }).catch((e) => {
      console.log('error: ', e);
      this.setState({color: ''});
    });
  }

  onFormChanges(newState) {
    this.setState(newState);
  }

  render() {
    return (

      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <form
              style={{width: "50%", position: "absolute", top: '50%', left: '50%', transform: 'translate(-50%, 50%)'}}
              onSubmit={(e) => this.onSubmit(e)}
              className="needs-validation"
              noValidate
            >
              <MDBAlert className={this.state.color} color='danger' dismiss={true} onClose={this.onClose.bind(this)} onClosed={this.onClosed.bind(this)}>
                User name or password incorrect!
              </MDBAlert>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <MDBInput
                  label="Type your email"
                  icon="envelope"
                  group
                  type="email"
                  name="email"
                  validate
                  error="wrong"
                  success="right"
                  value={this.state.email}
                  onChange={(e) => this.onFormChanges({email: e.target.value})}
                  required
                />
                <MDBInput
                  label="Type your password"
                  icon="lock"
                  group
                  type="password"
                  name="password"
                  validate
                  value={this.state.password}
                  onChange={(e) => this.onFormChanges({password: e.target.value})}
                  required
                />
              </div>
              <div className="text-center">
                <MDBBtn type="submit">Login</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default LoginPage;

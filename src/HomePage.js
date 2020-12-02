import React, { Component } from 'react';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          users: data
        });
      });
  }

  render() {
    return (
      <div>
        <ul className="users">
          {this.state.users.map((user) => (
            <li className="user">
              <p><strong>Name:</strong> {user.name}</p>

              <p><strong>Email:</strong> {user.email}</p>

              <p><strong>City:</strong> {user.address.city}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;

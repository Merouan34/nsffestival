import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

class UserControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username') || 'Utilisateur'
    };
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    this.props.navigate('/login');
  };

  render() {
    return (
      <div>
        <h1>Bienvenue, {this.state.username} !</h1>
        <button onClick={this.handleLogout}>Se déconnecter</button>
        {/* Le reste de votre composant UserControl */}
      </div>
    );
  }
}

const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

export default withNavigation(UserControl);
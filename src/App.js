import React from 'react';
import axios from 'axios';
import './App.css';

/*
 * Todos
 * 1) Error handling
 * 2) Converting to functional components
 * 3) Logic seperation
 * 4) 
 **/

class Form extends React.Component {
  
  //userNameInput = React.createRef();

  state = { userName: '' };

  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' });
  }

  // focusTextInput () {
  //   this.userName.current.focus();
  // }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          placeholder="Github username" 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          //ref={this.userNameInput}
          //onClick={this.focusTextInput} 
          required
        />
        <button>Add Card</button>
      </form>
    );
  }
}

const CardList = (props) => (
  <div>
    {props.profiles.map(user => <Card key={user.id} {...user}/>)}
  </div>
)

class Card extends React.Component {
  render () {
    const profile = this.props;
    return (
      <div className = "github-profile" style={{ margin: '1rem' }}>
        <img src={profile.avatar_url} alt="" />
        <div className = "info" style={{ display: 'inline-block', marginLeft: 10 }}>
          <div className = "name" style={{ fontSize: '125%' }}>{profile.name}</div>
          <div className = "company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  }

  addNewProfile = ({ id, avatar_url, name, company }) => {
    this.setState(prevState => 
      ({ profiles: [...prevState.profiles, { id, avatar_url, name, company }] }))
  }

  render() {
    return (
      <div>
        <div className="App">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profiles = {this.state.profiles} />
      </div>
    );
  }

} 

export default App;

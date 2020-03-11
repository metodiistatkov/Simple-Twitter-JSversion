import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Feed from './Feed'
import Status from './Status'
import Title from './Title'
import UsersPanel from './UsersPanel'
import Following from './Following'
import Followers from './Followers'
import AddUser from './AddUser'



class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser : 'Metodi',
      following : []
    };

    this.getNamesFollowing = this.getNamesFollowing.bind(this);
  }

  componentDidMount(){
    this.intervalID = setInterval(
      () => this.updateFollowing(),
      1000
    );
  }

  componentWillUnmount(){
    clearInterval(this.intervalID);
  }

  updateFollowing(){
     fetch("https://mysotontwitter.azurewebsites.net/api/GetFollowing?code=aDVYp4XdASlT2YlHOr4kQcpWPjSBV3UAqHiucrr9wQr1LSkY6mDdsg==",
    {method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'currentUser' : this.state.currentUser
    }
    })
  // We get the API response and receive data in JSON format...
  .then(response => response.json()) 
  .then(data => {
    this.setState({
      following: this.getNamesFollowing(data.result)
    })
  })
  .catch(error => this.setState({following: error}));
  }

  getNamesFollowing(following){
    let namesOfFollowing = []
    for(let i=0; i<following.length; i++){
      namesOfFollowing[i] = following[i].RowKey._;
    }
    return namesOfFollowing
  }


  render(){
    return (
      <div>
        <div className="current-user">
          <h4 style={{ color: 'black' }}>Current User: {this.state.currentUser}</h4>
        </div>
        <Title/>
        <Status currentUser={this.state.currentUser}/>
        <div className = "cards-for-feed">
          <div className = "feed-title">
            <h2>Feed</h2>
          </div>
          <Feed following={this.state.following} currentUser={this.state.currentUser}/>
        </div>
        <div className="cards-for-userPanel">
          <UsersPanel currentUser={this.state.currentUser} following={this.state.following}/>
        </div>
        <AddUser currentUser={this.state.currentUser}/>
        <div className="following-cards">
          <h3 style={{ color: 'white' }}>Following</h3>
          <Following following={this.state.following}/>
        </div>
        <div className="follower-cards">
          <h3 style={{ color: 'white' }}>Followers</h3>
          <Followers currentUser={this.state.currentUser}/>
        </div>
      </div>
    );
  }
}

export default App;

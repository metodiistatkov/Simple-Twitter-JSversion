import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import FollowBtn from './FollowBtn';
import Avatar from '@material-ui/core/Avatar'

class UsersPanel extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            users: []
        };

        this.updateUsers = this.updateUsers.bind(this);
    }

    componentDidMount(){
        this.intervalID = setInterval(
          () => this.updateUsers(),
          2000
        );
      }
    
      componentWillUnmount(){
        clearInterval(this.intervalID);
      }
    
      updateUsers(){
         fetch("https://mysotontwitter.azurewebsites.net/api/GetUsers?code=7p/WSxmSum4jIkrcUN3KlDtXtlAsz6rYHdDG77MDyWiuLxqk8Vz3xQ==",
        {method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'name': 'getUsers'
        }
        })
      // We get the API response and receive data in JSON format...
      .then(response => response.json()) 
      .then(data => {
        this.setState({
          users: data.result
        })
      })
      .catch(error => this.setState({users: error}));
      }
      
    renderUsers(){
        return (
                this.state.users.map((user) => (
                    <Card border="primary" key={user.Timestamp._}>
                    <Card.Header>
                        <FollowBtn currentUser={this.props.currentUser} userToFollow={user.PartitionKey._} following={this.props.following}/>
                    </Card.Header>
                    <Card.Body>
                        <Avatar>{user.PartitionKey._.charAt(0)}</Avatar>
                        {user.PartitionKey._}
                    </Card.Body>
                </Card>
                ))
        );
    }

    render(){
        const {users} = this.state;
        return users.length ? this.renderUsers() : (<span>Loading users that you can follow...</span>)
    }
}

export default UsersPanel


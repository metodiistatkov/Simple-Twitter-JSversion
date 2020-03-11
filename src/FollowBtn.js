import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

class FollowBtn extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        follow: this.props.following.includes(this.props.userToFollow)
      };
      this.handleClick = this.handleClick.bind(this);
      this.followUser = this.followUser.bind(this);
      this.unfollowUser = this.unfollowUser.bind(this);
    }
    
    followUser(){
        fetch("https://mysotontwitter.azurewebsites.net/api/follow?code=mz6J5y0nX/pIkqyqo67azAUagXSRHFh9P2SEG2agyj14IjeIU3qKMQ==",
            {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'user': this.props.currentUser, 'userToFollow' : this.props.userToFollow})
            })
        // We get the API response and receive data in JSON format...
        .then(response => response.text()) 
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }

    unfollowUser(){
        fetch("https://mysotontwitter.azurewebsites.net/api/unfollow?code=OWpHK8kQ7M9S08lnc1GVXrYI0SYMhVvR2aw1DFqJJBKX0hUZ/xfB1Q==",
            {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'user': this.props.currentUser, 'userToFollow' : this.props.userToFollow})
            })
        // We get the API response and receive data in JSON format...
        .then(response => response.text()) 
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
    
    handleClick() {
        if(this.state.follow === false){
            this.followUser();
        } else {
            this.unfollowUser();
        }

        this.setState(previousState => {
        return {
          follow: !previousState.follow
        };
      });
    }
  
    render() {
      const following = (
        <Button variant="primary">Follow</Button>
      )
  
      const unfollow = (
        <Button variant="outline-primary">Unfollow</Button>
      )
  
      return (
        <div onClick={this.handleClick.bind(this)}>
          {this.state.follow ? unfollow : following}
        </div>
      )
    }
}

export default FollowBtn
import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar'

class Followers extends React.Component{
    constructor(props){
        super(props);
  
        this.updateFollowers = this.updateFollowers.bind(this);
        this.renderFollowers = this.renderFollowers.bind(this);
  
        this.state = {
          followers : []
        };
      } 
    
      componentDidMount(){
        this.intervalID = setInterval(
          () => this.updateFollowers(),
          1000
        );
      }
    
      componentWillUnmount(){
        clearInterval(this.intervalID);
      }
    
      updateFollowers(){
         fetch("https://mysotontwitter.azurewebsites.net/api/GetFollowers?code=hCXHIPFscgIXUOxfjNP5Fms2q6PGswbnaVnRK2Qzb4/rlMx4XTASRg==",
        {method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'currentUser' : this.props.currentUser
        }
        })
      // We get the API response and receive data in JSON format...
      .then(response => response.json()) 
      .then(data => {
        this.setState({
          followers: data.result
        })
      })
      .catch(error => this.setState({followers: error}));
      }
      
      renderFollowers(){
        return( 
            this.state.followers.map((follower) =>(
                <Card border="primary" key={follower.Timestamp._}>
                    <Avatar>{follower.PartitionKey._.charAt(0)}</Avatar>
                    {follower.PartitionKey._}
                </Card>
                ))
        );
      }

      render(){
        const{followers} = this.state;
        return followers.length ? this.renderFollowers() : (<span>Loading users that you follow...</span>)
        }
}

export default Followers
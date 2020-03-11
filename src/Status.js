import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

class Status extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        textStatus: ""
      };
  
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleClick(e) {
      let text = this.state.textStatus;
      this.setState({
        textStatus: ""
      });
      return fetch('https://mysotontwitter.azurewebsites.net/api/LocalTest?code=Zoi4TLndrUy3ZRGNexyFhfmZ6j/haBazki6qf2bkSm5eL4aFBVM2SQ==',
        {method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': 'postTweets', 'user' : this.props.currentUser, 'tweetText' : text})
        })
      // We get the API response and receive data in JSON format...
      .then(response => response.text())
      .then(data => console.log(data))
      .catch();
    }
  
    handleChange(e){
      this.setState({textStatus: e.currentTarget.value});
    }
  
    render(){
      return(
        <div>
          <div>
              <label>
                <textarea className = "status-update" name="name" value={this.state.textStatus} onChange = {(e) => this.handleChange(e)} placeholder = "Type your status update here"/>
              </label>
          </div>
          <div className = "publish-button" onClick = {(e) => this.handleClick(e)}>
            <Button variant="primary" type="submit">Publish</Button>
          </div>  
        </div>
      );
    }
  }

  export default Status
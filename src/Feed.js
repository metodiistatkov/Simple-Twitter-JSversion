import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import Markdown from 'markdown-to-jsx';

class Feed extends React.Component{
    constructor(props){
      super(props);

      this.updateFeed = this.updateFeed.bind(this);
      this.renderItems = this.renderItems.bind(this);

      this.state = {
        items : []
      };
    } 
  
    componentDidMount(){
      this.intervalID = setInterval(
        () => this.updateFeed(),
        1000
      );
    }
  
    componentWillUnmount(){
      clearInterval(this.intervalID);
    }
  
    updateFeed(){
       fetch("https://mysotontwitter.azurewebsites.net/api/GetTweets?code=nZER9yTbG4BAWJXydq5a0hU4XhVB6h6ejWsneCrrO/bYCPHn7DbqvQ==",
      {method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'currentUser' : this.props.currentUser,
        'following' : JSON.stringify(this.props.following)
      }
      })
    // We get the API response and receive data in JSON format...
    .then(response => response.json()) 
    .then(data => {
      this.setState({
        items: data.result
      })
    })
    .catch(error => this.setState({items: error}));
    }
    
    renderItems(){
      return(
        this.state.items.map((item) =>(
         <Card border="primary" key={item.Timestamp._}>
           <Card.Header>
             <Avatar>{item.PartitionKey._.charAt(0)}</Avatar>
           {item.PartitionKey._}
           </Card.Header>
           <Card.Body>
           <Markdown>{item.Text._}</Markdown>
           </Card.Body>
         </Card>
         ))
       );
    }

    render(){
      const {items} = this.state;
      return items.length ? this.renderItems() : (<span>Loading tweets...</span>)
    }
}
  
  export default Feed;
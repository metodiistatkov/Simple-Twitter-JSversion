import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from 'react-bootstrap';

class AddUser extends React.Component{
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
      return fetch('https://mysotontwitter.azurewebsites.net/api/AddUser?code=WsVwyTbA3PWFD7l/RlacEMYlG6traFilCpIKHcKZihxZ7L5EbKaZ3g==',
        {method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'user' : text})
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
        <div className="add-new-user" onClick = {(e) => this.handleClick(e)}>
          <Form>
            <Form.Label><h2 style={{ color: 'white' }}>Add New User</h2></Form.Label>
            <Form.Control type="text" placeholder="Enter user" value={this.state.textStatus} onChange = {(e) => this.handleChange(e)}></Form.Control>
            <Button variant="primary" type="submit">Add User </Button>
          </Form>
        </div>
      );
    }
  }

  export default AddUser
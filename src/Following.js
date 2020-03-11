import * as React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar'

class Following extends React.Component{
    
    renderFollowing(){
        return(
            this.props.following.map((user) =>(
           <Card border="primary" key={user}>
               <Avatar>{user.charAt(0)}</Avatar>
                {user}
           </Card>
           ))
        );
    }

    render(){
        return this.props.following.length ? this.renderFollowing() : (<span>Loading users that you follow...</span>)
    }
}

export default Following
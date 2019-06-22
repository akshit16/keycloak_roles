import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';
import { Route, Link, BrowserRouter,Redirect,withRouter  } from 'react-router-dom'
class userHome extends Component
{

    state={
        session:'',
        
    }
    componentDidMount() {
        this.callBackendAPI()
        .then(res => this.setState({ session: res.express.type }),function(){
            console.log(this.state.session)
        })
        .catch(err => console.log(err));
        console.log(this.state.session)
      }
    callBackendAPI = async () => {
        const response = await fetch('/api/user/data');
        const body = await response.json();
      console.log(body)
        if (response.status !== 200) {
          throw Error(body.message) 
        }
        return body;
      }

    render(){
       
        return(
            <div>
            {this.state.session=='user'&&
            <div>
                <h1 className="ui block header" style={{color:"white",backgroundColor:"black"}}>Welcome</h1>
            </div>

        }
        </div>
        );

        
    }

    

}
export default withRouter(userHome)
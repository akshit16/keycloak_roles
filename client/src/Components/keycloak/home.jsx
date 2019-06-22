import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';
import Sidebar from '../sidebar/sidebar.jsx'
import Quiz from './addQuiz.jsx'
import Category from './addCategory.jsx'
import Download from './addDownload.jsx'
class home extends Component{

    state={
        session:'',
        add:false,
        edit:false,
        category:false,
        download:true
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

      addQuiz=()=>
    {
        this.setState({add:true,edit:false,category:false,download:false})
        console.log(this.state.add)
    }
    addCateogry=()=>
    {
        this.setState({add:false,edit:false,category:true,download:false})
        //console.log(this.state.add)
    }
    addDownload=()=>
    {
        this.setState({add:false,edit:false,category:false,download:true})
        //console.log(this.state.add)
    }
    render(){
        return(
            <div>
            {this.state.session=='Admin'&&
            <div>
         <h1 className="ui block header" style={{color:"white",backgroundColor:"#1b1c1d"}}>
         Welcome Admin {this.state.session.fullname}</h1>
        <Grid>
        <Grid.Column width={4}>         
        <Sidebar add={this.addQuiz} category={this.addCateogry} download={this.addDownload}/>
        </Grid.Column>
        <Grid.Column width={9}>
         {this.state.add&&
            <Quiz/>
         }
         {
             this.state.category&&
             <Category/>
         }
         {
             this.state.download&&
             <Download/>
         }
         </Grid.Column>
         </Grid>
            </div>
            }
            {
                this.state.session!=='Admin'&&
                <p>nhi hua</p>
            }
            </div>
        )
    }
}

export default home
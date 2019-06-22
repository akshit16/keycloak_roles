import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';
import adminHome from './home.jsx'
import { Route, Link, BrowserRouter,Redirect,withRouter  } from 'react-router-dom'
class loginAdmin extends Component
{
    state={
      name:'',
      password:'',
      authenticated:''
      }
    componentDidMount() {
   
    }
  onName=(e)=>
  {
    this.setState({name:e.target.value})
    console.log(this.state.name)
  }
  onPassword=(e)=>
  {
    this.setState({password:e.target.value})
  }
  onSubmit=(e)=> {
    e.preventDefault()
    var that=this
    console.log(this.state.name)
    //e.preventDefault();
    const data = {
         username: this.state.name,
         password: this.state.password
       
    }
  console.log(data)
      axios.post('/api/user/userLogin', data, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function (res){
      console.log(res.data)
      that.setState({authenticated:res.data.express.type})
    //this.history.push('/adminHome');
//console.log(this.state.session)
    })
    .catch(err=>{
      console.log(err+"abc")
    });
    
    this.setState({
        name: '',
        password: ''
    });
  

}

// changePage=()=>
// {
//   // this.callBackendAPI()
//   // .then(res => this.setState({ authenticated: res.express }))
//   // .catch(err => console.log(err));
//   // console.log(this.state.authenticated)
//   if(this.state.authenticated)
// {      this.props.history.push('/adminHome')}
// }
// // callBackendAPI = async () => {
// //   const response = await fetch('/api/admin/data');
// //   const body = await response.json();
// // console.log(body)
// //   if (response.status !== 200) {
// //     throw Error(body.message) 
// //   }
// //   return body;
// // };
render(){

  if (this.state.authenticated=="Admin") {
    return <Redirect to="/adminHome" />;
  }
    return(

      
        <div>
     
      <div>
      <h1 className="ui block header" style={{color:"white",backgroundColor:"black"}}>Admin</h1>
        <div className="login-form" style={{marginTop:"8%"}}>
          
          <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
           Log-in to your account
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='User Name' value={this.state.name} onChange={this.onName} />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={this.state.password}
              onChange={this.onPassword}
            />

            <Button color='teal' fluid size='large'onClick={(e)=>{this.onSubmit(e);}}>
              Login
            </Button>
          </Segment>
        </Form>
    
      </Grid.Column>
    </Grid>
    
</div>
</div>
        
</div>  

    )
}
}
export default withRouter(loginAdmin)
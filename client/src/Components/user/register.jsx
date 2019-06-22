import React,{Component} from 'react'
import { Button, Form, Input, TextArea, Grid, Select,password,email } from 'semantic-ui-react'
import axios from 'axios';
import { Route, Link, BrowserRouter,Redirect,withRouter  } from 'react-router-dom'


class register extends Component{

  state={
    userName:'',
    password:'',
    email:'',
    fullname:'',
    confirm:null,
    submit:''
  }

  onSubmit=(e)=> {
    //e.preventDefault()
    //e.preventDefault();
    var that=this
    const data = {
         userName: this.state.userName,
         password:this.state.password,
         fullname:this.state.fullname,
         email:this.state.email
         }
  console.log(data)
      axios.post('/api/user/addUser', data, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function (res){
      console.log(res.data)
      document.getElementById("form-input-control-first-name").value="";
      document.getElementById("some").value="";
      document.getElementById('some1').value=""
      document.getElementById('some2').value=""
      document.getElementById('abc').value=""
      //console.log(this.state.submit)
  
      
        that.setState({submit:res.data.exp},function(req,res){
       console.log(that.state.submit)
        })
      that.setState({fullname:'',userName:'',email:'',password:''})
      
    //this.history.push('/adminHome');
//console.log(this.state.session)
    })
    .catch(err=>{
      console.log(err+"abc")
    });
   
}  

updateInput=(event)=>{
  this.setState({fullname: event.target.value})
}
updateUser=(event)=>{
  this.setState({userName:event.target.value})
}
updatePassord=(event)=>{
  this.setState({password:event.target.value})
}
updateEmail=(event)=>{
  this.setState({email:event.target.value})
}
 render(){
  if (this.state.submit) {
    return <Redirect to="/" />;
  }
    return(
        <div>
            <h1 className="ui block header" style={{color:"white",backgroundColor:"black"}}>Welcome</h1>
            <Grid>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column width={6}>
          <Form style={{marginTop:"30px"}}>  
        
          <Form.Field
          id='form-input-control-first-name'
          control={Input}
          label='Full Name'
          placeholder='Full Name'
          onChange={this.updateInput}
        />
        <Form.Field
          id='abc'
          control={Input}
          label='User Name'
          placeholder='User Name'
          onChange={this.updateUser}
        />
        <Form.Field
          id='some'
          control={Input}
          type='password'
          label='Password'
          placeholder='Password'
          onChange={this.updatePassord}
        />
        <Form.Field
          id='some1'
          control={Input}
          type='password'
          label='Confirm Password'
          placeholder='Confirm Password'
      
          
        />
        <Form.Field
          id='some2'
          control={Input}
          label='Email Id'
          type='email'
          placeholder='Email Id'
          onChange={this.updateEmail}
        />
         
   
      <Form.Field
        id='form-button-control-public'
        control={Button}
        content='Submit'
        onClick={(e)=>this.onSubmit(e)}
      />
    </Form>
    </Grid.Column>
    </Grid>
    </div>
    )
}
}

export default withRouter(register)
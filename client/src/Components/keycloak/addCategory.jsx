import React,{Component} from 'react'
import { Button, Form, Input, TextArea, Grid, Select } from 'semantic-ui-react'
import axios from 'axios';


class category extends Component{
    state={
name:'',
sub: ''
    }
   
    onSubmit=(e)=> {
        //e.preventDefault()
        //e.preventDefault();
        const data = {
             name: this.state.name,
             subcategory:this.state.sub
             }
      console.log(data)
          axios.post('/api/category/addcategory', data, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(function (res){
          console.log(res)
      
        //this.history.push('/adminHome');
    //console.log(this.state.session)
        })
        .catch(err=>{
          console.log(err+"abc")
        });
        this.cancelCourse()
   }  
   cancelCourse = () => { 
    document.getElementById("form-input-control-first-name").value="";
    document.getElementById("some").value="";
  }
    updateInput=(event)=>{
        this.setState({name : event.target.value})
        }
        updateSub=(event)=>{
          this.setState({sub : event.target.value})
          }

    render(){
        return(
            <div>
              <Form style={{marginTop:"30px"}}>  
        
            <Form.Field
              id='form-input-control-first-name'
              control={Input}
              label='Category'
              placeholder='Category'
              onChange={this.updateInput}
            />
            <Form.Field
              id='some'
              control={Input}
              label='Sub Category'
              placeholder='Sub Category'
              onChange={this.updateSub}
            />
           
             
       
          <Form.Field
            id='form-button-control-public'
            control={Button}
            content='Submit'
            onClick={(e)=>this.onSubmit(e)}
          />
        </Form>
        </div>
        )
    }
}
export default category
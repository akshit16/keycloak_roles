import React,{Component} from 'react'
import { Button, Form, Input, TextArea, Grid, Select } from 'semantic-ui-react'
import axios from 'axios';

class file extends Component{
    state={
      category:[],
      selectedFile: null, 
      loaded: 0,
      quizname:'',
      catvalue:'',
      subvalue:'',
      subcategory:[]
    }
    componentDidMount(){
    }
    

    handleselectedFile = (event) => {
      console.log(event.target.files)
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      },function(){
        console.log(this.state.selectedFile)
      })
    } 

    handleUpload = () => {
      const data = new FormData()
      console.log(this.state.selectedFile)
      data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        
      axios
        .post('/keycloak/upload', data, {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
            })
          },
        })
        .then(res => {
          console.log(res.statusText)
          console.log(this.state.selectedFile)
          this.setState({selectedFile:null},function(){
            console.log(this.state.selectedFile)
          })
          this.cancelCourse()
        }).catch(err=>{
          console.log(err)
        })
  
    }

    


    cancelCourse = () => { 
      document.getElementById("files").value="";
    }
    render(){
        return(
            <div>
              <Form id='uploadForm' encType="multipart/form-data"  method="post" 
              style={{marginTop:"30px"}}>  
        
            
    <input type="file" name="files" id="files" style={{marginTop:"6px"}} onChange={(event)=>this.handleselectedFile(event)} />
          <Form.Field
            id='form-button-control-public'
            control={Button}
            content='Submit'
            style={{marginTop:"8px"}}
            onClick={(e)=>{this.handleUpload();}}
          />
        </Form>
        </div>
        )
    }
}
export default file
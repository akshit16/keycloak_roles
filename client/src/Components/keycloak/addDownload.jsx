import React,{Component} from 'react'
import { Button, Form, Input, TextArea, Grid, Select } from 'semantic-ui-react'
import download from 'downloadjs'
class downloadFile extends Component{

   
    fileDownload=async()=>{
    const res = await fetch('/api/quiz/download');

    const fileBlob = await res.blob();
    download(fileBlob);
    }
    render(){

        return(
            <Form>
            <input type="button" name="files" id="files" value="Download File" onClick={this.fileDownload} style={{marginTop:"6px"}} />
            </Form>
        )
    }
}

export default downloadFile
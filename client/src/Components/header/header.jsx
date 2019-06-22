import React,{Component} from 'react'
import { Header } from 'semantic-ui-react'

class header extends Component{
state={
  session:false
}
componentDidMount() {
  this.callBackendAPI()
  .then(res => this.setState({ session: res.express }))
  .catch(err => console.log(err));
  console.log(this.state.session)
}
callBackendAPI = async () => {
  const response = await fetch('/api/admin/data');
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
    { this.state.session&&
      <Header as='h3' block>
        Quiz Application
      </Header>
    }
    </div> 
    
  )}
  }

export default header
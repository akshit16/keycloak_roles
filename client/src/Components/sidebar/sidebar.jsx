import React,{Component} from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

class sidebar extends Component
{

   

    
 render()
 {return(
    <div >
    <Sidebar as={Menu}  icon='labeled' style={{paddingTop:'50px',color:'black'}} inverted vertical visible width='thin'>
    <Menu.Item as='a'  onClick={this.props.download}>
     
     Download Quiz File
   </Menu.Item>
     
      <Menu.Item as='a' onClick={this.props.add}>
       Add a Quiz
      </Menu.Item>
      <Menu.Item as='a' onClick={this.props.category}>
        
        Add Category
      </Menu.Item>
      
    </Sidebar>
    </div>
  
)
 }
}
export default sidebar

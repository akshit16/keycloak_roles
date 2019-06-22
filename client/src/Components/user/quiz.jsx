import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment,Input,Select } from 'semantic-ui-react'
import axios from 'axios';
import { Route, Link, BrowserRouter,Redirect,withRouter  } from 'react-router-dom'
class quiz extends Component
{
    state={
        userType:"",
        data:[],
        score:0,
        time: 20,
        category:[],
        subcategory:[],
        quizName:[],
        session:'',
        i:0,
        color:"#28282b",
        right:'green',
        wrong:'red',
        catvalue:'',
      subvalue:'',
      quizvalue:''
     
        }
        componentWillMount() {
          this.callBackendAPI()
            .then(res => this.setState({ userType: res.express.type }),function(){
                console.log(this.state.userType)
               
            })
            .catch(err => console.log(err));
        

            this.getCategory()
            
            this.setState({ time: this.state.time });

           this.interval = setInterval(this.countDown, 1000);
            
          }


          
        callBackendAPI = async () => {
            const response = await fetch('/api/user/data');
            const body = await response.json();
          //console.log(body)
            if (response.status !== 200) {
              throw Error(body.message) 
            }
            return body;
          }

          getsubcateg = async () => {
            const response = await fetch('/api/category/getSubCategory');
            const body = await response.json();
        //  console.log(body)
            if (response.status !== 200) {
              throw Error(body.message) 
            }
            
          //  console.log(this.state.catvalue)
            
            for(var i=0;i<body.subcateg.length;i++)
            {
            if(this.state.catvalue==body.subcateg[i].category){
            var subcategory=[]
            subcategory=Object.assign({}, body.subcateg[i], { category: undefined });
            delete subcategory.category
            console.log(subcategory.text.length)
            var obj=[]
            for(var j=0;j<subcategory.value.length;j++)
            obj[j] ={key:subcategory.text[j], text:subcategory.text[j],value:subcategory.value[j]}
            console.log(obj)
            this.setState({subcategory:obj},function(){
              console.log(this.state.subcategory)
            })
          }
          }
      
           // options=this.state.category
            //console.log(options)
            return body;
          }
          getName = async () => {
            const response = await fetch('/api/quiz/getQuizName');
            const body = await response.json();
            this.setState({quizName:""})
      //    console.log(body)
            if (response.status !== 200) {
              throw Error(body.message) 
            }
            
            
            for(var i=0;i<body.quizname.length;i++)
            {
            if(this.state.catvalue==body.quizname[i].category&&this.state.subvalue==body.quizname[i].subcategory){
            var quizName=[]
            quizName=Object.assign({}, body.quizname[i], { category: undefined });
            delete quizName.category
            console.log(quizName.text.length)
            var obj=[]
            for(var j=0;j<quizName.length;j++)
            console.log(quizName.length)
            obj[j] ={key:quizName.text, text:quizName.text,value:quizName.value}
            console.log(obj)
            this.setState({quizName:obj},function(){
              console.log(this.state.quizName)
            })
          }
          }
      
           // options=this.state.category
            //console.log(options)
            return body;
          }
      
        countDown=()=>{
          if(this.state.session)
            this.setState({time:this.state.time-1})
            if (this.state.time <= 0) {
               
            
                if(this.state.i+1<this.state.data.length){
                    this.setState({time:20})
                    
                this.changeTimer()
              }
              else{
                  clearInterval(this.interval)
              }
            }
        }
     
          getCategory = async () => {
            const response = await fetch('/api/category/getcategory');
            const body = await response.json();
        //  console.log(body)
            if (response.status !== 200) {
              throw Error(body.message) 
            }
            this.setState({category:body.categ})
           let options=this.state.category
           // console.log(options)
            return body;
          }
          handleChange=(e,data)=>
          {
           this.setState({catvalue:data.value},function(){
             console.log(this.state.catvalue)
           })
           this.getsubcateg()
      this.getName()
            console.log(data.value)
          }
      
          handleSubChange=(e,data)=>
          {
           this.setState({subvalue:data.value},function(){
             console.log(this.state.subvalue)
           })
           this.getName()
           console.log(data.value)
          }

          handleNameChange=(e,data)=>
          {
           this.setState({quizvalue:data.value},function(){
             console.log("name of quiz"+this.state.quizvalue)
           })
         
          }
          onSubmit=(e)=> {
              var that=this
            const data = {
                category:this.state.catvalue,
                subcategory:this.state.subvalue,
                quizName:this.state.quizvalue
                }
         console.log(data)
             axios.post('/api/quiz/getQuiz', data, {
             headers: { 'Content-Type': 'application/json' }
           })
           .then(function (res){
             console.log(res)
          that.setState({session:res.data.exp,data:res.data.exp})
          
         
           })
           .catch(err=>{
             console.log(err+"abc")
           });
          
        
        }
        changeTimer=()=>{this.setState({i:this.state.i+1})}

        score=(e)=>{
            let score=0
            let sc

         console.log(this.state.data[this.state.i].answer)
         console.log(e.currentTarget.innerHTML)
         if(this.state.i+1<=this.state.data.length){
            if(this.state.data[this.state.i].answer==e.currentTarget.innerHTML){
                this.state.score+=parseInt(this.state.data[this.state.i].score)
                
                this.setState({score:this.state.score})
                e.target.style.background=this.state.right
              //  setTimeout(()=> {e.target.style.background=this.state.color},400)
              if(this.state.i+1<this.state.data.length){
                setTimeout(()=> {this.setState({i:this.state.i+1,time:20});document.getElementById('3').style.background=this.state.color;
                document.getElementById('4').style.background=this.state.color;document.getElementById('1').style.background=this.state.color;document.getElementById('2').style.background=this.state.color},500)
              }
              else{
                setTimeout(()=> {this.setState({time:0})},500)
              }
            
            }
            else{
                e.target.style.background="red"
                if(this.state.i+1<this.state.data.length){
                setTimeout(()=> {this.setState({i:this.state.i+1,time:20});document.getElementById('3').style.background=this.state.color;
                document.getElementById('4').style.background=this.state.color;document.getElementById('1').style.background=this.state.color;document.getElementById('2').style.background=this.state.color},500)
            }
            else{
                setTimeout(()=> {this.setState({time:0})},500)
              }
        }
        }     
        else{
            setTimeout(()=> {this.setState({time:0})},500)
        }
            

        }        
    render(){
        //var options = ["this baby","baby this"]
        
        let that=this;
        let i =0;

        return(
            <div>
              {this.state.userType=="user"&&
          
            <div>
                 {this.state.session&&this.state.data.length>0&& 
                 <div>
                     
                <h1 className="ui block header" style={{color:"white",backgroundColor:"black"}}>Welcome</h1>
                    {this.state.time>0&&this.state.data[this.state.i]!=""&&
                  <div>  
                <div><h3 style={{float:'left',marginLeft:"10%"}}>Time: {this.state.time}</h3>
                <h3 style={{marginLeft:'73%'}}>Score:{this.state.score}</h3></div>
                <div className="card">
				<h3>{this.state.data[this.state.i].question}</h3>
                </div>        
            <br/><br/>
            <div className="card1" id="1" onClick={(event)=>{this.score(event)}}>{that.state.data[this.state.i].option1}</div>
            <div className="card1" id="2" onClick={(event)=>{this.score(event)}}>{this.state.data[this.state.i].option2}</div>
            <div className="card1" id="3" onClick={(event)=>{this.score(event)}}>{that.state.data[this.state.i].option3}</div>
            <div className="card1" id="4" onClick={(event)=>{this.score(event)}}>{that.state.data[this.state.i].option4}</div>
                  </div>
                    }


                    {this.state.time<=0&&<div>
                      <h2>Quiz Over</h2><br/>
                      <h3>Score: {this.state.score}</h3>
                  </div>}
            </div>
                   }
    {
      
        !this.state.session&&
        <div>
            <h1 className="ui block header" style={{color:"white",backgroundColor:"black"}}>Welcome</h1>
        <Grid>
            <Grid.Column width={10}>
                    <Form style={{marginTop:"30px", marginLeft:"60%"}}>  
  
                    <Form.Field
             control={Select}
               onChange={this.handleChange}
              options={this.state.category}
              label={{ children: 'Category', htmlFor: 'form-select-control-gender' }}
              placeholder='Category'
              
              
            />
            <Form.Field
              control={Select}
              options={this.state.subcategory}
              onChange={this.handleSubChange}
              label={{ children: 'Sub Category', htmlFor: 'form-select-control-gender' }}
              placeholder='Sub Category'
              search
              searchInput={{ id: 'form-select-control-gender' }}/>

              <Form.Field
              control={Select}
              options={this.state.quizName}
              onChange={this.handleNameChange}
              label={{ children: 'Quiz Name', htmlFor: 'form-select-control-gender' }}
              placeholder='Name'
              search
              searchInput={{ id: 'form-select-control-gender' }}/>
    <Form.Field
      id='form-button-control-public'
      control={Button}
      content='Submit'
      onClick={(e)=>this.onSubmit(e)}
    />
  </Form>
  </Grid.Column></Grid>
  </div>
    }
    </div>
              }
    </div>
        );
    }

    

}
export default withRouter(quiz)
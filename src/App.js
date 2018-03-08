
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown';


import { Input, Layout, Tabs, Button, Tooltip,Upload, message, Icon } from 'antd';
import './App.css'
import 'font-awesome/css/font-awesome.min.css';


const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const { Content } = Layout;
const { TextArea } = Input;
const files = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(info.file.name  + "file uploaded successfully");
      return "success";
    } else if (info.file.status === 'error') {
      message.error(info.file.name + "file upload failed.");
    }
  },
};
class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
      textareaVal: "",
      newText: "",
      operations: "",
      fullscreen: false
    }
    this._onChange = this._onChange.bind(this);
    this.buttonClick=this.buttonClick.bind(this);
   // this.toggleFullScreen=this.toggleFullScreen.bind(this);
    this.upload=this.upload.bind(this);
  }
  
  componentWillMount() {
    const products = this.getButtons();
    this.setState({ operations: products });
  }
  
  getButtons() {
    const newOperations =
    <ButtonGroup onClick={this.buttonClick}> 
      <Tooltip placement="bottom" title="Add bold text">
        <Button id="1"  > <i  className="fa fa-bold"></i> </Button>
      </Tooltip>
      <Tooltip placement="bottom" title="Add italic text">
        <Button  id="2" > <i className="fa fa-italic"></i> </Button>
      </Tooltip>
      <Tooltip placement="bottom" title="Insert a quote">
        <Button id="3"> <i className="fa fa-quote-left"></i> </Button>
      </Tooltip>
      <Tooltip placement="bottom" title="Insert code">
        <Button id="4"> <i className="fa fa-code"></i> </Button>
      </Tooltip>
      <Tooltip placement="bottom" title="Add a bullet list">
        <Button id="5"> <i className="fa fa-list-ul"></i> </Button>
      </Tooltip>
      <Tooltip placement="bottom" title="Add a numbered list">
        <Button id="6"> <i className="fa fa-list-ol"></i> </Button>
      </Tooltip>
      <Tooltip placement="bottom" title="Add a task list">
        <Button id="7"> <i className="fa fa-check-square-o"></i> </Button>
      </Tooltip>
      <Tooltip placement="bottom" title="Go full screen">
        <Button onClick={this.toggleFullScreen} > <i className="fa fa-expand"></i> </Button>
      </Tooltip>
    </ButtonGroup>
    return newOperations
  }
  _onChange = (key) => {
     if (key === "1") { this.setState({ operations: this.getButtons() })}
    else { this.setState({ operations: "" }) }
  }
  selected = (textareaVal) => {
    let textVal = ReactDOM.findDOMNode(this.textareaVal)
    let cursorStart = textVal.selectionStart;
    let cursorEnd = textVal.selectionEnd;
    let text= this.state.textareaVal
    let selectedText= text.slice(cursorStart, cursorEnd)
    let textstart = text.slice(0, cursorStart)
    let textend  = text.slice(cursorEnd, text.length)
    let arr={selectedText,cursorEnd,cursorStart, textstart, textend}
    return arr
  }
 
  foo=(text,compare_val, index, insert_elem)=>{
    let compare= text.match(compare_val)
    let newstate=this.state.textareaVal
    if(compare)
      {
       let newtext = newstate.replace(text, text[index-1]==="*" ? text.slice(index,text.length-index): "**"+text+"**")
       
       this.setState({textareaVal: newtext})
      }
      else if(text.length>0)
      {
      let  newtext = newstate.replace(text, insert_elem==="``" ? text+insert_elem:insert_elem+text+insert_elem)
      this.setState({textareaVal: newtext})
      }
      else if(insert_elem === "``")
      {
        let newtext = newstate + "``"
        this.setState({textareaVal: newtext})
      }
  }
  foo1=(arr, start, end, insert_elem)=>
  {
    let elem=arr[arr.length-1].split (" ").join("")
    if(elem === "")
    {
      let newtext=this.state.textareaVal + insert_elem + ' '
      this.setState({textareaVal: newtext})  
    }
    else if(elem[elem.length-1] === insert_elem[0] && elem[elem.length-2] === insert_elem[1])
    {
      let newtext=this.state.textareaVal + '\n' + insert_elem + ' '  
      this.setState({textareaVal: newtext})
    }
    else if(elem[elem.length-1] === insert_elem )
    {
      let newtext=this.state.textareaVal + '\n' + insert_elem + ' '
      this.setState({textareaVal: newtext})
    }
    else if(start ==="")
    {
      let newtext=this.state.textareaVal + '\n' + insert_elem + ' '
      this.setState({textareaVal: newtext})
    }
    else 
    {    
      let newtext = start + '\n\n'+insert_elem +' '+ end
      this.setState({textareaVal: newtext})
    }
  }
  toggleFullScreen=()=>{
    this.setState({fullscreen: !this.state.fullscreen})
  }
  buttonClick=(e)=>{
    let text=this.selected(this.textareaVal).selectedText;
    let arr = this.state.textareaVal.split("\n");
    let start=this.selected(this.textareaVal).textstart;
    let end = this.selected(this.textareaVal).textend;
    let bold_param = /^([*])(.*[*])?$/igm;
    let italic_param = /^([*])(.*[*])?$/igm;
   console.log(e.target.id)
    switch(e.target.id){
      case "1": 
        return this.foo(text, bold_param, 2, "**");
      case "2":  
        return this.foo(text, italic_param, 1, "*");
      case "3":  
        return this.foo1(arr, start, end, ">");
      case "4":  
        return this.foo(text, null, null, "``");
      case "5":  
        return this.foo1(arr, start, end, "*");
      case "6":  
        return this.foo1(arr, start, end, "1.");  
      case "7":  
        return this.foo1(arr, start, end, "- []");  
      case "8": 
        return this.toggleFullScreen();        
        
      default:
        return  
  }
}
  upload=()=>
  {
    if(files)
    { 
      let text= this.state.textareaVal
      this.setState({textareaVal: text+files.action})
    }else 
    {
      this.setState({textareaVal: this.state.textareaVal})
    }
  }
  
  render() {
    return (
      <div>
        {
          this.state.fullscreen &&
            <div className="fullscreen"> 
              <Layout>
                <Content >
                  <Button className="button" onClick={this.toggleFullScreen}><i className="fa fa-expand"></i></Button> 
                  <TextArea
                    className="area"
                    autosize={{ minRows: 3 }}
                    autoFocus
                    ref={(input) => { this.newText = input }}      
                    value={this.state.textareaVal}
                    onChange=
                    {
                      (event) => {
                        this.setState({
                          textareaVal: event.target.value
                        });
                      }
                    }
                  >
                  </TextArea>
                </Content>
              </Layout>
            </div>
         }
        <Tabs 
          className ={this.state.classname} 
          defaultActiveKey="1" 
          onChange={this._onChange} 
          tabBarExtraContent={this.state.operations}
        >
          <TabPane tab="Write" key="1" >
            <TextArea
              autoFocus
              rows={15}
              ref={(input) => { this.textareaVal = input }}      
              value={this.state.textareaVal}
              onChange=
              {
                (event) => {
                  this.setState({
                    textareaVal: event.target.value
                  });
                }
              }
            >
            </TextArea >
            <div className="upload">
              <Upload 
                {... files}
              >
                <Button onClick={this.upload}>
                  <Icon type="upload" /> Attach a file
                </Button>
              </Upload>
            </div>
          </TabPane >
          <TabPane tab="Preview" key="2">
            <pre>
              <code>
              <Markdown source={this.state.textareaVal} />   
              </code>
            </pre>   
          </TabPane>
        </Tabs>
        
      </div>
    )
  }
}

export default App;  
import React,{Component} from 'react';
import ReactDom from 'react-dom';
import { LeInput,LeForm,LeButton,LeField,LeCheckbox,LeRadio,LeSelect,LeAutoComplete } from "./out/index.js";
import "./assets/base.scss";
import "./fonts/iconfont.scss";
import http from "@core/http.js";
import tool from "@core/tool.js";
class App extends Component{
    constructor(props){
        super(props);
        this.ageInput = null;
        this.nameInput = null;
        this.happyCheckbox = null;

        this.state = {
            userid:"",
            password:"",
            happy:[],
            hobby:[
                {name:"⚽️足球",value:0},
                {name:"🏀篮球",value:1},
                {name:"🏸️羽毛球",value:2},
            ],
            sex:0,
            sexs:[
                {name:"男👨",value:0},
                {name:"女👩",value:1},
            ],
            sex1:0,
            fruits:[
                {name:"🍎apple",id:0},
                {name:"🍌banana",id:1},
                {name:"🍇grape",id:2},
            ],
            fruit:"",
            foods:[
                {name:"🐟fish",id:0},
                {name:"🐱 cat",id:1},
                {name:"🐶 dog",id:2},
                {name:"🐯tiger",id:3},
            ],
            food:[0,1],
            suggest:"",
            suggests:[],
        }
    }
    handleChange = (name,value)=>{
        this.setState((state,props)=>({
            [name]:value
        }))
    }
    handleClick = ()=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(1)
            },2000)
        })
    }
    login = ()=> {
        return  http.postFormData("/api/login",{
                    userid:this.state.userid,
                    password:this.state.password,
                    lang:"en"
                }).then(res=>{
                    // tool.cookie.setCookie("userName",d.data.uname)
                    console.log(res)
                })
    }
    getData(){
        this.ageInput.alertName();
        this.nameInput.alertName();
    }
    getHappy(){
        let result = this.happyCheckbox.getCheckItems();
        console.log(result);
    }
    analysis(res){
        return res.data;
    }
    selectItem(item){
        console.log(item);
    }
    componentDidMount(){

    }
    render(){
        return(
            <form className="wrap">
            {/* input */}
                <LeField 
                    label="itcode"
                    el={el=> this.ageInput = el}
                    name="userid" 
                    value={this.state.userid} 
                    onChange={this.handleChange}>
                </LeField>
                <LeField 
                    label="password" 
                    el={el=> this.nameInput = el}
                    name="password" 
                    type="password" 
                    value={this.state.password} 
                    onChange={this.handleChange}>
                </LeField>
             {/*checkbox  */}
                <LeField 
                    label="happy" 
                    el={el=>this.happyCheckbox = el}
                    name="happy" 
                    type="checkbox"
                    displayName="name"
                    displayValue="value"
                    data={this.state.hobby} 
                    value={this.state.happy}
                    onChange={this.handleChange} 
                    Component={LeCheckbox}>
                </LeField>
                {
                    JSON.stringify(this.state.happy)
                }
                <LeField 
                    name="happy" 
                    type="checkbox"
                    displayName="name"
                    data={this.state.hobby} 
                    value={this.state.happy} 
                    onChange={this.handleChange} 
                    disabled={true}
                    Component={LeCheckbox}>
                </LeField>
                <hr/>

                {/* radio */}
                <LeField
                    label="sex"
                    name="sex"
                    type="radio"
                    displayName="name"
                    displayValue="value"
                    data={this.state.sexs}
                    value={this.state.sex}
                    onChange={this.handleChange}
                    Component={LeRadio}
                ></LeField>
                {
                    JSON.stringify(this.state.sex)
                }
                <LeField
                    label="sex"
                    name="sex1"
                    type="radio"
                    data={this.state.sexs}
                    value={this.state.sex1}
                    displayName="name"
                    displayValue="value"
                    disabled={true}
                    onChange={this.handleChange}
                    Component={LeRadio}
                ></LeField>
                <hr/>
                
                {/* select */}
                <LeField
                    label="fruit"
                    name="fruit"
                    type="select"
                    data={this.state.fruits}
                    value={this.state.fruit}
                    displayName="name"
                    displayValue="id"
                    onChange={this.handleChange}
                    Component={LeSelect}
                ></LeField>
                {
                    JSON.stringify(this.state.fruit)
                }
                <LeField
                    label="animal"
                    name="food"
                    type="select"
                    data={this.state.foods}
                    value={this.state.food}
                    displayName="name"
                    displayValue="id"
                    onChange={this.handleChange}
                    Component={LeSelect}
                    multiply={true}
                ></LeField>
                {
                    JSON.stringify(this.state.food)
                }
                <hr/>
                <LeField
                    label="autoComplete"
                    name="suggest"
                    type="select"
                    value={this.state.suggest}
                    displayName="word"
                    onChange={this.handleChange}
                    url="/serach/suggest"
                    Component={LeAutoComplete}
                    analysis={this.analysis}
                    selectItem={this.selectItem}
                ></LeField>
                <div className="btn_group">
                    <LeButton value="disabled"  disabled={true}></LeButton>
                    <LeButton onSubmit={this.login}></LeButton>
                    <LeButton onSubmit={this.handleClick}></LeButton>
                    <LeButton value="normal" type="normal" onClick={()=>this.getData()}></LeButton>
                    <LeButton value="happy" type="normal" onClick={()=>this.getHappy()}></LeButton>
                </div>
            </form>
        )
    }
}
ReactDom.render(<App></App>,
    document.getElementById('app')
);
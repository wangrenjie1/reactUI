import React,{Component} from 'react';
import ReactDom from 'react-dom';
import { LeInput,LeForm,LeButton,LeField,LeCheckbox,LeRadio,LeSelect } from "./out/index.js";
import "./assets/base.scss";
import "./fonts/iconfont.scss"

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            age:"",
            happy:[0,2],
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
        }
    }
    handleChange = (name,value)=>{
        console.log(name)
        console.log(value)
        this.setState((state,props)=>({
            [name]:value
        }))
    }
    handleClick = ()=>{
        return new Promise((reslove,reject)=>{
            setTimeout(()=>{
                reslove(1)
            },2000)
        })
    }
    componentDidMount(){

    }
    render(){
        return(
            <form className="wrap">
                <LeField 
                    label="name" 
                    name="name" 
                    value={this.state.name} 
                    onChange={this.handleChange}>
                </LeField>
                <LeField 
                    label="age" 
                    name="age" 
                    type="password" 
                    value={this.state.age} 
                    onChange={this.handleChange}>
                </LeField>
                
                <LeField 
                    label="happy" 
                    name="happy" 
                    type="checkbox"
                    displayName="name"
                    displayValue="value"
                    data={this.state.hobby} 
                    value={this.state.happy} 
                    onChange={this.handleChange} 
                    component={LeCheckbox}>
                </LeField>
                <LeField 
                    name="happy" 
                    type="checkbox"
                    displayName="name"
                    data={this.state.hobby} 
                    value={this.state.happy} 
                    onChange={this.handleChange} 
                    disabled={true}
                    component={LeCheckbox}>
                </LeField>
                
                <hr/>
                {
                    JSON.stringify(this.state.happy)
                }
                <LeField
                    label="sex"
                    name="sex"
                    type="radio"
                    displayName="name"
                    displayValue="value"
                    data={this.state.sexs}
                    value={this.state.sex}
                    onChange={this.handleChange}
                    component={LeRadio}
                ></LeField>
                <LeField
                    label="sex"
                    name="sex1"
                    type="radio"
                    displayName="name"
                    displayValue="value"
                    data={this.state.sexs}
                    disabled={true}
                    value={this.state.sex1}
                    onChange={this.handleChange}
                    component={LeRadio}
                ></LeField>
                
                <hr/>
                {
                    JSON.stringify(this.state.sex)
                }
                <LeField
                    component={LeSelect}
                ></LeField>
                <div className="btn_group">
                    <LeButton value="disabled"  disabled={true}></LeButton>
                    <LeButton onSubmit={this.handleClick}></LeButton>
                    <LeButton value="normal" type="normal"></LeButton>
                    <LeButton value="delete" type="delete"></LeButton>
                </div>
            </form>
        )
    }
}
ReactDom.render(<App></App>,
    document.getElementById('app')
);
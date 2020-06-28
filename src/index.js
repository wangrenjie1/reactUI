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
            food:[0,1]
        }
    }
    handleChange = (name,value)=>{
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
    getData(){
        console.log(this.refs.animal)
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
                    data={this.state.sexs}
                    value={this.state.sex1}
                    displayName="name"
                    displayValue="value"
                    disabled={true}
                    onChange={this.handleChange}
                    component={LeRadio}
                ></LeField>
                
                <hr/>
                {
                    JSON.stringify(this.state.sex)
                }
                <LeField
                    label="fruit"
                    name="fruit"
                    type="select"
                    data={this.state.fruits}
                    value={this.state.fruit}
                    displayName="name"
                    displayValue="id"
                    onChange={this.handleChange}
                    component={LeSelect}
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
                    component={LeSelect}
                    multiply={true}
                    ref="animal"
                ></LeField>
                {
                    JSON.stringify(this.state.food)
                }
                <div className="btn_group">
                    <LeButton value="disabled"  disabled={true}></LeButton>
                    <LeButton onSubmit={this.handleClick}></LeButton>
                    <LeButton value="normal" type="normal" onClick={()=>this.getData()}></LeButton>
                    <LeButton value="delete" type="delete"></LeButton>
                </div>
            </form>
        )
    }
}
ReactDom.render(<App></App>,
    document.getElementById('app')
);
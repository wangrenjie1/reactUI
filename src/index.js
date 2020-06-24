import React,{Component} from 'react';
import ReactDom from 'react-dom';
import { LeInput,LeForm,LeButton,LeField } from "./out/index.js";
import "./assets/base.scss";


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            age:""
        }
    }
    handleChange = (e)=>{
        let name = e.target.getAttribute("name");
        let value = e.target.value;
        this.setState({
            [name]:value
        })
    }
    handleClick = ()=>{
        return new Promise((reslove,reject)=>{
            setTimeout(()=>{
                reslove(1)
            },2000)
        })
    }
    render(){
        return(
            <form className="wrap">
                <LeField label="name" name="name" value={this.state.name} onChange={this.handleChange}></LeField>
                <LeField label="age" name="age" type="password" value={this.state.age} onChange={this.handleChange}></LeField>
                <div className="btn_group">
                    <LeButton value="disabled" onSubmit={this.handleClick} disabled={true}></LeButton>
                    <LeButton></LeButton>
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
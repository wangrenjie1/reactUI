import React from 'react';
import "./index.scss";
import tool from "@core/tool.js"
export default class extends React.Component {
    static defaultProps = {
        value: "Click Me",
        disabled: false,
        icon: "",
        type: "primary"
    }
    constructor(props) {
        super(props);
        this.state = {
            disabled: this.props.disabled
        }
    }
    componentDidMount() {
        this.refs.button.addEventListener('click', function (e) {
            e.preventDefault();
            let rippleBox = document.createElement("div");
            rippleBox.style.width = e.target.offsetWidth  + "px";
            rippleBox.style.height = e.target.offsetHeight + "px";
            rippleBox.classList.add("_ripples")
            let x = e.offsetX;
            let y = e.offsetY;
            let ripples = document.createElement("span");
            ripples.style.left = x + "px";
            ripples.style.top = y + "px";
            rippleBox.appendChild(ripples);
            e.target.appendChild(rippleBox);
            setTimeout(() => {
                rippleBox.remove();
            }, 1000);
        })
    }
    componentWillUnmount() {
        this.refs.button.removeEventListener('click');
    }
    handleClick = async ()=>{
        if(this.props.onClick){
            this.props.onClick();
            return
        }
        if(this.props.onSubmit){
            const p = this.props.onSubmit();
            if(tool.isPromise(p)){
                this.setState({disabled:true})
                p.then(res=>{
                    this.setState({disabled:false})
                }).catch(err=>{
                    this.setState({disabled:false})
                })
            }else{
                throw new Error("传入的function 不是一个promise")
            }
        }
    }
    render() {
        return (
            <button 
                ref="button" 
                onClick={this.handleClick}
                disabled={this.state.disabled} 
                className={`btn ${this.props.type}`}
            >{this.props.value}
            </button>
        )
    }
}
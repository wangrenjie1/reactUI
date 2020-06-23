import React from 'react';
import "./index.scss";

export default class extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.refs.button.addEventListener('click',function(e){
            let x = e.offsetX;
            let y = e.offsetY;
            let ripples = document.createElement("span");
            ripples.classList.add("_ripples")
            ripples.style.left = x + "px";
            ripples.style.top = y + "px";
            e.target.appendChild(ripples);
            setTimeout(() => {
                ripples.remove();
            }, 1000);
        })
    }
    componentWillUnmount(){
        this.refs.button.removeEventListener('click');
    }
    render(){
       return (<button ref="button" className="btn">Click Me</button>)
    }
}
import React, { Component } from 'react';
import "./index.scss";

export default class extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
    handleChange = (e) => {
        let name = this.props.name;
        let value = e.target.value;
        this.props.onChange(name,value);
    }
    componentDidMount() {
        this.inputRef.current.addEventListener('focus', (e) => {
            this.props.onFocus();
        })
        this.inputRef.current.addEventListener('blur', (e) => {
            this.props.onBlur();
        })
    }
    componentWillUnmount(){
        this.inputRef.current.removeEventListener('focus');
        this.inputRef.current.removeEventListener('blur');
    }
    alertName(){
        alert("this is input component : " + this.props.name)
    }
    render() {
        return (
            <div className={`text_field ${this.props.focused||this.props.value!="" ? "active" : ""}`}>
                {this.props.label ? <label>{this.props.label}</label> : ""}
                <input
                    ref={this.inputRef}
                    onChange={this.handleChange}
                    autoComplete="off"
                    name={this.props.name}
                    value={this.props.value}
                    type={this.props.type}
                />
            </div>
        )
    }
}
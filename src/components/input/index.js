import React, { Component } from 'react';
import "./index.scss";

export default class extends Component {
    constructor(props) {
        super(props);
    }
    handleChange = (e) => {
        this.props.onChange(e);
    }
    componentDidMount() {
        this.refs.Input.addEventListener('focus', (e) => {
            this.props.onFocus();
        })
        this.refs.Input.addEventListener('blur', (e) => {
            this.props.onBlur();
        })
    }
    componentWillUnmount(){
        this.refs.Input.removeEventListener('focus');
        this.refs.Input.removeEventListener('blur');
    }
    render() {
        return (
            <div className={`text_field ${this.props.focused||this.props.value!="" ? "active" : ""}`}>
                {this.props.label ? <label>{this.props.label}</label> : ""}
                <input
                    ref="Input"
                    onChange={this.handleChange}
                    name={this.props.name}
                    value={this.props.value}
                    type={this.props.type}
                />
            </div>
        )
    }
}
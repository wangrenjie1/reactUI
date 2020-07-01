import React, { Component, createElement, forwardRef } from 'react';
import "./index.scss";
import Input from "@components/input";


export default class extends Component {
    static defaultProps = {
        Component: Input,
        type: "text",
        name: "",
        initialValue: "",
        value: "",
        label: "",
        error: "",
        focused: false,
    }
    getCurrentComponent(){
        debugger;
    }
    constructor(props) {
        super(props);
        this.state = {
            focused: this.props.focused ? true : false,
        }
    }
    handleFocus = () => {
        this.setState({
            focused: true
        })
    }
    handleBlur = () => {
        this.setState({
            focused: false
        })
    }
    render() {
        const { Component, ...otherProps } = this.props;
        return (
            <div className={`input_group ${this.state.focused ? "focused" : ""}  __${this.props.type}`}>
                <div className="input_control">
                    <div className="input_slot">
                        <Component
                            ref={this.props.el}
                            {...otherProps}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            focused={this.state.focused}
                        />
                    </div>
                    <div className="input_detail"></div>
                </div>
            </div>
        );
    }
};


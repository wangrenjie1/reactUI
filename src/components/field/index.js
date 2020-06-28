import React, { Component, createElement } from 'react';
import "./index.scss";
import Input from "@components/input";


export default class extends Component {
    static defaultProps = {
        component: Input,
        type:"text",
        name: "",
        initialValue: "",
        value: "",
        label: "",
        error: "",
        focused: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            focused: this.props.focused ? true : false,
        }
    }
    handleFocus = () => {
        this.setState({
            focused:true
        })
    }
    handleBlur = () => {
        this.setState({
            focused:false
        })
    }
    render() {
        const { component, ...otherProps } = this.props;
        return (
            <div className={`input_group ${this.state.focused ? "focused" : ""}  __${this.props.type}`}>
                <div className="input_control">
                    <div className="input_slot">
                        {
                            createElement(
                                component,
                                {
                                    ref:this.refNode,
                                    ...otherProps,
                                    onFocus: this.handleFocus,
                                    focused: this.state.focused,
                                    onBlur:this.handleBlur
                                }
                            )
                        }
                    </div>
                    <div className="input_detail"></div>
                </div>
            </div>
        );
    }
};

import React, { Component, createElement } from 'react';
import "./index.scss";
import Input from "@components/input"

export default class extends Component {
    static defaultProps = {
        component: Input,
        name: "",
        initialValue: "",
        value: "",
        label: "",
        error: "",
        focused: false,
    }
    constructor(props) {
        super(props);
        switch(this.props.type){
            // todo class
        }
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
            <div className={`input_group ${this.state.focused ? "focused" : ""}`}>
                <div className="input_control">
                    <div className="input_slot">
                        {
                            createElement(
                                component,
                                {
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
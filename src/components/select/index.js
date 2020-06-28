import React, { Component, Fragment } from 'react';
import _ from "lodash";
import "./index.scss";

export default class extends Component {
    static defaultProps = {

    }
    constructor(props) {
        super(props);
        let selectItem = [];
        let data = _.cloneDeep(this.props.data);
        if (this.props.multiply) {
            selectItem = _.intersectionWith(data, this.props.value, (arrVal, othVal) => arrVal[this.props.displayValue] === othVal);
        } else {
            let x = data.find((item) => item[this.props.displayValue] === this.props.value);
            if (x) {
                selectItem[0] = x;
            }
        }
        selectItem.forEach(item=>item._checked = true)
        this.state = {
            selectItem,
            data
        }
    }
    handleClick() {
        if (this.props.focused) {
            this.props.onBlur();
        } else {
            this.props.onFocus();
        }
    }
    emitParent(){
        this.props.onBlur();
        let o = "";
        if (this.props.multiply) {
            o = this.state.selectItem.map(item => item[this.props.displayValue]);
        } else {
            o = this.state.selectItem[0]&&this.state.selectItem[0][this.props.displayValue]
        }
        this.props.onChange(this.props.name, o);
    }
    handleSelected(item) {
        this.setState((state, props) => {
            let idx = _.findIndex(state.selectItem, (o) => o[props.displayValue] == item[props.displayValue]);
            if (idx < 0) {
                item._checked = true;
                if (props.multiply) {
                    state.selectItem.push(item);
                } else {
                    state.selectItem[0] && (state.selectItem[0]._checked = false);
                    state.selectItem[0] = item;
                }
            }else{
                this.state.selectItem[idx]._checked = false;
                this.state.selectItem.splice(idx,1);
            }
            return state;
        },this.emitParent)
    }
    componentDidUpdate(prevProps, prevState, snapshot){
       
    }
    render() {
        return (<>
            <div 
                className={
                    `select_field ${this.props.focused || 
                    (!this.props.multiply)&&this.props.value !== ""||
                    (this.props.multiply)&&(this.props.value.length) ? "active" : ""}`} 
                    onClick={() => this.handleClick()}>

                {this.props.label ? <label>{this.props.label}</label> : ""}
                <div className="selected_box">
                    {this.state.selectItem.map((item, idx) => (<span key={idx} className="selected_box_comma">
                        <span className="selected_box_comma_content">
                            {item[this.props.displayName]}
                        </span>
                    </span>))}
                    <input className="selected_search" type="text"/>
                </div>
                <div className={`select_menu_control ${this.props.focused ? "open" : ""}`}>
                    <i className="iconfont icon-selectup"></i>
                </div>

            </div>
            {this.props.focused ?
                <div className="select_menu">
                    <div className="select_menu_list">
                        {this.state.data.map((item, index) => (<Fragment key={index}>
                            <div className={`select_menu_item ${item._checked?"selected":""}`} onClick={() => this.handleSelected(item)}>
                                <div className="select_menu_item_content">{item[this.props.displayName]}</div>
                            </div>
                        </Fragment>))}
                    </div>
                </div> : ""
            }
        </>)
    }
}
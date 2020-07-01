import React, { Component, Fragment } from 'react';
import _ from "lodash";
import SelectedItem from "./Item.js";
import SelectMenu from "./Menu.js";
import SearchInput from "./Input.js";
import "./index.scss";

export default class extends Component {
    static defaultProps = {

    }
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
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
            menuList:data,
            keyword:"",
            data
        }
    }
    handleClick() {
        if (this.props.focused) {
            this.props.onBlur();
            this.setState({keyword:""},()=>{
                this.changeData();
            });
            this.searchInput.current.blur();
        } else {
            this.props.onFocus();
        }
    }
    getSelectItem(){
        if(this.props.multiply){
            return this.state.SelectedItem;
        }else{
            return this.state.SelectedItem[0];
        }
    }
    deleteItem = (e)=>{
        if(e.keyCode == 8 && this.state.keyword === "" && this.state.selectItem.length){
            this.setState((state,props)=>{
                let idx = state.selectItem.length-1;
                state.selectItem[idx]._checked = false;
                state.selectItem.splice(idx,1);
                return state;
            },this.emitParent)
        }
    }
    emitParent(){
        this.setState({keyword:""},()=>{
            this.changeData();
        });
        let o = "";
        if (this.props.multiply) {
            this.searchInput.current.focus();
            o = this.state.selectItem.map(item => item[this.props.displayValue]);
        } else {
            this.props.onBlur();
            this.searchInput.current.blur();
            o = this.state.selectItem[0]&&this.state.selectItem[0][this.props.displayValue]
        }
        this.props.onChange(this.props.name, o);
    }
    selectItem = (item)=> {
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
    changeData = ()=>{
        this.setState((state,props)=>{
            state.keyword = this.searchInput.current.value;
            state.menuList = state.data.filter(item=>{
                return item[props.displayName].includes(state.keyword);
            });
            return state;
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot){
       
    }
    render() {
        return (<>
            <div className={`select_field ${this.props.focused || (!this.props.multiply)&&this.props.value !== "" || (this.props.multiply)&&(this.props.value.length) ? "active" : ""}`} onClick={() => this.handleClick()}>
                {this.props.label ? <label>{this.props.label}</label> : ""}

                <div className="selected_box">
                    {this.state.selectItem.map((item, idx) => (
                        <SelectedItem key={idx} data={item} displayName={this.props.displayName}/>
                    ))}
                    <SearchInput ref={this.searchInput} value={this.state.keyword} onChange={this.changeData} onKeyPress={this.deleteItem} />
                </div>

                <div className={`select_menu_control ${this.props.focused ? "open" : ""}`}>
                    <i className="iconfont icon-selectup"></i>
                </div>
            </div>
            <SelectMenu show={this.props.focused} data={this.state.menuList}  displayName={this.props.displayName} selectItem={this.selectItem} />
        </>)
    }
}
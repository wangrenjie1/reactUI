import React,{ Component } from 'react';
import SearchInput from "./Input.js";
import SelectMenu from "./Menu.js";
import http from "@core/http.js";
export default class extends Component{
    constructor(props){
        super(props);
        this.searchInput = null;
        this.state = {
            data:[],
            keyword:"",
            selectItems:[]
        }
    }
    handleClick(){
        if (this.props.focused) {
            this.props.onBlur();
            this.searchInput.blur();
            this.setState({keyword:""});
        } else {
            this.props.onFocus();
            this.searchInput.focus();
        }
    }
    getData(){
        return new Promise((resolve,reject)=>{
            http.get(this.props.url,{keyword:this.state.keyword}).then((res)=>{
                resolve(res)
            }).catch(err=>{
                reject(err);
            })
        })
    }
    initMenu = async ()=>{
        let res = await this.getData();
        let data = []
        if(this.props.analysis){
            data = this.props.analysis(res);
        }
        this.setState((state,props)=>({data}))
    }
    changeData = ()=>{
        this.setState((state,props)=>{
            state.keyword = this.searchInput.value;
            return state;
        },this.initMenu)
    }
    selectItem = (item)=>{
        this.setState((state,props)=>{
            state.selectItems[0] = item;
            state.keyword = "";
            state.data = [];
            return state;
        },()=>{
            this.props.onBlur();
            if(!this.props.selectItem){return};
            if(typeof this.props.selectItem ==  'function'){
                this.props.selectItem(item);
            }
        });
    }
    render(){
        return(<>
            <div className={`select_field ${this.props.focused || this.state.selectItems.length ? "active" : ""}`} onClick={() => this.handleClick()}>
                {this.props.label ? <label>{this.props.label}</label> : ""}
                <div className="selected_box">
                    {   
                        this.state.selectItems.map((item, idx) => (
                            <span className="selected_box_comma" key={idx}>
                                <span className="selected_box_comma_content">
                                    {item[this.props.displayName]}
                                </span>
                            </span>
                        ))
                    }
                    <SearchInput el={el=>this.searchInput = el} onChange={this.changeData} value={this.state.keyword}/>
                </div>
            </div>
            <SelectMenu show={this.props.focused&&this.state.data.length} data={this.state.data} displayName={this.props.displayName} selectItem={this.selectItem}/>
        </>)
    }
}
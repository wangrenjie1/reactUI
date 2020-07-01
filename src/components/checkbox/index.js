import React, { Component } from 'react';
import "./index.scss";
import _ from "lodash";
export default class extends Component {
    static defaultProps = {
        data: []
    }
    constructor(props) {
        super(props);
        let resource = _.cloneDeep(this.props.data);
        this.state = {
            data: resource.map(item => {
                if(this.props.value.length&&this.props.value.indexOf(item.value)>-1){
                    item._checked = true;
                }else{
                    item._checked = false;
                }
                return item;
            })
        }
    }
    getCheckItems(){
        return this.state.data.filter(item=>item._checked);
    }
    handleChange = (i,e)=>{
        e.persist();
        this.setState((state,props)=>{
            state.data[i]._checked = e.target.checked;
            return state;
        },(state,props)=>{
            let selectedTtems = this.state.data.filter(item=>item._checked);
            if(this.props.field){this.props.field.context[this.props.field.key] = selectedTtems;}
            this.props.onChange(this.props.name,selectedTtems.map(item=>item[this.props.displayValue]));
        })

    }
    render() {
        if (!this.props.data.length) {
            return null;
        }
        return (
            <div className="checkbox_field">
            {this.props.label?<label>{this.props.label}</label>:""}
                {
                    this.state.data.map((item,index)=>(
                        <div className="checkbox_field_item" key={index}>
                            <input 
                            type="checkbox" 
                            disabled={this.props.disabled}
                            onChange={(e)=>{this.handleChange(index,e)}}
                            checked={item._checked} 
                            name={item[this.props.name]} 
                            value={item[this.props.displayValue]} />
                            <span className="checkbox_field_item__name">{item[this.props.displayName]}</span>
                            <i className={`iconfont ${this.props.disabled?"icon-jinyong":"icon-duigou"}`}></i>
                        </div>)
                    )
                }
            </div>
        )
    }
}
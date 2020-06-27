import React,{ Component } from 'react';
import "./index.scss";
import _ from "lodash";
export default class extends Component {
    static defaultProps = {
        data: []
    }
    constructor(props){
        super(props);
        let resource = _.cloneDeep(this.props.data);
        this.state = {
            data: resource.map(item => {
                if(this.props.value !== undefined && item[this.props.displayValue] === this.props.value){
                    item._checked = true;
                }else{
                    item._checked = false;
                }
                return item;
            })
        }
        // console.log(this.state.data)
    }
    handleChange = (i,e)=>{
        e.persist();
        this.setState((state,props)=>{
            state.data.forEach(item=>{
                item._checked = false;
            })
            state.data[i]._checked = e.target.checked;
            return state;
        },()=>{
            let seletedItem = this.state.data.find(item=>item._checked);
            this.props.onChange(this.props.name,seletedItem[this.props.displayValue]);
        })
    }
    render(){
        if (!this.props.data.length) {
            return null;
        }
        return (
            <div className="radio_field">
            {this.props.label?<label>{this.props.label}</label>:""}
                {
                    this.state.data.map((item,index)=>( 
                        <div className="radio_field_item" key={index}>
                            <input 
                            type="radio" 
                            checked={item._checked} 
                            disabled={this.props.disabled}
                            name={this.props.name}
                            value={item[this.props.displayValue]}
                            onChange={(e)=>{this.handleChange(index,e)}}
                            />
                            <span className="radio_field_item__name">{item[this.props.displayName]}</span>
                            <i className="iconfont icon-radio_button_checked_px_rounded"></i>
                        </div>)
                    )
                }
            </div>
        )
    }
}
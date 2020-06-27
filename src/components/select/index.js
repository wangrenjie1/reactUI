import React,{Component,Fragment} from 'react';
import "./index.scss";

export default class extends Component {
    static defaultProps = {

    }
    constructor(props){
        super(props);
        this.selectItem = [];
    }
    handleClick(){
        if(this.props.focused){
            this.props.onBlur();
        }else{
            this.props.onFocus();
        }
    }
    handleSelected(item){
        //修改 内部state的 selectItem
        //修改 value值 （注意多选单选）
        console.log(item)
    }
    render(){
        return(<>
            <div className={`select_field ${this.props.focused||this.props.value!="" ? "active" : ""}`} onClick={()=>this.handleClick()}>
                {this.props.label ? <label>{this.props.label}</label> : ""}
                <div className="selected_box">
                </div>
                <div className="select_menu_control">
                    <i className="iconfont icon-selectup"></i>
                </div>
                {this.props.focused?
                    <div className="select_menu">
                        <div className="select_menu_list">
                            {this.props.data.map((item,index)=>(<Fragment key={index}>
                                <div className="select_menu_item" onClick={()=>this.handleSelected(item)}>
                                <div className="select_menu_item_content">{item[this.props.displayName]}</div>
                                </div>
                            </Fragment>))}
                        </div>
                    </div>:""
                }
            </div>
            
        </>)
    }
}
import React,{ Component,Fragment} from 'react';

export default class extends Component{
    constructor(props){
        super(props)
    }
    render(){
        if(!this.props.show){
            return null;
        }
        return(<div className="select_menu">
            <div className="select_menu_list">
                {
                    this.props.data.map((item, index) => (
                        <Fragment key={index}>
                            <div className={`select_menu_item ${item._checked?"selected":""}`} onClick={() => this.props.selectItem(item)}>
                                <div className="select_menu_item_content">{item[this.props.displayName]}</div>
                            </div>
                        </Fragment>)
                    )
                }
            </div>
        </div>)
    }
}
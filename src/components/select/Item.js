import React from "react";
function Item(props){
    return(
        <span className="selected_box_comma">
            <span className="selected_box_comma_content">
                {props.data[props.displayName]}
            </span>
        </span>
    )
}
export default Item;
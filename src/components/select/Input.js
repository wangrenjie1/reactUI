import React,{ forwardRef } from "react";

const SearchInput = forwardRef((props,ref)=>(<input ref={ref} value={props.value} className="selected_search" onChange={props.onChange} onKeyDown={props.onKeyPress} type="text"/>))
// function SearchInput(props){
//     return (<input className="selected_search" onChange={el=>props.onChange(el.value)} type="text"/>)
// }
export default SearchInput;
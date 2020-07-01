import React,{ forwardRef } from 'react';

function SearchInput(props){
    return (<input className="selected_search" ref={props.el} type="text" onChange={props.onChange} value={props.value} />)
}

export default SearchInput;
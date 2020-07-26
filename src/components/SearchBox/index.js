import React from "react";
import "./style.css"

function SearchBox(props) {
    const { value, handleInputChange} = props;
    return (
        <form>
            <input 
                className="form-control"
                type="text" 
                aria-label="Search"
                placeholder="Search..."
                value={value}
                onChange={handleInputChange}
                >
            </input>
        </form>
    )
}

export default SearchBox;
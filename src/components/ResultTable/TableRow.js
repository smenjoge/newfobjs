import React from "react";
import "./style.css";

function TableRow (props) {
    const {id, name, image, phone, email, dob} = props;
    return (
        <tr key={id}>
            <td className="w-25">
                <img src={image} className="img-fluid img-thumbnail" alt={name}></img>
            </td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>{dob}</td>
        </tr>
    )
};

export default TableRow;
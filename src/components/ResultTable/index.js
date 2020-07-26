import React from "react";
import "./style.css";
import TableRow from "./TableRow";

function ResultTable(props) {
    const {employees, sortColumn } = props;
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col" onClick={() => sortColumn("Name")}>Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">E-mail</th>
                                <th scope="col" onClick={() => sortColumn("DOB")}>DOB</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => 
                                <TableRow 
                                    key={employee.id.value}
                                    name={`${employee.name.first} ${employee.name.last}`}
                                    image={employee.picture.medium}
                                    phone={employee.phone}
                                    email={employee.email}
                                    dob={new Date(employee.dob.date).toLocaleDateString()}
                                />
                            )}
                        </tbody>
                    </table>   
                </div>
            </div>
        </div>
    )
}

export default ResultTable;
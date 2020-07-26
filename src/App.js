import React from 'react';
import "./components/Jumbotron";
import Jumbotron from "./components/Jumbotron";
import SearchBox from "./components/SearchBox";
import ResultTable from "./components/ResultTable";
import API from "./utils/API";

let sortOrderName;
let sortOrderDOB;
let resultsAll = [];

class App extends React.Component {
  state = {
    search: "",
    resultsVis: []
  }

  componentDidMount() {
    API.getEmployees()
    .then(response => {
       resultsAll = response.data.results;
       this.setState({resultsVis: resultsAll})
     })
    .catch(err => console.log(err));
    // let response = API.getEmployees();
    // resultsAll = response.results;
    // this.setState({resultsVis: resultsAll})
  };

  handleInputChange = event => {
    let searchInput = event.target.value;
    let searchTerm = searchInput.toLowerCase();
    let filterEmployees = [];

    if (searchInput !== "") {
      filterEmployees =  resultsAll.filter(employee => 
        employee.name.first.toLowerCase().includes(searchTerm)  ||
        employee.name.last.toLowerCase().includes(searchTerm)  ||
        employee.email.toLowerCase().includes(searchTerm)  ||
        employee.phone.toLowerCase().includes(searchTerm)  ||
        new Date(employee.dob.date).toLocaleDateString().includes(searchTerm)
      )
    } else {
      filterEmployees = resultsAll
    }
    this.setState({search: searchInput})
    this.setState({resultsVis: filterEmployees})
  }

  sortColumn = (sortBy) => {
    let employeesArr = this.state.resultsVis;

    if (sortBy === "DOB") {
      if (!sortOrderDOB || sortOrderDOB === "desc") {
        sortOrderDOB = "asc"
      } else {
        sortOrderDOB = "desc"
      }
      employeesArr.sort((emp1, emp2) => {
        let emp1DOB = emp1.dob.date;
        let emp2DOB = emp2.dob.date;

        if (sortOrderDOB === "asc") {
          if (emp1DOB < emp2DOB) { return -1} 
          if (emp1DOB > emp2DOB) {return 1} 
        } else if (sortOrderDOB === "desc") {
          if (emp1DOB < emp2DOB) { return 1} 
          if (emp1DOB > emp2DOB) {return -1} 
        }
        return 0;
      })
    }

    if (sortBy === "Name") {
      if (!sortOrderName || sortOrderName === "desc") {
        sortOrderName = "asc"
      } else {
        sortOrderName = "desc"
      }
      employeesArr.sort((emp1, emp2) => {
        let emp1FullName = emp1.name.first + " " + emp1.name.last;
        let emp1Name = emp1FullName.toLowerCase();
        let emp2FullName = emp2.name.first + " " + emp2.name.last;
        let emp2Name = emp2FullName.toLowerCase();
  
        if (sortOrderName === "asc") {
          if (emp1Name < emp2Name) { return -1} 
          if (emp1Name > emp2Name) {return 1} 
        } else if (sortOrderName === "desc") {
          if (emp1Name < emp2Name) { return 1} 
          if (emp1Name > emp2Name) {return -1} 
        }
        return 0;
      })
    }
    this.setState({resultsVis: employeesArr})    
  }
  
  render() {
    return (
      <div>
        <Jumbotron />
        <SearchBox 
          value={this.state.search}
          handleInputChange={this.handleInputChange}
        />
        <ResultTable 
          employees={this.state.resultsVis}
          sortColumn={this.sortColumn}
        />
      </div>
    );
  }
}

export default App;

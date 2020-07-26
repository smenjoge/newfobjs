import axios from "axios";
// import EmployeeData from "../employeeData.json";

const API_URL = "https://randomuser.me/api/?results=20&nat=us";

export default {
    getEmployees: async function () {
        let apiResp = await axios.get(API_URL);
        return apiResp;
    } 
    // getEmployees: function getEmployees() {
    //     return EmployeeData;
    // } 
};
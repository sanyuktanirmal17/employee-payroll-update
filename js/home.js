/**
 *  to save the employee details. It fetches the details  stores in employeePayrollData object
 */
 function save() {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        console.error(e);
    }
}

/**
 *  to create and update employee details to local storage
 */
function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

/**
 *  to add employee details to 
 *  object
 * @returns employeePayrollObject
 */
function createEmployeePayroll() {
    let employeePayrollData = new EmployeePayrollData();
    employeePayrollData.name = document.forms["form"]["name"].value;
    employeePayrollData.profile = document.forms["form"]["profile"].value;
    employeePayrollData.gender = document.forms["form"]["gender"].value;
    const checkboxes = document.querySelectorAll(`input[name="department"]:checked`);
    let department = [];
    checkboxes.forEach((checkbox) => {
        department.push(checkbox.value);
    });
    employeePayrollData.department = department;
    employeePayrollData.salary = document.forms["form"]["salary"].value;
    let day = document.forms["form"]["day"].value;
    let month = document.forms["form"]["month"].value;
    let year = document.forms["form"]["year"].value;
    let date = `${day}-${month}-${year}`;
    let notes = document.forms["form"]["notes"].value;
    employeePayrollData.startDate = parseDate(date);
    console.log(employeePayrollData.toString());
    return employeePayrollData;
}

/**
 * Function to convert date type
 * @param {*} s 
 * @returns 
 */
function parseDate(s) {
    var months = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11
    };
    var p = s.split('-');
    return new Date(p[2], months[p[1].toLowerCase()], p[0]);
}

/**
 * To set Event Listeners when Document
*/
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output-text');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
})

/**
 *  reset the form 
 * on clicking reset
 */
const resetForm = () => {
    setValue('#name', '');
    unSetSelectedValues('[name=profile]');
    unSetSelectedValues('[name=gender]');
    unSetSelectedValues('[name=department]');
    setValue('#salary', '');
    setTextValue('#salaryOutput', '400000');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');
}

const unSetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
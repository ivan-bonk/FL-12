// Symbols for ReadOnly properties 
const _age = Symbol('age');
const _fullName = Symbol('fullName');
const _managedEmployees = Symbol('managedEmployees');

class Employee {
    constructor(info) {
        this.id = info.id;
        this.firstName = info.firstName;
        this.lastName = info.lastName;
        this.birthday = info.birthday;
        this.salary = info.birthday;
        this.position = info.position;
        this.department = info.department;
        this[_age] = this.countAge(this.birthday);
        this[_fullName] = `${this.firstName} ${this.lastName}`;
        Employee.EMPLOYEES.push(this);
    }

   static EMPLOYEES = [];
    
    get age() {
        return this[_age];
    }


    get fullName() {
        return this[_fullName];
    }

    countAge(birth) { 
        const today = new Date();
        const birthDate = birth.split('/');
        let age = today.getFullYear() - birthDate[2];
        const month = today.getMonth() - birthDate[1];
        if(month < 0 || (month === 0 && today.getDay() < birthDate[0] )){
            age--;
        }
        return age;
    }

    quit() {
        Employee.EMPLOYEES.splice(Employee.EMPLOYEES.indexOf(this), 1);
    }

    retire() {
        console.log('It was such a pleasure to work with you!');
        this.quit();
    }

    getFired() {
        console.log('Not a big deal!');
        this.quit();
    }

    changeDepartment(newDepartment) {
        this.department = newDepartment;
    }

    changePosition(newPosition) {
        this.position = newPosition;
    }

    changeSalary(newSalary) {
        this.salary = newSalary;
    }

    getPromoted(benefits) { 
        this.editProfile(benefits, 'Yoohooo');
    }

    getDemoted(punishment) {
        this.editProfile(punishment, 'Damn!');
    }

    editProfile(actrion, word) {
        if(actrion.hasOwnProperty('salary')){
            this.changeSalary(actrion.salary);
            console.log(word);
        }
        if(actrion.hasOwnProperty('position')) {
            this.changePosition(actrion.position);
            console.log(word);
        }
        if(actrion.hasOwnProperty('department')) {
            this.changePosition(actrion.department);
            console.log(word);
        }
    }
}

class Manager extends Employee{
    constructor(info){
        super(info);
        this.position = 'manager';
        this[_managedEmployees] = this.findManagedEmpl();
    }

    get managedEmployees() {
        return this[_managedEmployees];
    }

    findManagedEmpl() {   // not so good variant
        let listOfEmpl = [];
        for(let emp of Employee.EMPLOYEES) {
            if(emp.department === this.department && emp.position !== this.position) {
                listOfEmpl.push(emp);
            }
        }
        return listOfEmpl;
    }
}

class BlueCollarWorker extends Employee {

}

class HRManager extends Manager {
    constructor(info) {
        super(info);
        this.department = 'hr';
    }
}
class SalesManager extends Manager {
    constructor(info) {
        super(info);
        this.department = 'sales';
    }
}

function managerPro(manager, promoution) {
    if(manager instanceof Manager) {
        Object.assign(manager, promoution());
    }
}

function promoter() {
    function promote(empIndex, salary) {
        this[_managedEmployees][empIndex].salary = salary;
        console.log(Yoohooo);
    }
    return {
        promote
    }
}


const salesManager = new SalesManager({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 5000
});

const blueCollarWorkerOne = new BlueCollarWorker({
    id: 3,
    firstName: 'Mary',
    lastName: 'Doe',
    birthday: '12/02/1995',
    salary: 5000,
    position: 'office worker',
    department: 'sales'
});
const hrManager = new HRManager({
    id: 2,
    firstName: 'Bob',
    lastName: 'Doe',
    birthday: '28/08/1990',
    salary: 5000,
    department: 'sales'
});
const blueCollarWorkerTwo = new BlueCollarWorker({
    id: 4,
    firstName: 'Jane',
    lastName: 'Doe',
    birthday: '16/12/1987',
    salary: 5000,
    position: 'office worker',
    department: 'hr'
});

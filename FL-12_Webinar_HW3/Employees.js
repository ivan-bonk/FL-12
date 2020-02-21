// Symbols for ReadOnly properties 
const _age = Symbol('age');
const _fullName = Symbol('fullName');

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

    countAge(birth) {  // does not work correct
        const today = new Date();
        const birthDate = new Date(birth); 
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if(month < 0 || (month === 0 && today.getDay() < birthDate.getDay() )){
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

    getPromoted(benefits) { //think about better algorithm
        if(benefits.hasOwnProperty('salary')){
            this.changeSalary(benefits.salary);
            console.log('Yoohooo');
        }
        if(benefits.hasOwnProperty('position')) {
            this.changePosition(benefits.position);
            console.log('Yoohooo');
        }
        if(benefits.hasOwnProperty('department')) {
            this.changePosition(benefits.department);
            console.log('Yoohooo');
        }
    }

    getDemoted(punishment) {
        if(punishment.hasOwnProperty('salary')){
            this.changeSalary(punishment.salary);
            console.log('Damn!');
        }
        if(punishment.hasOwnProperty('position')) {
            this.changePosition(punishment.position);
            console.log('Damn!');
        }
        if(punishment.hasOwnProperty('department')) {
            this.changePosition(punishment.department);
            console.log('Damn!');
        }
    }
}

class Manager extends Employee{
    constructor(info){
        super(info);
        this.position = 'manager';
        if(this.department === 'hr' || this.department === 'sales'){  //does not work, rewrite !
            Manager.managedEmployees.push(this);
        }
    }
    static managedEmployees = [];
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


const salesManager = new SalesManager({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    birthday: '10/04/1994',
    salary: 5000
});
const hrManager = new HRManager({
    id: 2,
    firstName: 'Bob',
    lastName: 'Doe',
    birthday: '28/08/1990',
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
const blueCollarWorkerTwo = new BlueCollarWorker({
    id: 4,
    firstName: 'Jane',
    lastName: 'Doe',
    birthday: '16/12/1987',
    salary: 5000,
    position: 'office worker',
    department: 'hr'
});

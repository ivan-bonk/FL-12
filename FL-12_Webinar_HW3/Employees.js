class Employee {
    constructor(info) {
        this.id = info.id;
        this.firstName = info.firstName;
        this.lastName = info.lastName;
        this.birthday = info.birthday;
        this.salary = info.birthday;
        this.position = info.position;
        this.department = info.department;
        Employee._EMPLOYEES.push(this);
    }

   static _EMPLOYEES = [];

   static get EMPLOYEES() {
       return this._EMPLOYEES;
   }
    
    get age() {
        const today = new Date();
        const birthDate = this.birthday.split('/');
        let age = today.getFullYear() - birthDate[2];
        const month = today.getMonth() - birthDate[1];
        if(month < 0 || (month === 0 && today.getDay() < birthDate[0] )){
            age--;
        }
        return age;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    quit() {
        Employee._EMPLOYEES.splice(Employee._EMPLOYEES.indexOf(this), 1);
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
        } else {
            console.log('Something went wrong');
        }
    }
}

class Manager extends Employee{
    constructor(info){
        super(info);
        this.position = 'manager';
    }

    get managedEmployees() {
        let list = [];
        Employee._EMPLOYEES.forEach((emp) => {
            if(emp.department === this.department && emp.position !== 'manager'){
                list.push(emp);
            }
        })
        return list;
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

function ManagerPro(manager, ability) {
    if (manager instanceof Manager) {
        return Object.assign(manager, ability());
    }
}

const promoter = () => ({
    promote(id, salary) {
        if(this.managedEmployees[id]) {
            this.managedEmployees[id].changeSalary(salary);
        }
    },
    raise(id, position) {
        if(this.managedEmployees()[id]) {
            this.managedEmployees()[id].changePosition(position);
        }
    },
    redirect(id, department) {
        if(this.managedEmployees()[id]) {
            this.managedEmployees()[id].changeDepartment(department);
        }
    },
    toFired(id) {
        if(this.managedEmployees()[id]){
            this.managedEmployees()[id].getFired();
        }
    },
    toRetire(id) {
        if(this.managedEmployees()[id]){
            this.managedEmployees()[id].retire();
        }
    },
    name(id) {
        if(this.managedEmployees[id]){
            return this.managedEmployees[id].fullName; 
        }
    }
});




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

const blueCollarWorkerOne = new BlueCollarWorker({
    id: 3,
    firstName: 'Mary',
    lastName: 'Doe',
    birthday: '12/02/1995',
    salary: 5000,
    position: 'office worker',
    department: 'sales'
});
import Component from './Component';

export default class Leaf extends Component {
    constructor(info) {
        super(info);
    }

    draw() {
        return super.drawLeaf();
    }
    getInfo() {
        return {
            salary: this.salary,
            performance: this.performance,
            last_vacation_date: this.last_vacation_date
        }
    }

    filterPerf(value) {
        if (this.performance === value) {
            return this
        } else return false;
    }
}
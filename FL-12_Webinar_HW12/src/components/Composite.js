import Component from './Component';

export default class Composite extends Component {
    constructor(info) {
        super(info);
        this.pool_name = info.pool_name;
        this.children = [];
    }

    add(component) {
        this.children.push(component)
    }

    getInfo() {
        let salarySum = 0;
        let dateSum = 0;
        let performance = {
            'top': 0,
            'average': 0,
            'low': 0
        }

        this.children.forEach((el) => {
            salarySum += el.getInfo().salary;
            dateSum += this.parseDate(el.getInfo().last_vacation_date);
            performance[el.getInfo().performance]++;
        })

        return {
            salary: salarySum / this.children.length,
            last_vacation_date: this.dateToString(dateSum / this.children.length),
            performance: this.getBigger(performance)

        }
    }

    filterPerf(value) {
        this.children.forEach((el) => {
            const filtered = el.filterPerf(value);
            if (!filtered || filtered.children !== undefined &&
                filtered.children.length === 0) {
                this.removeChild(el)
            }
        });

        return this
    }

    removeChild(element) {
        const idx = this.children.indexOf(element);
        this.children = [
            ...this.children.slice(0, idx),
            ...this.children.slice(idx + 1)
        ];
    }
}
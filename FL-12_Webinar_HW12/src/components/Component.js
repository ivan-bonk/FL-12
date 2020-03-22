export default class Component {
    constructor(info) {
        this.id = info.id;
        this.rm_id = info.rm_id;
        this.name = info.name;
        this.performance = info.performance;
        this.last_vacation_date = info.last_vacation_date;
        this.salary = info.salary;
    }

    drawLeaf() {
        const html = document.createElement('div');
        html.classList.add('leaf_item');
        html.innerHTML = `
                <div class="id">ID: ${this.id}</div> 
                <div class="rm_id">RM ID: ${this.rm_id}</div> 
                <div class="name">Name: ${this.name}</div>
                <div class="salary">Salary: ${this.salary}</div>
                <div class="perform">Performance: ${this.performance}</div>
                <div class="vacation">Last vacation date: ${this.last_vacation_date}</div>`;
        return html;
    }

    parseDate(date) {
        const buff = date.split('.');
        const parser = Date.parse(`${buff[2]} ${buff[1]} ${buff[0]}`);
        return parser;
    }

    dateToString(time) {
        const date = new Date(time);
        const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
        const day = (date.getDay() + 1) < 10 ? `0${date.getDay() + 1}` : date.getDay() + 1;
        return `${date.getFullYear()}.${month}.${day}`
    }

    getBigger(obj) {
        if (obj.top > obj.average && obj.top > obj.low) {
            return 'top';
        }
        if (obj.average > obj.top && obj.average > obj.low) {
            return 'average';
        }

        if (obj.low > obj.average && obj.low > obj.average) {
            return 'low';
        } else {
            return 'average';
        }
    }

}
import Strategy from './Strategy';

export default class StrategyShowUnits extends Strategy {

    use(data) {
        return this.draw(data);

    }

    draw(data) {
        const block = this.addBlock(data);
        const average = document.createElement('div');
        average.classList.add('average');
        average.innerHTML = `
        <div class="average_salary">
            Average Salary: ${Math.floor(data.getInfo().salary)}
        </div>
        <div class="average_vacation">
            Average Last Vacation Date: ${data.getInfo().last_vacation_date}
        </div>
        <div class="average_perform">
            Average Performance: ${data.getInfo().performance}
        </div>
        `;

        block.append(average);
        data.children.forEach((el) => {
            if (el.pool_name) {
                block.append(this.draw(el));
            }
        });

        return block;
    }
}
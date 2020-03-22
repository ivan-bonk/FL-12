import Strategy from './Strategy';

export default class StrategyShowPerf extends Strategy {
    constructor(value) {
        super();
        this.value = value;
    }

    use(data) {
        data = data.filterPerf(this.value);
        return this.draw(data);
    }
}

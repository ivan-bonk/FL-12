import Strategy from './Strategy';

export default class StrategyShowAll extends Strategy {

    use(data) {
        return this.draw(data);
    }
}
export default class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    useStrategy(data) {
        return this.strategy.use(data);
    }
}
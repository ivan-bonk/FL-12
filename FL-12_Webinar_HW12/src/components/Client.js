import Context from '../Strategy/Context';
import StrategyShowAll from '../Strategy/StrategyShowAll';
import StrategyShowUnits from '../Strategy/StrategyShowUnits';
import StrategyShowPerf from '../Strategy/StrategyShowPerf';

import Composite from './Composite';
import Leaf from './Leaf';

export default class Client {
    constructor(data) {
        this.data = data;
        this.root = new Composite(this.data[0])
    }

    start() {
        this.buildTree(this.root);
    }

    render(action, value = null) {
        this.start();
        const context = new Context(new StrategyShowAll());

        if (action === 'all') {
            context.setStrategy(new StrategyShowAll());
        }
        if (action === 'units') {
            context.setStrategy(new StrategyShowUnits());
        }
        if (action === 'performance') {
            context.setStrategy(new StrategyShowPerf(value));
        }

        const root = document.getElementById('root');
        root.append(context.useStrategy(this.root));
    }

    clean() {
        const root = document.getElementById('root');
        root.innerHTML = '';
        this.root = new Composite(this.data[0]);
    }

    buildTree(RMItem) {
        const items = this.data.filter((el) => {
            return el.rm_id === RMItem.id
        });

        items.forEach((el) => {
            if (el.pool_name) {
                const comp = new Composite(el)
                RMItem.add(comp)
                this.buildTree(comp);
            } else {
                RMItem.add(new Leaf(el));
            }
        });
    }
}

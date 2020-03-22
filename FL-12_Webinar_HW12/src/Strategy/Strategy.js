export default class Strategy {
    addBlock(data) {
        const block = document.createElement('div');
        block.classList.add('pool');

        const div = data.drawLeaf();
        div.classList.add('RM');

        const pool = document.createElement('h3');
        pool.innerText = data.pool_name;

        div.prepend(pool);
        block.append(div);

        return block;
    }

    draw(data) {
        const block = this.addBlock(data);
        data.children.forEach((el) => {
            if (el.pool_name) {
                block.append(this.draw(el));
            } else {
                block.append(el.draw());
            }
        });
        return block;
    }
}
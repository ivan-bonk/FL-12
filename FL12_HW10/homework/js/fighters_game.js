function Fighter(obj) {
    const name = obj.name, 
        damage = obj.damage, 
        totalHp = obj.hp, 
        strength = obj.strength, 
        agility = obj.agility,
        HNDRT = 100;
    let hp = obj.hp,
        win = 0,
        loss = 0;

    function attack(defender) {
        if(Math.random() * HNDRT >= defender.getAgility() + defender.getStrength()){
            defender.dealDamage(this.getDamage());
            console.log(`${this.getName()} makes ${this.getDamage()} damage to ${defender.getName()}`);
        } else {
            console.log(`${defender.getName()} attack missed`);
        }
    }

    function heal(val) {
        hp + val > totalHp ? hp = totalHp : hp += val;
    }
    function dealDamage(val) {
        hp - val < 0 ? hp = 0 : hp -= val;
    }

    return {
        getName: () => name,
        getDamage: () => damage,
        getHealth: () => hp,
        getStrength: () => strength,
        getAgility: () => agility,
        logCombatHistory: () => 
        console.log(`Name: ${name}, Wins: ${win}, Losses: ${loss}`),
        heal,
        dealDamage,
        addWin: () => win++,
        addLoss: () => loss++,
        attack
    }
}

function battle(fighter1, fighter2) {
    const HALF = 0.5;

    if(fighter1.getHealth() > 0 && fighter2.getHealth() > 0) {

        while(fighter1.getHealth() > 0 && fighter2.getHealth() > 0){
            Math.random() < HALF ? fighter1.attack(fighter2) : fighter2.attack(fighter1);
        }
        if(fighter1.getHealth()) {
            fighter1.addWin();
            fighter2.addLoss();
            console.log(`${fighter1.getName()} has won!`);
        } else if(fighter2.getHealth()) {
            fighter2.addWin();
            fighter1.addLoss();
            console.log(`${fighter2.getName()} has won!`);
        } else {
            console.log('Something went wrong');
        }
        fighter1.logCombatHistory();
        fighter2.logCombatHistory();
    } else {
        if(fighter1.getHealth()) {
            console.log(`${fighter2.getName()} is dead and can't fight`);
        } else {
            console.log(`${fighter1.getName()} is dead and can't fight`);
        }
    }
}


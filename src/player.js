export default class Player {
    constructor(enemyBoard, isComputer = false) {
        this.enemyGameboard = enemyBoard;
        this.isComputer = isComputer;
        this.prevAttacks = [];
    }
    attack(guess) {
        let hit;
        if (guess) {
            hit = this.ifPlayer(guess);
        } else if (this.isComputer === false) {
            throw "player must provide guess coordinates";
        } else {
            hit = this.ifComputer();
        }
        return hit;
    }
    ifComputer() {
        let loop = true;
        while (loop) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let guess = [x, y];
            if (this.checkDuplicate(guess)) {
                continue;
            } else {
                loop = false;
                return [this.makeAttack(guess), guess];
            }
        }
    }

    ifPlayer(guess) {
        if (this.checkDuplicate(guess)) {
            throw `${guess} has already been guessed!`;
        }
        return this.makeAttack(guess);
    }

    makeAttack(guess) {
        this.prevAttacks.push(guess);
        return this.enemyGameboard.receiveAttack(guess);
    }

    checkDuplicate(guess) {
        return this.prevAttacks.some(ele => (ele[0] === guess[0] && (ele[1] === guess[1])));
    }
}
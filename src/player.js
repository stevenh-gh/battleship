export default class Player {
    constructor(enemyBoard, isComputer = false) {
        this.enemyGameboard = enemyBoard;
        this.isComputer = isComputer;
        this.prevAttacks = [];
    }
    attack(guess) {
        if (guess) {
            this.ifPlayer(guess);
        } else if (this.isComputer === false) {
            throw "player must provide guess coordinates";
        } else {
            this.ifComputer();
        }
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
                this.makeAttack(guess);
                loop = false;
            }
        }
    }

    ifPlayer(guess) {
        if (this.checkDuplicate(guess)) {
            throw `${guess} has already been guessed!`;
        }
        this.makeAttack(guess);
    }

    makeAttack(guess) {
        this.prevAttacks.push(guess);
        this.enemyGameboard.receiveAttack(guess);
    }

    checkDuplicate(guess) {
        return this.prevAttacks.some(ele => (ele[0] === guess[0] && (ele[1] === guess[1])));
    }
}
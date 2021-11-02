export default class Player {
    constructor(enemyBoard, isComputer = false) {
        this.enemyGameboard = enemyBoard;
        this.isComputer = isComputer;
        this.prevAttacks = [];
    }
    attack(guess) {
        if (guess) {
            if (this.prevAttacks.some(ele => (ele[0] === guess[0] && (ele[1] === guess[1])))) {
                throw `${guess} has already been guessed!`
            }
            this.prevAttacks.push(guess);
            this.enemyGameboard.receiveAttack(guess);
        } else if (this.isComputer === false) {
            throw "player must provide guess coordinates";
        } else {
            this.prevAttacks.push([5, 5]);
        }
    }
}
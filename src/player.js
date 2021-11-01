export default class Player {
    constructor(enemyBoard, isComputer = false) {
        this.enemyGameboard = enemyBoard;
        this.isComputer = isComputer;
    }
    attack(guess) {
        this.enemyGameboard.receiveAttack(guess);
    }
}
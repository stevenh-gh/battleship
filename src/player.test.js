import Gameboard from "./gameboard";
import Player from "./player";
import Ship from "./ship";

describe("player", () => {
    it("should be instance of player", () => {
        // arrange
        let player;
        // act
        player = new Player();
        // assert
        expect(player instanceof Player).toBeTruthy();
    })
    it("can be a computer player", () => {
        // arrange
        let player;
        // act
        player = new Player(null, true);
        // assert
        expect(player.isComputer).toBeTruthy();
    })
    it("default is not a computer", () => {
        // arrange
        let player;
        // act
        player = new Player();
        // assert
        expect(player.isComputer).toBeFalsy();
    })
    it("takes an enemy gameboard", () => {
        // arrange
        let player;
        let enemyGameboard = new Gameboard();
        // act
        player = new Player(enemyGameboard);
        // assert
        expect(player.enemyGameboard instanceof Gameboard).toBeTruthy();
    })
    it("can make an attack", () => {
        // arrange
        let player;
        let enemyGameboard = new Gameboard();
        let enemyShip1 = new Ship(2);
        let enemyShip2 = new Ship(3);
        let enemyShip3 = new Ship(4);
        enemyGameboard.placeShip(enemyShip1, [1, 5]);
        enemyGameboard.placeShip(enemyShip2, [2, 8], 1);
        enemyGameboard.placeShip(enemyShip3, [5, 3]);
        player = new Player(enemyGameboard);
        let guessCoord = [4, 3];
        // act
        player.attack(guessCoord);
        // assert
        expect(player.enemyGameboard.missed).toEqual(expect.arrayContaining([
            [4, 3]
        ]));
    })
    it("can make an attack", () => {
        // arrange
        let player;
        let enemyGameboard = new Gameboard();
        let enemyShip1 = new Ship(2);
        let enemyShip2 = new Ship(3);
        let enemyShip3 = new Ship(4);
        enemyGameboard.placeShip(enemyShip1, [1, 5]);
        enemyGameboard.placeShip(enemyShip2, [2, 8], 1);
        enemyGameboard.placeShip(enemyShip3, [5, 3]);
        player = new Player(enemyGameboard);
        let guessCoord = [4, 8];
        // act
        player.attack(guessCoord);
        // assert
        expect(enemyShip2.hits).toEqual(expect.arrayContaining([
            [4, 8]
        ]));
    })
})
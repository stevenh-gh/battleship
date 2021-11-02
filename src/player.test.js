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
    it("should keep track of used attacks", () => {
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
        expect(player.prevAttacks).toEqual(expect.arrayContaining([
            [4, 8]
        ]));
    })
    it("should not allow previous attacks to be used", () => {
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
        expect(() => player.attack(guessCoord)).toThrow();
    })
    it("should not allow previous attacks to be used (when prevAttacks have length > 1)", () => {
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
        // act
        player.attack([3, 3]);
        player.attack([4, 9]);
        player.attack([1, 7]);
        // assert
        expect(() => player.attack([4, 9])).toThrow();
    })
    it("if computer, attack() should take no params", () => {
        // arrange
        let computer;
        let enemyGameboard = new Gameboard();
        let enemyShip1 = new Ship(2);
        let enemyShip2 = new Ship(3);
        let enemyShip3 = new Ship(4);
        enemyGameboard.placeShip(enemyShip1, [1, 5]);
        enemyGameboard.placeShip(enemyShip2, [2, 8], 1);
        enemyGameboard.placeShip(enemyShip3, [5, 3]);
        computer = new Player(enemyGameboard, true);
        // act
        // assert
        expect(() => computer.attack()).not.toThrow();
    })
    it("if not computer, attack() should take a param", () => {
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
        // act
        // assert
        expect(() => player.attack()).toThrow();
    })
    it("if computer, attack() should make a random attack", () => {
        // arrange
        let computer;
        let enemyGameboard = new Gameboard();
        let enemyShip1 = new Ship(2);
        let enemyShip2 = new Ship(3);
        let enemyShip3 = new Ship(4);
        enemyGameboard.placeShip(enemyShip1, [1, 5]);
        enemyGameboard.placeShip(enemyShip2, [2, 8], 1);
        enemyGameboard.placeShip(enemyShip3, [5, 3]);
        computer = new Player(enemyGameboard, true);
        // act
        computer.attack();
        // assert
        expect(computer.prevAttacks.length).not.toEqual(0);
        expect(computer.prevAttacks[computer.prevAttacks.length - 1] instanceof Array).toBeTruthy();
    })
})
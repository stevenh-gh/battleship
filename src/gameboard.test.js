import Gameboard from "./gameboard";
import Ship from "./ship";

describe("gameboard", () => {
    it("should have a list of ships", () => {
        // arrange
        let gameboard;
        // act
        gameboard = new Gameboard();
        // assert
        expect(gameboard.ships).toEqual([]);
    })
})
describe("placeShip", () => {
    it("should take a pair of coordinates and place a ship there", () => {
        // arrange
        const gameboard = new Gameboard();
        const length = 3;
        const ship = new Ship(length);
        const coord = [4, 3];
        // act
        gameboard.placeShip(ship, coord);
        // assert
        expect(gameboard.ships[gameboard.ships.length - 1]).toEqual(expect.objectContaining({
            ship: { length: 3, hits: [] },
            coord: expect.arrayContaining([
                [4, 3]
            ])
        }));
    })
    it("should calculate all the coordinates of the ship based on length", () => {
        // arrange
        const gameboard = new Gameboard();
        const length = 3;
        const ship = new Ship(length);
        const coord = [4, 3];
        // act
        gameboard.placeShip(ship, coord);
        // assert
        expect(gameboard.ships[gameboard.ships.length - 1]).toEqual(expect.objectContaining({
            ship: { length: 3, hits: [] },
            coord: expect.arrayContaining([
                [4, 3],
                [4, 4],
                [4, 5]
            ])
        }));
    })
    it("should calculate all the coordinates of the ship based on length (horizontal, left to right)", () => {
        // arrange
        const gameboard = new Gameboard();
        const length = 5;
        const ship = new Ship(length);
        const coord = [1, 2];
        // act
        gameboard.placeShip(ship, coord);
        // assert
        expect(gameboard.ships[gameboard.ships.length - 1]).toEqual(expect.objectContaining({
            ship: { length: 5, hits: [] },
            coord: expect.arrayContaining([
                [1, 2],
                [1, 3],
                [1, 4],
                [1, 5],
                [1, 6],
            ])
        }));
    })
    it("should have the length of ship equal to length of coord array", () => {
        // arrange
        const gameboard = new Gameboard();
        const length = 5;
        const ship = new Ship(length);
        const coord = [1, 2];
        // act
        gameboard.placeShip(ship, coord);
        // assert
        expect(gameboard.ships[gameboard.ships.length - 1].coord.length).toBe(length);
    })
    it("should have an optional parameter that indicates the ship's verticality (v=1 top to bottom)", () => {
        // arrange
        const gameboard = new Gameboard();
        const length = 3;
        const ship = new Ship(length);
        const coord = [4, 3];
        // act
        gameboard.placeShip(ship, coord, 1);
        // assert
        expect(gameboard.ships[gameboard.ships.length - 1]).toEqual(expect.objectContaining({
            ship: { length: 3, hits: [] },
            coord: expect.arrayContaining([
                [4, 3],
                [5, 3],
                [6, 3]
            ])
        }));
    })
    it("should have the ship's horizontality v=2 be calculated from right to left", () => {
        // arrange
        const gameboard = new Gameboard();
        const length = 5;
        const ship = new Ship(length);
        const coord = [1, 6];
        // act
        gameboard.placeShip(ship, coord, 2);
        // assert
        expect(gameboard.ships[gameboard.ships.length - 1]).toEqual(expect.objectContaining({
            ship: { length: 5, hits: [] },
            coord: expect.arrayContaining([
                [1, 6],
                [1, 5],
                [1, 4],
                [1, 3],
                [1, 2],
            ])
        }));
    })
    it("should have the ship's verticality v=3 calculated from bottom to top", () => {
        // arrange
        const gameboard = new Gameboard();
        const length = 5;
        const ship = new Ship(length);
        const coord = [8, 3];
        // act
        gameboard.placeShip(ship, coord, 3);
        // assert
        expect(gameboard.ships[gameboard.ships.length - 1]).toEqual(expect.objectContaining({
            ship: { length: 5, hits: [] },
            coord: expect.arrayContaining([
                [8, 3],
                [7, 3],
                [6, 3],
                [5, 3],
                [4, 3],
            ])
        }));
    })
    it("should give an error when a ship is placed onto an existing ship's coords", () => {
        // arrange
        const gameboard = new Gameboard();
        const length = 3;
        const ship = new Ship(length);
        const coord = [4, 3];
        // act
        gameboard.placeShip(ship, coord, 1); // [4,3][5,3][6,3]
        // assert
        expect(() => gameboard.placeShip(new Ship(4), [5, 1])).toThrow(); // [5,1][5,2][5,3][5,4]
    })
})
describe("receiveAttack", () => {
    it("should receive coordinates and check if it matches a ship's coordinates, if miss, place it into missed list", () => {
        // arrange
        const length = 3;
        const pos = [2, 2];
        const attack = [5, 6];
        const gameboard = new Gameboard();
        const ship = new Ship(length);
        const expected = [
            [5, 6]
        ]
        gameboard.placeShip(ship, pos);
        // act
        gameboard.receiveAttack(attack);
        // assert
        expect(gameboard.missed).toEqual(expect.arrayContaining(expected));
    })
    it("should receive coordinates and check if it matches a ship's coordinates, if hit, place it into ship's hit list", () => {
        // arrange
        const length = 3;
        const pos = [2, 2];
        const attack = [2, 4];
        const gameboard = new Gameboard();
        const ship = new Ship(length);
        const expected = [
            [2, 4]
        ]
        gameboard.placeShip(ship, pos);
        // act
        gameboard.receiveAttack(attack);
        // assert
        expect(ship.hits).toEqual(expect.arrayContaining(expected));
    })
    it("should work with multiple ships", () => {
        // arrange
        const attack = [7, 1];
        const gameboard = new Gameboard();
        const ship1 = new Ship(2);
        const ship2 = new Ship(2);
        const ship3 = new Ship(4);
        const expected = [
            [7, 1]
        ]
        gameboard.placeShip(ship1, [5, 2]); // [52][53]
        gameboard.placeShip(ship2, [3, 3], 1); // [33][43][53]
        gameboard.placeShip(ship3, [5, 1], 1); // [51][61][71][81]
        // act
        gameboard.receiveAttack(attack);
        // assert
        expect(ship3.hits).toEqual(expect.arrayContaining(expected));
    })
    it("should work with multiple ships", () => {
        // arrange
        const attack = [3, 4];
        const gameboard = new Gameboard();
        const ship1 = new Ship(2);
        const ship2 = new Ship(2);
        const ship3 = new Ship(4);
        const expected = [
            [3, 4]
        ]
        gameboard.placeShip(ship1, [5, 2]); // [52][53]
        gameboard.placeShip(ship2, [3, 3], 1); // [33][43][53]
        gameboard.placeShip(ship3, [5, 1], 1); // [51][61][71][81]
        // act
        gameboard.receiveAttack(attack);
        // assert
        expect(gameboard.missed).toEqual(expect.arrayContaining(expected));
    })
    it("should work with multiple ships", () => {
        // arrange
        const attack = [4, 3];
        const gameboard = new Gameboard();
        const ship1 = new Ship(2);
        const ship2 = new Ship(2);
        const ship3 = new Ship(4);
        const expected = [
            [4, 3]
        ]
        gameboard.placeShip(ship1, [5, 2]); //[52][53]
        gameboard.placeShip(ship2, [3, 3], 1); //[33][43][53]
        gameboard.placeShip(ship3, [5, 1], 1); //[51][61][71][81]
        // act
        gameboard.receiveAttack(attack);
        // assert
        expect(ship2.hits).toEqual(expect.arrayContaining(expected));
    })
})
describe("isAllSunk", () => {
    it("should return true if the only ship sinks", () => {
        // arrange
        let gameboard = new Gameboard();
        let ship = new Ship(3);
        gameboard.placeShip(ship, [2, 2]); //[22][23][24]
        gameboard.receiveAttack([2, 2]);
        gameboard.receiveAttack([2, 3]);
        gameboard.receiveAttack([2, 4]);
        // act
        let sunk = gameboard.isAllSunk();
        // assert
        expect(sunk).toBeTruthy();
    })
    it("should return false if the only ship has not sunk", () => {
        // arrange
        let gameboard = new Gameboard();
        let ship = new Ship(3);
        gameboard.placeShip(ship, [2, 2]); //[22][23][24]
        gameboard.receiveAttack([2, 2]);
        gameboard.receiveAttack([2, 3]);
        // act
        let sunk = gameboard.isAllSunk();
        // assert
        expect(sunk).toBeFalsy();
    })
    it("should return true if all two ships has sunk", () => {
        // arrange
        let gameboard = new Gameboard();
        let ship = new Ship(3);
        let ship2 = new Ship(2);
        gameboard.placeShip(ship, [2, 2]); //[22][23][24]
        gameboard.receiveAttack([2, 2]);
        gameboard.receiveAttack([2, 3]);
        gameboard.receiveAttack([2, 4]);
        gameboard.placeShip(ship2, [5, 5], 1); //[55][65]
        gameboard.receiveAttack([5, 5]);
        gameboard.receiveAttack([6, 5]);
        // act
        let sunk = gameboard.isAllSunk();
        // assert
        expect(sunk).toBeTruthy();
    })
    it("should return false if all two ships has not been sunk", () => {
        // arrange
        let gameboard = new Gameboard();
        let ship = new Ship(3);
        let ship2 = new Ship(2);
        gameboard.placeShip(ship, [2, 2]); //[22][23][24]
        gameboard.receiveAttack([2, 2]);
        gameboard.receiveAttack([2, 3]);
        gameboard.placeShip(ship2, [5, 5], 1); //[55][65]
        gameboard.receiveAttack([5, 5]);
        // act
        let sunk = gameboard.isAllSunk();
        // assert
        expect(sunk).toBeFalsy();
    })
    it("should return false if all three ships has not been sunk", () => {
        // arrange
        let gameboard = new Gameboard();
        let ship = new Ship(3);
        let ship2 = new Ship(2);
        let ship3 = new Ship(4);
        gameboard.placeShip(ship, [2, 2]); //[22][23][24]
        gameboard.receiveAttack([2, 2]);
        gameboard.receiveAttack([2, 3]);
        gameboard.receiveAttack([2, 4]);
        gameboard.placeShip(ship2, [5, 5], 1); //[55][65]
        gameboard.receiveAttack([5, 5]);
        gameboard.receiveAttack([6, 5]);
        gameboard.placeShip(ship3, [3, 2]); //[32][33][34][35]
        gameboard.receiveAttack([3, 2]);
        gameboard.receiveAttack([3, 3]);
        gameboard.receiveAttack([3, 5]);
        // act
        let sunk = gameboard.isAllSunk();
        // assert
        expect(sunk).toBeFalsy();
    })
    it("should return true if all three ships has been sunk", () => {
        // arrange
        let gameboard = new Gameboard();
        let ship = new Ship(3);
        let ship2 = new Ship(2);
        let ship3 = new Ship(4);
        gameboard.placeShip(ship, [2, 2]); //[22][23][24]
        gameboard.receiveAttack([2, 2]);
        gameboard.receiveAttack([2, 3]);
        gameboard.receiveAttack([2, 4]);
        gameboard.placeShip(ship2, [5, 5], 1); //[55][65]
        gameboard.receiveAttack([5, 5]);
        gameboard.receiveAttack([6, 5]);
        gameboard.placeShip(ship3, [3, 2]); //[32][33][34][35]
        gameboard.receiveAttack([3, 2]);
        gameboard.receiveAttack([3, 3]);
        gameboard.receiveAttack([3, 4]);
        gameboard.receiveAttack([3, 5]);
        // act
        let sunk = gameboard.isAllSunk();
        // assert
        expect(sunk).toBeTruthy();
    })
})
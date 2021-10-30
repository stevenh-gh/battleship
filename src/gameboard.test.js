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
    it("should calculate all the coordinates of the ship based on length", () => {
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
    it("should have an optional parameter that indicates the ship's verticality", () => {
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
})
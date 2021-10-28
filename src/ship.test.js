import Ship from "./ship";

describe("ship", () => {
    it("should have a length", () => {
        // arrange
        let length = 3;
        let ship;
        // act
        ship = new Ship(length);
        // assert
        expect(ship.length).toBe(length);
    })
    it("should have a list of hits", () => {
        // arrange
        let length = 3;
        let ship;
        // act
        ship = new Ship(length);
        // assert
        expect(ship.hits).toEqual([]);
    })
    describe("hit function", () => {
        it("should take a position and add it to the hits list", () => {
            // arrange
            const length = 3;
            const ship = new Ship(length);
            const pos = [3, 4];
            const expected = [
                [3, 4]
            ];
            // act
            ship.hit(pos);
            // assert
            expect(ship.hits).toEqual(expected);
        })
    })
    describe("isSunk function", () => {
        it("should return false when hits is empty", () => {
            // arrange
            const length = 3;
            const ship = new Ship(length);
            // act
            const result = ship.isSunk();
            // assert
            expect(result).toBeFalsy();
        })
        it("should return false when hits is not equal to length of ship", () => {
            // arrange
            const length = 3;
            const ship = new Ship(length);
            ship.hit([4, 3]);
            ship.hit([4, 4]);
            // act
            const result = ship.isSunk();
            // assert
            expect(result).toBeFalsy();
        })
        it("should return true when hits is equal to length of ship", () => {
            // arrange
            const length = 3;
            const ship = new Ship(length);
            ship.hit([4, 3]);
            ship.hit([4, 4]);
            ship.hit([4, 5]);
            // act
            const result = ship.isSunk();
            // assert
            expect(result).toBeTruthy();
        })
    })
})
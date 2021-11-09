export default class Gameboard {
    constructor() {
        this.ships = [];
        this.missed = [];
    }
    placeShip(ship, pos, verticality = 0) {
        let coord = [pos];
        setCoords(ship, coord, verticality);
        if (coord.some(e => e[0] >= 10 || e[1] >= 10)) {
            throw "invalid position";
        }
        isSpotTaken(coord, this.ships);
        this.ships.push({
            ship,
            coord
        })
    }

    receiveAttack(attack) {
        let missed = true;
        this.ships.forEach(shipinfo => {
            let s = shipinfo.ship;
            let s_coord = shipinfo.coord;
            if (s_coord.some(ele => (ele[0] === attack[0]) && (ele[1] === attack[1]))) {
                s.hit(attack)
                missed = false;
            }
        })
        if (missed) {
            this.missed.push(attack);
        }
        return !missed;
    }
    isAllSunk() {
        let sunk = true;
        this.ships.forEach(shipinfo => {
            let ship = shipinfo.ship;
            sunk = sunk && ship.isSunk();
        })
        return sunk;
    }
}

function setCoords(ship, coord, verticality) {
    for (let i = 0; i < ship.length - 1; ++i) {
        let x = coord[coord.length - 1][0];
        let y = coord[coord.length - 1][1];
        // verticality ? coord.push([++x, y]) : coord.push([x, ++y]);
        switch (verticality) {
            case 1:
                coord.push([++x, y]);
                break;
            case 2:
                coord.push([x, --y]);
                break;
            case 3:
                coord.push([--x, y]);
                break;
            default:
                coord.push([x, ++y]);
        }
    }
}

function isSpotTaken(coord, ships) {
    coord.forEach(c => {
        ships.forEach(shipinfo => {
            let s_coord = shipinfo.coord;
            if (s_coord.some(ele => (ele[0] === c[0]) && (ele[1] === c[1]))) {
                throw `this spot is taken: ${c}`;
            }
        });
    });
}
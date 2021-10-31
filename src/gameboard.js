export default class Gameboard {
    constructor() {
        this.ships = [];
        this.missed = [];
    }
    placeShip(ship, pos, verticality = 0) {
        let coord = [pos];
        setCoords(ship, coord, verticality);
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
    }
}

function setCoords(ship, coord, verticality) {
    for (let i = 0; i < ship.length - 1; ++i) {
        let x = coord[coord.length - 1][0];
        let y = coord[coord.length - 1][1];
        if (verticality) {
            coord.push([x + 1, y]);
        } else {
            coord.push([x, y + 1]);
        }
    }
}
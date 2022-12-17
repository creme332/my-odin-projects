/* eslint-disable */

import Ship from "./ship";

describe("Ship class", () => {
  test("basic methods for vertical cruiser", () => {
    const cruiser = new Ship(4, true, [0, 1]);
    const cellCoordinates = cruiser.cellsArray.map((el) => el.position);
    console.log(cellCoordinates);
    expect(cruiser.size).toBe(4);
    expect(cruiser.sunk()).toBe(false);
    expect(cruiser.vertical).toBe(true);
    expect(cruiser.coordinates).toStrictEqual([0, 1]);
    expect(cellCoordinates).toStrictEqual([1, 11, 21, 31]);

    cruiser.attack(31);
    expect(cruiser.sunk()).toBe(false);
    cruiser.attack(1);
    cruiser.attack(11);
    cruiser.attack(21);
    expect(cruiser.sunk()).toBe(true);
  });
  test("ship rotation", () => {
    const cruiser = new Ship(4, true, [0, 1]);
    
  });
  test("ship of invalid size", () => {
    let cruiser;
    const createShip = (size) => {
      cruiser = new Ship(size, true, [0, 1]);
    };
    expect(() => createShip(0)).toThrow("Invalid ship size");
    expect(() => createShip(5)).toThrow("Invalid ship size");
    expect(() => createShip(-1)).toThrow("Invalid ship size");
    expect(() => createShip("a")).toThrow("Invalid ship size");
  });
});

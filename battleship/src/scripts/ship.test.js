/* eslint-disable */

import Ship from "./ship";

describe("Test ship class", () => {
  test("vertical cruiser", () => {
    const cruiser = new Ship(4, true, [0, 1]);
    expect(cruiser.size).toBe(4);
    expect(cruiser.vertical).toBe(true);
    expect(cruiser.coordinates).toStrictEqual([0, 1]);
    // expect(cruiser.cellsArray).toStrictEqual([1, 11, 22, 33]);
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

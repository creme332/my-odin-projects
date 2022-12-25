/* eslint-disable */

import Ship from "../ship";

describe("Ship class", () => {
  let cruiser;
  beforeEach(() => {
    cruiser = new Ship(4, true, 0, 1);
  });

  test("constructor for vertical cruiser", () => {
    expect(cruiser.size).toBe(4);
    expect(cruiser.sunk()).toBeFalsy();
    expect(cruiser.isVertical).toBeTruthy();
    expect(cruiser.headPos).toStrictEqual(1);
    expect(cruiser.boardIndex).toStrictEqual(0);
    expect(cruiser.getCellPositions()).toStrictEqual([1, 11, 21, 31]);
  });

  describe("ship rotation", () => {
    test("vertical rotatable ship", () => {
      expect(cruiser.rotatable()).toBeTruthy();
      cruiser.rotate();
      expect(cruiser.getCellPositions()).toStrictEqual([1, 2, 3, 4]);

      cruiser = new Ship(4, true, 0, 6);
      expect(cruiser.rotatable()).toBeTruthy();
    });

    test("horizontal rotatable ship", () => {
      cruiser = new Ship(3, false, 0, 77);
      expect(cruiser.rotatable()).toBeTruthy();
      cruiser.rotate();
      expect(cruiser.getCellPositions()).toStrictEqual([77, 87, 97]);
    });

    test("ship which is not rotatable", () => {
      cruiser = new Ship(3, false, 0, 87);
      cruiser.rotate();
      expect(cruiser.getCellPositions()).toStrictEqual([87, 88, 89]);
    });

    test("ships close to borders", () => {
      cruiser = new Ship(4, true, 0, 7);
      expect(cruiser.rotatable()).toBeFalsy();

      cruiser = new Ship(3, false, 0, 87);
      expect(cruiser.rotatable()).toBeFalsy();
    });
  });

  describe("ship creation", () => {
    const createShip = (size, vert = false, pos = 0) => {
      new Ship(size, vert, 0, pos);
    };
    test("size 0", () => {
      expect(() => createShip(0)).toThrow("Invalid ship size");
    });
    test("size 5", () => {
      expect(() => createShip(5)).toThrow("Invalid ship size");
    });
    test("size -1", () => {
      expect(() => createShip(-1)).toThrow("Invalid ship size");
    });
    test("size letter", () => {
      expect(() => createShip("a")).toThrow("Invalid ship size");
    });
    test("insufficient space for ship", () => {
      expect(() => createShip(3, false, 9)).toThrow(
        "Ship cannot be moved to #9 (Insufficient space)"
      );
      expect(() => createShip(3, false, 8)).toThrow(
        "Ship cannot be moved to #8 (Insufficient space)"
      );
      expect(() => createShip(3, true, 99)).toThrow(
        "Ship cannot be moved to #99 (Insufficient space)"
      );
    });
  });

  describe("attack ship", () => {
    test("completely destroy vertical ship", () => {
      cruiser.attack(31);
      expect(cruiser.sunk()).toBe(false);
      cruiser.attack(1);
      cruiser.attack(11);
      cruiser.attack(21);
      expect(cruiser.sunk()).toBeTruthy();
    });

    test("attack a dead ship repeatedly", () => {
      cruiser.attack(31);
      expect(cruiser.sunk()).toBe(false);
      cruiser.attack(1);
      cruiser.attack(11);
      cruiser.attack(21);
      cruiser.attack(21);
      cruiser.attack(21);
      expect(cruiser.sunk()).toBeTruthy();
    });
  });

  describe("move ship to new position", () => {
    test("valid position", () => {
      cruiser.moveTo(5);
      expect(cruiser.getCellPositions()).toStrictEqual([5, 15, 25, 35]);
    });

    test("ship going outside of board", () => {
      expect(() => cruiser.moveTo(80)).toThrow(
        "Ship cannot be moved to #80 (Insufficient space)"
      );
    });
  });
});

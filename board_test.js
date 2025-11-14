import { expect } from "jsr:@std/expect";
import { Board } from "./board.js";

Deno.test("test initial count", () => {
  // Arrange
  const board = new Board();

  // Act
  const playerOneFields = board.fieldsWithState(1);
  const playerTwoFields = board.fieldsWithState(2);
  const emptyFields = board.fieldsWithState(0);

  // Assert
  expect(playerOneFields.length).toBe(2);
  expect(playerTwoFields.length).toBe(2);
  expect(emptyFields.length).toBe(8 * 8 - 2 * 2);
});

// Grenzwertanalyse für tied
// Positivtest: Spiel unentschieden (tied = true)
Deno.test("result tied when board full with equal stones", () => {
  // Arrange: Full board with 32 stones each
  const board = Board.of([
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
  ]);

  // Act
  const result = board.result();

  // Assert
  expect(result.tied).toBe(true);
  expect(result.finished).toBe(true);
  expect(result.winner).toBe(0);
  expect(result.playerOne).toBe(32);
  expect(result.playerTwo).toBe(32);
});

// Angrenzende Äquivalenzklasse 1: Spiel noch nicht zu Ende
Deno.test("result not tied when board not finished", () => {
  // Arrange: Board with one empty field, equal stones
  const board = Board.of([
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 0],
  ]);

  // Act
  const result = board.result();

  // Assert
  expect(result.tied).toBe(false);
  expect(result.finished).toBe(false);
  expect(result.winner).toBe(0);
  expect(result.playerOne).toBe(31);
  expect(result.playerTwo).toBe(32);
});

// Angrenzende Äquivalenzklasse 2: Sieg Spieler 1
Deno.test("result not tied when player one wins", () => {
  // Arrange: Full board, player 1 has one more stone (33 vs 31)
  const board = Board.of([
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [1, 1, 1, 2, 2, 2, 1, 1],
  ]);

  // Act
  const result = board.result();

  // Assert
  expect(result.tied).toBe(false);
  expect(result.finished).toBe(true);
  expect(result.winner).toBe(1);
  expect(result.playerOne).toBe(33);
  expect(result.playerTwo).toBe(31);
});

// Angrenzende Äquivalenzklasse 3: Sieg Spieler 2
Deno.test("result not tied when player two wins", () => {
  // Arrange: Full board, player 2 has one more stone (33 vs 31)
  const board = Board.of([
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [1, 1, 1, 1, 2, 2, 2, 2],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 1, 1],
    [2, 2, 2, 2, 1, 1, 2, 1],
  ]);

  // Act
  const result = board.result();

  // Assert
  expect(result.tied).toBe(false);
  expect(result.finished).toBe(true);
  expect(result.winner).toBe(2);
  expect(result.playerOne).toBe(31);
  expect(result.playerTwo).toBe(33);
});

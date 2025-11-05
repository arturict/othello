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

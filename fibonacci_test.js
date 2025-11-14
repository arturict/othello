import { expect } from "jsr:@std/expect";
import { fibonacci } from "./fibonacci.js";

Deno.test("test first Fibonacci number", () => {
  expect(fibonacci(0)).toBe(1);
});

Deno.test("test second Fibonacci number", () => {
  expect(fibonacci(1)).toBe(1);
});

Deno.test("test third Fibonacci number", () => {
  expect(fibonacci(2)).toBe(2);
});

Deno.test("test fifth Fibonacci number", () => {
  expect(fibonacci(5)).toBe(8);
});
Deno.test("test tenth Fibonacci number", () => {
  expect(fibonacci(10)).toBe(89);
});

Deno.test("test negative input", () => {
  expect(fibonacci(-1)).toBeUndefined();
});

Deno.test("test non-number input", () => {
  expect(fibonacci("string")).toBeUndefined();
});
Deno.test("test null input returns undefined", () => {
  expect(fibonacci(null)).toBeUndefined();
});
//Auftrag: Speichere diesen Code in einer Datei namens quadratic_equation.ts ab. Ermittle nun die drei nötigen Testfälle (d.h. Wertkombinationen für die Parameter a, b und c), um eine vollständige Codeüberdeckung zu erreichen. Erstelle nun automatisch ausführbare Testfälle in quadratic_equation_test.ts, führe sie aus und miss deren Codeüberdeckung.
//mit deno test und deno coverage,analog zu fibnacci_test.ts
import { solve } from "./quadratic_equation.ts";
import { expect } from "jsr:@std/expect";

Deno.test("Test case with two real roots", () => {
  const result = solve(1, -3, 2); // x^2 - 3x + 2 = 0 has roots 1 and 2
  expect(result).toEqual([2, 1]);
});

Deno.test("Test case with one real root", () => {
  const result = solve(1, -2, 1); // x^2 - 2x + 1 = 0 has root 1
  expect(result).toEqual([1]);
});

Deno.test("Test case with no real roots", () => {
  const result = solve(1, 0, 1); // x^2 + 1 = 0 has no real roots
  expect(result).toEqual([]);
});

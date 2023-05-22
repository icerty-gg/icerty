import { describe, expect, it } from "vitest";

import { POSITIVE_NUMBER_REGEX, parsePositiveNumberSearchParam } from "./home-utils";

describe("Home page utils tests", () => {
	describe("Positive number regexp", () => {
		it("Should match positive numbers or empty string", () => {
			expect("").toMatch(POSITIVE_NUMBER_REGEX);
			expect("1").toMatch(POSITIVE_NUMBER_REGEX);
			expect("123").toMatch(POSITIVE_NUMBER_REGEX);
			expect("999999999").toMatch(POSITIVE_NUMBER_REGEX);
			expect("505").toMatch(POSITIVE_NUMBER_REGEX);
		});

		it("Should not match negative numbers, numbers starting from 0, strings, numbers with spaces or special characters ", () => {
			expect("0").not.toMatch(POSITIVE_NUMBER_REGEX);
			expect("033").not.toMatch(POSITIVE_NUMBER_REGEX);
			expect("5 33").not.toMatch(POSITIVE_NUMBER_REGEX);
			expect("5,33").not.toMatch(POSITIVE_NUMBER_REGEX);
			expect("5.66").not.toMatch(POSITIVE_NUMBER_REGEX);
			expect("ABC").not.toMatch(POSITIVE_NUMBER_REGEX);
			expect("abc").not.toMatch(POSITIVE_NUMBER_REGEX);
			expect("-23").not.toMatch(POSITIVE_NUMBER_REGEX);
			expect("e454").not.toMatch(POSITIVE_NUMBER_REGEX);
		});
	});

	describe("parsePositiveNumberSearchParam", () => {
		it("Should return undefined if param is not a string or doesn't match regex", () => {
			expect(parsePositiveNumberSearchParam(undefined)).toEqual(undefined);
			expect(parsePositiveNumberSearchParam([])).toEqual(undefined);
			expect(parsePositiveNumberSearchParam(["5", "DD"])).toEqual(undefined);
			expect(parsePositiveNumberSearchParam("05")).toEqual(undefined);
			expect(parsePositiveNumberSearchParam("Abc")).toEqual(undefined);
			expect(parsePositiveNumberSearchParam("-5")).toEqual(undefined);
		});

		it("Should return a number", () => {
			expect(parsePositiveNumberSearchParam("5")).toEqual(5);
		});
	});
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useTimeUtils from "../useTimeUtils";

const { daysAfter, daysFromToday, isAfter } = useTimeUtils();

describe("daysAfter", () => {
  it("calculate correct", () => {
    const date = new Date(2023, 3, 13, 10);
    expect(daysAfter(date, 0)).toEqual(new Date(2023, 3, 13, 10));
    expect(daysAfter(date, -2)).toEqual(new Date(2023, 3, 11, 10));
    expect(daysAfter(date, 2)).toEqual(new Date(2023, 3, 15, 10));
    expect(daysAfter(undefined, 2)).toEqual(undefined);
    expect(daysAfter(null, 2)).toEqual(undefined);
  });
});

describe("daysFromToday", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it("calculate correct start", () => {
    const date = new Date(2023, 3, 13, 10);
    vi.setSystemTime(date);
    expect(daysFromToday(0)).toEqual(new Date(2023, 3, 13));
    expect(daysFromToday(-2)).toEqual(new Date(2023, 3, 11));
    expect(daysFromToday(2)).toEqual(new Date(2023, 3, 15));
  });
  it("calculate correct end", () => {
    const date = new Date(2023, 3, 13, 10);
    vi.setSystemTime(date);
    expect(daysFromToday(0, true)).toEqual(new Date(2023, 3, 14));
    expect(daysFromToday(-2, true)).toEqual(new Date(2023, 3, 12));
    expect(daysFromToday(2, true)).toEqual(new Date(2023, 3, 16));
  });
});

describe("isAfter", () => {
  it("returns true if a is after b", () => {
    expect(isAfter(new Date(2023, 3, 13), new Date(2023, 3, 12))).toBeTruthy();
  });
  it("returns false if a is before b", () => {
    expect(isAfter(new Date(2023, 3, 13), new Date(2023, 3, 14))).toBeFalsy();
  });
  it("returns false if a and b are the same", () => {
    expect(isAfter(new Date(2023, 3, 13), new Date(2023, 3, 13))).toBeFalsy();
  });
  it("returns false if a or b is null or undefined", () => {
    expect(isAfter(null, new Date(2023, 3, 14))).toBeFalsy();
    expect(isAfter(undefined, new Date(2023, 3, 14))).toBeFalsy();
    expect(isAfter(new Date(2023, 3, 13), null)).toBeFalsy();
    expect(isAfter(new Date(2023, 3, 13), undefined)).toBeFalsy();
  });
});

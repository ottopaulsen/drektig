import { exportAllDeclaration } from "@babel/types";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useTimeUtils from "../useTimeUtils";
import { Timestamp } from "firebase/firestore";

const { daysFromToday } = useTimeUtils();

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

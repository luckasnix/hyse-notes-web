import { describe, expect, it, vi } from "vitest";

import {
  BASE62_CHARS,
  convertTimestampToDate,
  generateBase62Id,
  getTimestampInSeconds,
} from "./general";

describe("getTimestampInSeconds()", () => {
  it("returns the current timestamp in seconds", () => {
    vi.setSystemTime(new Date("1995-06-16T20:00:00Z"));
    const timestampInSeconds = getTimestampInSeconds();

    expect(timestampInSeconds).toBe(803332800);
    expect(Number.isInteger(timestampInSeconds)).toBe(true);
  });
});

describe("convertTimestampToDate()", () => {
  it("handles a different locales correctly", () => {
    const timestamp = 803332800;

    expect(convertTimestampToDate(timestamp, "en-US")).toBe("06/16/1995");
    expect(convertTimestampToDate(timestamp, "pt-BR")).toBe("16/06/1995");
  });
});

describe("generateBase62Id()", () => {
  it("generates an ID with the specified length", () => {
    expect(generateBase62Id(8)).toHaveLength(8);
    expect(generateBase62Id(16)).toHaveLength(16);
    expect(generateBase62Id(1)).toHaveLength(1);
  });

  it("contains only valid Base62 characters", () => {
    const base62Id = generateBase62Id(100);
    const base62Regex = new RegExp(`^[${BASE62_CHARS}]+$`);

    expect(base62Id).toMatch(base62Regex);
  });

  it("generates unique IDs", () => {
    const base62Ids = new Set(
      Array.from({ length: 100 }, () => generateBase62Id(16)),
    );

    expect(base62Ids.size).toBe(100);
  });
});

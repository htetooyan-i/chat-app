type DurationUnit = "ms" | "s" | "m" | "h" | "d";

const UNIT_TO_MS: Record<DurationUnit, number> = {
  ms: 1,
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

/**
 * Parses values like "15", "15m", "2h", "30d".
 * If unit is omitted, defaultUnit is used.
 */
export function parseDurationMs(
  rawValue: string | undefined,
  fallbackValue: number,
  defaultUnit: Exclude<DurationUnit, "ms">
): number {
  const raw = (rawValue ?? "").trim();
  const fallbackMs = fallbackValue * UNIT_TO_MS[defaultUnit];

  if (!raw) return fallbackMs;

  const match = raw.match(/^(\d+)\s*(ms|s|m|h|d)?$/i);
  if (!match) return fallbackMs;

  const value = Number.parseInt(match[1], 10);
  const unit = ((match[2] || defaultUnit).toLowerCase() as DurationUnit);

  return value * UNIT_TO_MS[unit];
}

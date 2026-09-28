export const BATCH_MULTIPLIERS = [1, 2, 3] as const;

export type BatchMultiplier = (typeof BATCH_MULTIPLIERS)[number];

const FRACTION_DENOMINATOR = 8;

function greatestCommonDivisor(a: number, b: number): number {
  let left = Math.abs(a);
  let right = Math.abs(b);

  while (right !== 0) {
    const remainder = left % right;
    left = right;
    right = remainder;
  }

  return left;
}

export function scaleQuantity(
  quantity: number,
  multiplier: BatchMultiplier,
): number {
  return quantity * multiplier;
}

export function formatQuantity(
  quantity: number,
  multiplier: BatchMultiplier = 1,
): string {
  const scaledEighths = Math.round(
    scaleQuantity(quantity, multiplier) * FRACTION_DENOMINATOR,
  );
  const whole = Math.trunc(scaledEighths / FRACTION_DENOMINATOR);
  const remainder = scaledEighths % FRACTION_DENOMINATOR;

  if (remainder === 0) {
    return String(whole);
  }

  const divisor = greatestCommonDivisor(remainder, FRACTION_DENOMINATOR);
  const fraction = `${remainder / divisor}/${FRACTION_DENOMINATOR / divisor}`;

  return whole === 0 ? fraction : `${whole} ${fraction}`;
}

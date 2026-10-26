// Reflect overshoot so animation remains inside the screen at any frame rate.
export function advanceAxis(position, velocity, seconds, limit) {
  if (limit <= 0) return { position: 0, velocity, hit: false };
  const next = position + velocity * seconds;
  const period = limit * 2;
  const wrapped = ((next % period) + period) % period;
  const reflected = wrapped > limit;
  return {
    position: reflected ? period - wrapped : wrapped,
    velocity: wrapped === 0 ? Math.abs(velocity) : wrapped === limit ? -Math.abs(velocity) : velocity * (reflected ? -1 : 1),
    hit: next <= 0 || next >= limit,
  };
}

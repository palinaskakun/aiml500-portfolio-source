import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceAxis } from '../lib/bounce.js';

test('a logo reverses at both edges, including an exact corner arrival', () => {
  assert.deepEqual(advanceAxis(90, 20, .5, 100), { position: 100, velocity: -20, hit: true });
  assert.deepEqual(advanceAxis(10, -20, .5, 100), { position: 0, velocity: 20, hit: true });
  assert.deepEqual(advanceAxis(95, 20, .5, 100), { position: 95, velocity: -20, hit: true });
  assert.deepEqual(advanceAxis(5, -20, .5, 100), { position: 5, velocity: 20, hit: true });
});

test('frame overshoot and long frames never leave the available screen', () => {
  for (const velocity of [-240, -60, 60, 240]) {
    for (const seconds of [.016, .1, 1, 20]) {
      for (const position of [0, 1, 49, 99, 100]) {
        const next = advanceAxis(position, velocity, seconds, 100);
        assert.ok(next.position >= 0 && next.position <= 100);
        assert.equal(Math.abs(next.velocity), Math.abs(velocity));
      }
    }
  }
});

test('manifesting a corner brings both axes to their edge together', () => {
  const width = 740, height = 440, seconds = 4;
  const x = advanceAxis(0, width / seconds, seconds, width);
  const y = advanceAxis(0, height / seconds, seconds, height);
  assert.equal(x.position, width);
  assert.equal(y.position, height);
  assert.ok(x.hit && y.hit);
  assert.ok(x.velocity < 0 && y.velocity < 0);
});

test('a zero-sized region is handled without invalid positions', () => {
  const result = advanceAxis(0, 60, 1, 0);
  assert.equal(result.position, 0);
  assert.ok(Number.isFinite(result.velocity));
});

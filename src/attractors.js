export const ATTRACTORS = [
  {
    name: 'Lorenz',
    step: 0.006,
    initial: { x: 0.1, y: 0, z: 0 },
    projection: { scaleX: 69, scaleY: 58, baseline: 0.91, yaw: -0.15, pitch: 0.16, focalLength: 120 },
    derivative: ({ x, y, z }) => ({
      x: 10 * (y - x),
      y: x * (28 - z) - y,
      z: x * y - (8 / 3) * z,
    }),
  },
  {
    name: 'Rössler',
    step: 0.03,
    initial: { x: 0.1, y: 0, z: 0 },
    projection: { scaleX: 25, scaleY: 22, baseline: 0.78, yaw: 0.7, pitch: 0.52, focalLength: 35 },
    derivative: ({ x, y, z }) => ({
      x: -y - z,
      y: x + 0.2 * y,
      z: 0.2 + z * (x - 5.7),
    }),
  },
  {
    name: 'Thomas',
    step: 0.1,
    initial: { x: 0.1, y: 0, z: 0 },
    projection: { scaleX: 8, scaleY: 8, baseline: 0.53, yaw: 0.85, pitch: 0.65, focalLength: 14 },
    derivative: ({ x, y, z }) => ({
      x: Math.sin(y) - 0.208186 * x,
      y: Math.sin(z) - 0.208186 * y,
      z: Math.sin(x) - 0.208186 * z,
    }),
  },
];

export const TRAIL_CAPACITY = 2400;
export const SIMULATION_SPEED = { compact: 6, full: 9 };

export function chooseAttractor() {
  const previous = window.localStorage.getItem('qronon-attractor');
  const available = ATTRACTORS.filter((attractor) => attractor.name !== previous);
  const attractor = available[Math.floor(Math.random() * available.length)];
  window.localStorage.setItem('qronon-attractor', attractor.name);
  return attractor;
}

export function createTrail() {
  return { points: new Float32Array(TRAIL_CAPACITY * 3), head: 0, count: 0 };
}

export function appendPoint(trail, state) {
  const offset = trail.head * 3;
  trail.points[offset] = state.x;
  trail.points[offset + 1] = state.y;
  trail.points[offset + 2] = state.z;
  trail.head = (trail.head + 1) % TRAIL_CAPACITY;
  trail.count = Math.min(trail.count + 1, TRAIL_CAPACITY);
}

export function integrate(state, attractor) {
  const { step, derivative } = attractor;
  const halfStep = step / 2;
  const k1 = derivative(state);
  const k2 = derivative({ x: state.x + k1.x * halfStep, y: state.y + k1.y * halfStep, z: state.z + k1.z * halfStep });
  const k3 = derivative({ x: state.x + k2.x * halfStep, y: state.y + k2.y * halfStep, z: state.z + k2.z * halfStep });
  const k4 = derivative({ x: state.x + k3.x * step, y: state.y + k3.y * step, z: state.z + k3.z * step });
  state.x += (k1.x + 2 * k2.x + 2 * k3.x + k4.x) * step / 6;
  state.y += (k1.y + 2 * k2.y + 2 * k3.y + k4.y) * step / 6;
  state.z += (k1.z + 2 * k2.z + 2 * k3.z + k4.z) * step / 6;
}

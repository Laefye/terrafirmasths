export const steps = [
    -3, -6, 2, 7,
    -9, -15, 13, 16
];

const MIN_POINT = 0;
const MAX_POINT = 140;

export function getTrace(fromPoints: number, toPoints: number): number[] {
    if (!Number.isFinite(fromPoints) || !Number.isFinite(toPoints)) {
        throw new Error("Points must be finite numbers");
    }

    if (fromPoints < MIN_POINT || fromPoints > MAX_POINT) {
        throw new Error("fromPoints is outside the allowed range");
    }

    if (toPoints < MIN_POINT || toPoints > MAX_POINT) {
        throw new Error("toPoints is outside the allowed range");
    }

    if (fromPoints === toPoints) {
        return [];
    }

    const queue: Array<{ position: number; takenSteps: number[] }> = [{ position: fromPoints, takenSteps: [] }];
    const visited = new Set<number>([fromPoints]);

    // Breadth-first search guarantees the shortest route with uniform step costs.
    while (queue.length) {
        const { position, takenSteps } = queue.shift()!;

        for (const step of steps) {
            const next = position + step;

            if (next < MIN_POINT || next > MAX_POINT || visited.has(next)) {
                continue;
            }

            const nextPath = [...takenSteps, step];

            if (next === toPoints) {
                return nextPath;
            }

            visited.add(next);
            queue.push({ position: next, takenSteps: nextPath });
        }
    }

    return [];
}
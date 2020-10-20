/**
 * Calculates the distance between two points.
 *
 * @export
 * @param {Object} pointA
 * @param {Object} pointB
 * @returns {Number}
 */
export function distance(pointA, pointB) {
  const xDiff = pointA.x - pointB.x
  const yDiff = pointA.y - pointB.y
  return Math.sqrt(xDiff * xDiff + yDiff * yDiff)
}

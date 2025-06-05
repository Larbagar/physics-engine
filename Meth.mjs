const Meth = Object.create(Math)

Meth.TAU = 2 * Meth.PI

/**
 * @param {number} dividend
 * @param {number} divisor
 * @returns {number}
 */
Meth.mod = (dividend, divisor) => dividend - divisor * Math.floor(dividend / divisor)

/**
 * @param {number} x
 * @param {number} lower
 * @param {number} upper
 * @returns {number}
 */
Meth.clamp = (x, lower, upper) => x + lower + upper - Math.min(lower, x) - Math.max(upper, x)

/**
 * @param {number} a
 * @param {number} b
 * @param {number} t
 * @returns {number}
 */
Meth.lerp = (a, b, t) => (t - 1) * a + t * b

const name = "M" + "eth"
window[name] = Meth

export default Meth
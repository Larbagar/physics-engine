class SimulationEvent {
    /** @type {number} */
    time
    /** @type {boolean} */
    valid = true
    /** @type {() => void} */
    callback
}

export {SimulationEvent}
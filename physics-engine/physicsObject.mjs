class PhysicsObject {
    /** @type {V2} */
    pos
    /** @type {V2} */
    vel
    /** @type {number} */
    time
    /** @type {Array<Collider>} */
    colliders = []
    /** @type {Array<SimulationEvent>} */
    relatedEvents = []
    /** @type {Simulation} */
    simulation

    /**
     * @param {V2} velChange
     */
    changeVel(velChange) {
        this.vel.add(velChange)
        for(const event of this.relatedEvents){
            event.valid = false
        }
        this.simulation.recalculate(this)
    }
    /**
     * @param {V2} newVel
     */
    setVel(newVel) {
        this.vel.set(newVel)
        this.simulation.recalculate(this)
    }
    /**
     * @param {V2} newPos
     */
    setPos(newPos){
        this.pos.set(newPos)
        this.simulation.recalculate(this)
    }
}

export {PhysicsObject}
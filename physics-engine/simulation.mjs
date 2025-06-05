import {PhysicsObject} from "./physicsObject.mjs"
import {getCollisions} from "./get-collisions.mjs"
import {SimulationEvent} from "./simulationEvent.mjs"
import {Heap} from "../Heap.js"

class Simulation {
    /** @type {Array<PhysicsObject>} */
    objects = []
    time = 0
    /** @type {Heap<SimulationEvent>} */
    events = new Heap(
        /**
         * @param {SimulationEvent} a
         * @param {SimulationEvent} b
         * @returns {number}
         */
        (a, b) => a.time - b.time
    )
    /** @type {Array<PhysicsObject>} */
    objectsToRecalculate = []

    createObject(colliders) {
        const obj = new PhysicsObject()
        obj.colliders = colliders
        obj.simulation = this

        this.objects.push(obj)
        return obj
    }

    /**
     * @param {PhysicsObject} objA
     * @param {PhysicsObject} objB
     * @param {function(Collision): void} callback
     */
    onCollision(objA, objB, callback){
        const collisions = getCollisions(objA, objB)
        for(const collision of collisions){
            const event = new SimulationEvent()
            event.time = collision.time
            event.callback = () => {
                callback(collision)
            }
            this.events.push(event)
        }
    }

    /**
     * @param {PhysicsObject} obj
     *
     */
    recalculate(obj) {
        this.objectsToRecalculate.push(obj)
    }

    /**
     * @param {number} time
     */
    runTo(time){
        if(this.objectsToRecalculate.length > 0){
            // TODO recalculate objects
        }
        if(this.events.size() == 0){
            return
        }
        /** @type {SimulationEvent} */
        // const event = this.events.pop()


        /** @type {Array<SimulationEvent>} */
        const a = []

        const event = a.pop()
    }
}

export {Simulation}
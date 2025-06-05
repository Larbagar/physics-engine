import V2 from "../V2.mjs"
import {CollisionCalculatorResult, registerCollision} from "./get-collisions.mjs"

class Collider {
    /** @type {PhysicsObject} */
    parent
}

class Arc extends Collider {}

class Segment extends Collider {
    /** @type {V2} */
    len
    /** @type {V2} */
    pos
    /** @type {V2} */
    vel
    constructor(len = V2.zero(), pos = V2.zero(), vel = V2.zero()) {
        super()
        this.len = len
        this.pos = pos
        this.vel = vel
    }
}

class Vertex extends Collider {
    /** @type {V2} */
    pos
    /** @type {V2} */
    vel
    constructor(pos = V2.zero(), vel = V2.zero()) {
        super()
        this.pos = pos
        this.vel = vel
    }
}

/**
 * @param {V2} p0
 * @param {V2} p1
 * @param {V2} v0
 * @param {V2} v1
 */
function rayIntersection(p0, p1, v0, v1) {
    const diff = p1.copy().sub(p0)
    const perp0 = v0.perp()
    const perp1 = v1.perp()
    const t0 = perp1.dot(diff) / perp1.dot(v0)
    const t1 = perp0.dot(diff) / perp0.dot(v1)
    return {t0, t1}
}



registerCollision(Segment, Vertex,
    /**
     * @param {Segment} segment
     * @param {Vertex} vertex
     */
    (segment, vertex) => {
        const
            timeDifference = vertex.parent.time - segment.parent.time,

            vertVel = vertex.vel.xy.add(vertex.parent.vel),
            vertPos = vertex.pos.xy.add(vertex.parent.pos).addScaled(vertVel, timeDifference),
            segVel = segment.vel.xy.add(segment.parent.vel),
            segPos = segment.pos.xy.add(segment.parent.pos),

            relVel = vertVel.xy.sub(segVel),

            // Ray intersection
            distance = vertPos.sub(segPos),
            sideways = relVel.xy.perp(),
            normal = segment.len.xy.perp(),
            relTime = normal.dot(distance) / normal.dot(relVel),
            dist = sideways.dot(distance) / sideways.dot(segment.len),

            time = relTime + segment.parent.time,
            hits = 0 < dist && dist < 1 && time > 0

        if(hits){

            // Orthogonal decomposition

            const tanVel = relVel.xy.project(segment.len)
            const perpVel = relVel.xy.sub(tanVel)

            return [new CollisionCalculatorResult(time, relVel, tanVel.xy.negate(), perpVel.xy.negate())]
        }else{
            return []
        }
    }
)

/** @type {CollisionCalculator} */
const impossibleCollisionCalculator = (_obj0, _obj1, _timeDifference) => []

registerCollision(Vertex, Vertex, impossibleCollisionCalculator)
registerCollision(Segment, Segment, impossibleCollisionCalculator)

export {Collider, Arc, Segment, Vertex}
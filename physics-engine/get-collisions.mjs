class CollisionCalculatorResult {
    /**
     * @param {number} time
     * @param {V2} vel0
     * @param {V2} tanVel0
     * @param {V2} perpVel0
     */
    constructor(time, vel0, tanVel0, perpVel0) {
        this.time = time
        this.vel0 = vel0
        this.tanVel0 = tanVel0
        this.perpVel0 = perpVel0
    }
}

class Collision {
    /**
     * @param {PhysicsObject} obj0
     * @param {PhysicsObject} obj1
     * @param {CollisionCalculatorResult} calculatorResult
     * @param {boolean} flipObjects
     */
    constructor(obj0, obj1, calculatorResult, flipObjects) {
        this.obj0 = obj0
        this.obj1 = obj1
        this.time = calculatorResult.time
        this.vel0 = flipObjects ? calculatorResult.vel0 : calculatorResult.vel0
        this.tanVel0 = calculatorResult.tanVel0
        this.perpVel0 = calculatorResult.perpVel0
        this.vel1 = this.vel0.xy.negate()
        this.tanVel1 = this.tanVel0.xy.negate()
        this.perpVel1 = this.perpVel0.xy.negate()
    }

    /**
     * @param {PhysicsObject} obj
     */
    yieldObject(obj) {
        if(obj == this.obj0){
            this.obj0.vel.sub(this.perpVel0)
        }
        if(obj == this.obj1){
            this.obj1.vel.sub(this.perpVel1)
        }
        throw "Object to yield must be one of the two colliding objects."
    }

    /**
     * @param {PhysicsObject} obj
     */
    bounceObject(obj){
        if(obj == this.obj0){
            this.obj0.vel.addScaled(this.perpVel0, -2)
        }
        if(obj == this.obj1){
            this.obj1.vel.addScaled(this.perpVel1, -2)
        }
        throw "Object to bounce must be one of the two colliding objects."
    }

    /**
     * @param {PhysicsObject} obj
     */
    inelasticCollide(obj0)
}

/**
 * @typedef {function(Collider, Collider): Array<CollisionCalculatorResult>} CollisionCalculator
 */

/**
 * 2d map that maps collider types to functions
 * @type {Map<Function, Map<Function, CollisionCalculator>>}
 */
const collisionMap = new Map()

/**
 * @param {Function} type0
 * @param {Function} type1
 * @param {CollisionCalculator} calculator
 */
function registerCollision(type0, type1, calculator) {
    if (!collisionMap.has(type0)) {
        collisionMap.set(type0, new Map())
    }
    collisionMap.get(type0).set(type1, calculator)
}

/**
 * @param {PhysicsObject} obj0
 * @param {PhysicsObject} obj1
 */
function getCollisions(obj0, obj1) {
    /** @type {Array<Collision>} */
    const collisions = []
    for (const collider0 of obj0.colliders) {
        for (const collider1 of obj1.colliders) {
            const type0 = collider0.constructor
            const type1 = collider1.constructor

            /** @type {?CollisionCalculator} */
            const handler0 = collisionMap.get(type0)?.get(type1)
            if(handler0){
                collisions.push(...handler0(collider0, collider1).map(
                    result => new Collision(obj0, obj1, result, false)
                ))
                continue
            }
            /** @type {?CollisionCalculator} */
            const handler1 = collisionMap.get(type1)?.get(type0)
            if(handler1){
                collisions.push(...handler1(collider1, collider0).map(
                    result => new Collision(obj0, obj1, result, true)
                ))
                continue
            }
            throw `No definition for collisions between objects of types ${type0.name} and ${type1.name}.`
        }
    }
    return collisions
}

export {registerCollision, CollisionCalculatorResult, Collision, getCollisions}
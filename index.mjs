import {ctx, setupCanvas} from "./canvas.mjs"
import {Simulation} from "./physics-engine/simulation.mjs"

setupCanvas()

const sim = new Simulation()

const player = sim.createObject([...colliders])
const environment = sim.createObject([...colliders])

sim.onCollision(player, environment,
    /**
     * @param {Collision} collision
     */
    collision => {
        collision.yieldObject(player)
    }
)

sim.runTo(10)

ctx.fillRect(0, 0, 50*devicePixelRatio, 50*devicePixelRatio)
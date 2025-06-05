import V2 from "./V2.mjs"

let
    /** @type {HTMLCanvasElement} */
    canvas,
    /** @type {CanvasRenderingContext2D} */
    ctx,
    resolution = 1

function resize() {
    const res = V2.fromVals(innerWidth, innerHeight).mult(devicePixelRatio * resolution);
    [canvas.width, canvas.height] = res
}

function setupCanvas(){
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")

    addEventListener("resize", resize)
    resize()
}

export {setupCanvas, canvas, ctx}
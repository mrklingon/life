// Core function
function gameOfLife () {
    for (let b = 0; b <= 5 - 1; b++) {
        for (let c = 0; c <= 5 - 1; c++) {
            count = 0
            // Count the live cells in the next row
            if (b + 1 < 5) {
                if (getState(state, b + 1, c)) {
                    count += 1
                }
                if (c + 1 < 5 && getState(state, b + 1, c + 1)) {
                    count += 1
                }
                if (c - 1 >= 0 && getState(state, b + 1, c - 1)) {
                    count += 1
                }
            }
            // Count the live cells in the previous row
            if (b - 1 >= 0) {
                if (getState(state, b - 1, c)) {
                    count += 1
                }
                if (c + 1 < 5 && getState(state, b - 1, c + 1)) {
                    count += 1
                }
                if (c - 1 >= 0 && getState(state, b - 1, c - 1)) {
                    count += 1
                }
            }
            // Count the live cells in the current row exlcuding the current position.
            if (c - 1 >= 0 && getState(state, b, c - 1)) {
                count += 1
            }
            if (c + 1 < 5 && getState(state, b, c + 1)) {
                count += 1
            }
            // Toggle live / dead cells based on the neighbour count. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation. Any live cell with two or three live neighbours lives on to the next generation. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. Any live cell with more than three live neighbours dies, as if by overpopulation.
            switch (count) {
                case 0: setState(result, b, c, false); break;
                case 1: setState(result, b, c, false); break;
                case 2: setState(result, b, c, getState(state, b, c)); break;
                case 3: setState(result, b, c, true); break;
                default: setState(result, b, c, false); break;
            }
        }
    }
    // Update the state
    state = result
}
// Use button A for the next iteration of game of life
input.onButtonPressed(Button.A, function () {
    gameOfLife()
    show()
})
// Use button B for reseting to random initial seed state
input.onButtonPressed(Button.B, function () {
    reset()
    show()
})
// Show the lifeChart based on the state
function show () {
    for (let z = 0; z <= 5 - 1; z++) {
        for (let a = 0; a <= 5 - 1; a++) {
            lifeChart.setPixel(z, a, getState(state, z, a));
        }
    }
    lifeChart.plotImage(0);
}
// Generate random initial state.
function reset () {
    for (let x = 0; x <= 5 - 1; x++) {
        for (let y = 0; y <= 5 - 1; y++) {
            setState(state, x, y, Math.randomBoolean());
        }
    }
}
let state: boolean[] = []
let lifeChart: Image = null
let count = 0
let result: boolean[] = []
lifeChart = images.createImage(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
// State holds the information about pixel is live or dead false means dead, true means live.
state = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
// get & set on any array
function getState(arr: boolean[], x: number, y: number): boolean {
    return arr[x * 5 + y];
}
function setState(arr: boolean[], x: number, y: number, value: boolean): void {
    arr[x * 5 + y] = value;
}
// Initial reset & show
reset()
show()

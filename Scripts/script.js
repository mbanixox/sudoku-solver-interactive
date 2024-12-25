// The 9x9 grid with initial values, where 0 represents an empty cell
// The grid is a 2D array with 9 rows and 9 columns
let grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var numSelected = null;
var tileSelected = null;

document.getElementById("clear-btn").addEventListener("click", clearBoard);

window.onload = function() {
    drawGame();
    document.getElementById("solve-btn").addEventListener("click", solvePuzzle);
}

// Check if placing a number is valid for a given row, column
function isValidMove(grid, row, column, number) {
    // Check if number is in row
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === number) {
            return false;
        }
    }

    // Check if number is in column
    for (let x = 0; x < 9; x++) {
        if (grid[x][column] === number) {
            return false;
        }
    }

    // Check 3x3 square grids
    const cornerRow = row - (row % 3);
    const cornerColumn = column - (column % 3);
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (grid[cornerRow + x][cornerColumn + y] === number) {
                return false;
            }
        }
    }

    return true;
}

function solve(grid, row = 0, column = 0) {
    // If we reach the end of a row, go to the next row
    if (column === 9) {
        if (row === 8) {
            return true; // Reached the end of the grid, solution found
        }
        row++;
        column = 0;
    }

    // Skip cells that are already filled
    if (grid[row][column] !== 0) {
        return solve(grid, row, column + 1);
    }

    // Try placing numbers 1-9
    for (let num = 1; num <= 9; num++) {
        if (isValidMove(grid, row, column, num)) {
            grid[row][column] = num;

            // Recursively try to fill in the rest of the grid
            if (solve(grid, row, column + 1)) {
                return true;
            }

            // Backtrack if placing num didn't lead to a solution
            grid[row][column] = 0;
        }
    }

    return false;
}

function drawGame () {

    // Create the digits 1-9 to select numbers
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Create the 9x9 board
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            
            // Create a unique id for each tile (0-0 to 8-8)
            tile.id = r.toString() + "-" + c.toString();
               
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }

}

// Select a number from the digits
function selectNumber(){
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    // Highlight the selected number
    numSelected = this;
    numSelected.classList.add("number-selected");
}

// Select a tile on the board
function selectTile() {
    if (numSelected) {
        
        // "0-0" "0-1" .. "8-8" coordinates
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        // Update the tile and grid with the selected number
        this.innerText = numSelected.id;
        this.style.color = "red";
        grid[r][c] = Number(numSelected.id);
        console.log(grid);
    }
}

// Solve the puzzle and update the board
function solvePuzzle() {
    if (solve(grid)) {
        updateBoard();
    } else {
        alert("No solution found for this puzzle");
    }
}

// Update the board with the solved Sudoku
function updateBoard() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = grid[r][c] !== 0 ? grid[r][c] : "";
        }
    }
}

// Clear the board
function clearBoard() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "";
            grid[r][c] = 0;
        }
    }
}

/*
// Output the solved Sudoku on console
if (solve(grid)) {
    for (let i = 0; i < 9; i++) {
        console.log(grid[i].join(" "));
    }
} else {
    console.log("No solution for this sudoku");
}
*/

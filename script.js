// Get the container element where the table will be inserted
var container = document.getElementById("tableContainer");
var button = document.getElementById("createArrayButton");
var clearButton = document.createElement("button");
clearButton.innerHTML = "Clear";
clearButton.setAttribute("id", "clearButton");
clearButton.onclick = function () {
  // loop through the input elements and set their value to 0
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      table.rows[i].cells[j].children[0].value = 0;
    }
  }
};
button.parentNode.insertBefore(clearButton, button.nextSibling);

// Create the table element
var table = document.createElement("table");
// Create the 9 rows of the table
for (var i = 0; i < 9; i++) {
  var row = document.createElement("tr");
  // Create the 9 cells of each row
  for (var j = 0; j < 9; j++) {
    var cell = document.createElement("td");
    var input = document.createElement("input");
    input.type = "number";
    input.min = 0;
    input.max = 9;
    input.value = 0;
    input.oninput = function () {
      if (this.value > 9) {
        this.value = 9;
      }
    };
    cell.appendChild(input);
    row.appendChild(cell);
  }
  // Add the row to the table
  table.appendChild(row);
}
// Add the table to the container element
container.appendChild(table);
// get the button
var button = document.getElementById("createArrayButton");
button.onclick = function () {
  // create the 2D array
  var inputArray = [];
  for (var i = 0; i < 9; i++) {
    var rowArray = [];
    for (var j = 0; j < 9; j++) {
      var input = table.rows[i].cells[j].children[0];
      rowArray.push(input.value);
    }
    inputArray.push(rowArray);
  }
  solveSudoku(inputArray, table);
};
function solveSudoku(grid) {
  // function to check if the number is safe to place
  function isSafe(grid, row, col, num) {
    // check in row
    for (var x = 0; x < 9; x++) {
      if (grid[row][x] == num) {
        return false;
      }
    }
    // check in column
    for (var x = 0; x < 9; x++) {
      if (grid[x][col] == num) {
        return false;
      }
    }
    // check in subgrid
    var startRow = row - (row % 3);
    var startCol = col - (col % 3);
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] == num) {
          return false;
        }
      }
    }
    return true;
  }
  function solve(grid) {
    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        // if the cell is empty
        if (grid[row][col] == 0) {
          // trying numbers from 1 to 9
          for (var num = 1; num <= 9; num++) {
            if (isSafe(grid, row, col, num)) {
              grid[row][col] = num;
              if (solve(grid)) {
                return true;
              } else {
                grid[row][col] = 0;
              }
            }
          }
          return false; // triggers backtracking
        }
      }
    }
    return true;
  }
  solve(grid);
  //update the input values
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var input = table.rows[i].cells[j].children[0];
      input.value = grid[i][j];
    }
  }
}

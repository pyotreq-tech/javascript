(function () {
    var currentPlayer = "player1";

    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);

        // console.log(col.index()); - to check which column has been clicked
        var slotsInCol = col.children();

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
        if (i === -1) {
            return;
        }
        diagonalLeft();
        function diagonalLeft() {
            var sum = col.index() + i;
            var newArr = [];
            var newItem;
            for (var j = 0; j < 7; j++) {
                var curColIndex = parseInt($(".column").eq(j).index());
                for (var k = 0; k < 6; k++) {
                    if (curColIndex + k === sum) {
                        newItem = $(".column").eq(curColIndex).children().eq(k);
                        newArr.push(newItem);
                    }
                }
            }
            console.log(newArr);
            return newArr;
        }

        //to clear the function and console.log all slots
        // var allSlots = $(".slot");
        // console.log(allSlots);
        //location.reload - cheat

        var slotsInRow = $(".row" + i);
        if (checkForVictory(slotsInCol)) {
            console.log("column victory");
            //victory, reset a game, remove classes etc.
        } else if (checkForVictory(slotsInRow)) {
            console.log("row victory");
        }
        switchPlayer();

        //Checking of the columns and rows coordinates of clicked items
    });

    // checkForDiagonals();
    // function checkForDiagonals(slotsInCol, slotsInRow) {
    //     for (var i = 0; i < slotsInCol; i++) {
    //         console.log("Check for diagonals:", slotsInCol);
    //     }
    // return true;
    // }

    // Approach number 1
    // var diags = [
    //     [0, 7, 14, 21],
    //     [6, 13, 20, 27],
    //     [12, 19, 26, 33],
    // ];
    // and loop through them - easier, not recommended approach

    //Approach number: 2 column number I want go minut 3 columns and plus 3 rows,
    // then push seven elements to array to check

    //Approach number 4: +7, +5, but we can meet with 1 extra number, additional check that
    //each column is sequential, columns next to each other

    //Approach number 3 we look at the board in tearms of row and columns again
    //We loop over each slot, we take each slot and check 4 down and for up
    //It's called 84 times

    //Approach number 5: col + row approach. You sum up columns plus rows
    //all the 1, 2, 3, 4, 5.. they go the same direction

    //Approach col minus row:
    //We know the row thanks to i
    //We know columns
    //We loop over arrays with arrays

    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            var slot = $(slots[i]);
            if (slot.hasClass(currentPlayer)) {
                count++;
                console.log(count);
                if (count === 4) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function switchPlayer() {
        if (currentPlayer === "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }
})();

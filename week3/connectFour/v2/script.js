//--- VERSION 2: flexible rows and columns ---
(function () {
    //initial setup
    playGame(7, 4);
    //Adjusting the numbers of rows and columns
    $("input").on("input", function () {
        var showColumns = $("#input-columns-p");
        // var showRows = $("#input-rows-p");
        var showWinningCount = $("#dots-connected-p");
        var columns = parseInt($("#input-columns").val());
        // var rows = $("#input-rows").val();
        var winningCount = parseInt($("#dots-connected").val());
        var stars = $(".stars");
        showColumns.html($("#input-columns").val());
        // showRows.html($("#input-rows").val());
        showWinningCount.html($("#dots-connected").val());
        var starsHtml = "";
        for (var i = 0; i < winningCount; i++) {
            starsHtml += "<div class='star'></div>";
        }
        stars.html(starsHtml);
        playGame(columns, winningCount);
    });

    $("#start").on("click", function () {
        $("#setup").hide();
    });

    function playGame(columns, winningCount) {
        var board = $("#board");
        var currentPlayer = "player1";

        //Starting set up for Columns and rows
        boardSetUpColumns();
        var column = $(".column");
        boardSetUpRows();

        function boardSetUpColumns() {
            var boardColumnsHtml = "";
            for (var i = 0; i < columns; i++) {
                boardColumnsHtml += "<div class='column'></div>";
            }
            board.html(boardColumnsHtml);
        }

        function boardSetUpRows() {
            var boardRowsHtml = "";
            for (var i = 0; i < 6; i++) {
                boardRowsHtml +=
                    "<div class='slot row" +
                    [i] +
                    "'><div class='hole'></div></div>";
            }
            column.html(boardRowsHtml);
        }

        //Actual game mechanics here:

        $(".column").on("click", function (e) {
            var col = $(e.currentTarget);

            // console.log(col.index()); - to check which column has been clicked
            var slotsInCol = col.children();
            // console.log(slotsInCol);

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

            //to clear the function and console.log all slots
            // var allSlots = $(".slot");
            // console.log(allSlots);
            //location.reload - cheat

            // DIAGONAL START

            function diagonalRight() {
                var sum = col.index() + i;
                var newArrRight = [];
                var newItemRight;
                for (var j = 0; j < columns; j++) {
                    var curColIndex = parseInt($(".column").eq(j).index());
                    for (var k = 0; k < 6; k++) {
                        if (curColIndex + k === sum) {
                            $(".column").eq(curColIndex).children().eq(k);
                            newItemRight = $(".column")
                                .eq(curColIndex)
                                .children()
                                .eq(k);
                            newArrRight.push(newItemRight);
                        }
                    }
                }
                // console.log(newArrRight);
                return newArrRight;
            }

            function diagonalLeft() {
                var sum = col.index() - i;
                var newArrLeft = [];
                var newItemLeft;
                for (var j = columns - 1; j >= 0; j--) {
                    var curColIndex = parseInt($(".column").eq(j).index());
                    for (var k = 0; k < 6; k++) {
                        if (curColIndex - k === sum) {
                            newItemLeft = $(".column")
                                .eq(curColIndex)
                                .children()
                                .eq(k);
                            newArrLeft.push(newItemLeft);
                        }
                    }
                }
                // console.log(newArrLeft);
                return newArrLeft;
            }

            //DIAGONAL END

            var slotsInRow = $(".row" + i);

            // console.log(slotsInRow);
            if (checkForVictory(slotsInCol)) {
                console.log("column victory");
                //victory, reset a game, remove classes etc.
                // return;
            } else if (checkForVictory(slotsInRow)) {
                console.log("row victory");
                // return;
            } else if (checkForVictory(diagonalRight())) {
                console.log("diagonal-right victory");
                // return;
            } else if (checkForVictory(diagonalLeft())) {
                console.log("diagonal-left victory");

                // return;
            }
            switchPlayer();
        });

        function checkForVictory(slots) {
            var winners = [];
            var count = 0;
            for (var i = 0; i < slots.length; i++) {
                var slot = $(slots[i]);

                if (slot.hasClass(currentPlayer)) {
                    // console.log("slot:", slot);
                    count++;

                    winners.push(slot);
                    console.log("winners:", winners);
                    // console.log(count);

                    if (count === winningCount) {
                        // winners.slice(0, winningCount - 3);
                        console.log(winners);
                        winners.forEach(function (element) {
                            element.addClass("victory-winner");
                        });
                        return true;
                    }
                } else {
                    count = 0;
                    winners = [];
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
    }
})();

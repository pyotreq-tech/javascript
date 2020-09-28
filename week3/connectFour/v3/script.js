//--- VERSION 3: Victory handled ---
(function () {
    var playerOneScore = 0;
    var playerTwoScore = 0;

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

    function playGame(columns, winningCount) {
        var board = $("#board");
        var currentPlayer = "player1";

        //Event listeners for navigation buttons

        enterListener();
        function enterListener() {
            $("body").on("keyup", function firstEnter(e) {
                if (e.keyCode === 13) {
                    $("#setup").hide();
                    // $("body").unbind("keyup");
                    // $("#player1").addClass("focus-one");
                    playGame(columns, winningCount);
                    $("body").unbind("keyup");
                }
            });
            // $("html").unbind("keyup");
        }

        function victoryContinueListener() {
            $("body").on("keyup", function (e) {
                if (e.keyCode === 13) {
                    $(".message-winner").addClass("hidden");
                    $("#setup").hide();
                    $("#player1.star").removeClass("victory-winner");
                    $("#player2.star").removeClass("victory-winner");
                    $("body").unbind("keyup");
                    // $("#player1").addClass("focus-one");
                    playGame(columns, winningCount);
                }
            });
        }
        function victorySettingsListener() {
            $("body").on("keyup", function (e) {
                if (e.keyCode === 32) {
                    $("#player1.star").removeClass("victory-winner");
                    $("#player2.star").removeClass("victory-winner");
                    $(".message-winner").addClass("hidden");
                    $(".setup-message").removeClass("hidden");
                    // enterListener();
                    playGame(columns, winningCount);
                }
            });
        }

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
                victory();
                //victory, reset a game, remove classes etc.
                // return;
            } else if (checkForVictory(slotsInRow)) {
                // console.log("row victory");
                victory();

                // return;
            } else if (checkForVictory(diagonalRight())) {
                // console.log("diagonal-right victory");
                victory();

                // return;
            } else if (checkForVictory(diagonalLeft())) {
                // console.log("diagonal-left victory");
                victory();

                // return;
            }
            switchPlayer();
        });

        $("#reset-score-button").on("click", function () {
            playerOneScore = 0;
            playerTwoScore = 0;
            $("#player1").html(playerOneScore);
            $("#player2").html(playerTwoScore);
        });

        $("#settings-score-button").on("click", function () {
            $("#setup").show();
            $(".setup-message").removeClass("hidden");
            $(".message-winner").addClass("hidden");
            $("body").on("keydown", function (e) {
                if (e.keyCode === 27) {
                    $("#setup").hide();
                    $("body").unbind("keydown");
                }
            });
        });

        function victory() {
            // $("#player1").removeClass("focus-one");
            // $("#player2").removeClass("focus-two");
            console.log("current player:", currentPlayer);
            $(".column").unbind("click");
            $("#reset-score-button").unbind("click");
            $("#settings-score-button").unbind("click");
            if (currentPlayer == "player1") {
                playerOneScore += 1;
                $("#player1.star").addClass("victory-winner");
                $("#player1").html(playerOneScore);
                console.log(playerOneScore);
            } else if (currentPlayer == "player2") {
                playerTwoScore += 1;
                $("#player2").html(playerTwoScore);
                $("#player2.star").addClass("victory-winner");
            }
            setTimeout(function () {
                $("#setup").show();
                $(".message-winner").removeClass("hidden");
                $(".setup-message").addClass("hidden");
                victoryContinueListener();
                victorySettingsListener();
            }, 3000);
        }

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
                // console.log(currentPlayer);
                playerLight();
            } else {
                currentPlayer = "player1";
                playerLight();
                // console.log(currentPlayer);
            }
        }

        // function playerLight() {
        //     // console.log("player1");
        //     if (currentPlayer === "player2") {
        //         // console.log(currentPlayer);
        //         $("#player1").removeClass("focus-one");
        //         $("#player2").addClass("focus-two");
        //     } else {
        //         console.log(currentPlayer);
        //         $("#player1").addClass("focus-one");
        //         $("#player2").removeClass("focus-two");
        //     }
        // }
    }
})();

//--- VERSION 4: Final version ---
(function () {
    var playerOneScore = 0;
    var playerTwoScore = 0;

    //Initial setup of the game so it can run in background while settings are being changed

    playGame(7, 4);

    //Adjusting the numbers of rows and columns - settings screen

    $("input").on("input", function () {
        var showColumns = $("#input-columns-p");
        var showWinningCount = $("#dots-connected-p");
        var columns = parseInt($("#input-columns").val());
        var winningCount = parseInt($("#dots-connected").val());
        var stars = $(".stars");
        showColumns.html($("#input-columns").val());
        showWinningCount.html($("#dots-connected").val());

        var starsHtml = "";
        for (var i = 0; i < winningCount; i++) {
            starsHtml += "<div class='star'></div>";
        }

        stars.html(starsHtml);

        //Initializing the game after changed settings
        playGame(columns, winningCount);
    });

    //Main game function

    function playGame(columns, winningCount) {
        var board = $("#board");
        var currentPlayer = "player1";
        var victoryCheck = false;

        //Event listeners for navigation buttons

        enterListener();
        function enterListener() {
            $("body").on("keyup", function firstEnter(e) {
                if (e.keyCode === 13) {
                    $("#setup").hide();
                    // $("body").unbind("keyup");
                    $("#player1").addClass("focus-one");
                    playGame(columns, winningCount);
                    // $("#player1").addClass("focus-one");
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
                    $("#player1").addClass("focus-one");
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
                    enterListener();
                    playGame(columns, winningCount);
                    $("#player1").addClass("focus-one");
                }
            });
        }

        //Here rows and columns are being created basing on settings input

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

        //Actual game mechanics here, while mousebutton is pressed:

        $(".column").on("click", function (e) {
            var col = $(e.currentTarget);
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

            // Diagonal check begins here -whoo that was a challenge!

            var right = function () {
                var sum = col.index() + i;
                var newArr = [];
                var newItem;
                for (var j = 0; j < columns; j++) {
                    var curColIndex = parseInt($(".column").eq(j).index());
                    for (var k = 0; k < 6; k++) {
                        if (curColIndex + k === sum) {
                            $(".column").eq(curColIndex).children().eq(k);
                            newItem = $(".column")
                                .eq(curColIndex)
                                .children()
                                .eq(k);
                            newArr.push(newItem);
                        }
                    }
                }
                return newArr;
            };

            var left = function () {
                var sum = col.index() - i;
                var newArr = [];
                var newItem;
                for (var j = columns - 1; j >= 0; j--) {
                    var curColIndex = parseInt($(".column").eq(j).index());
                    for (var k = 0; k < 6; k++) {
                        if (curColIndex - k === sum) {
                            newItem = $(".column")
                                .eq(curColIndex)
                                .children()
                                .eq(k);
                            newArr.push(newItem);
                        }
                    }
                }
                return newArr;
            };

            //All good things come to en end, diagonal victory check ends here

            //Animation while mouse is entered

            $(".column").on("mouseenter", function (e) {
                $(e.currentTarget).children().addClass("on-mouse-enter");
            });

            //Animation while mouse is down

            $(".column").on("mouseleave", function (e) {
                $(e.currentTarget).children().removeClass("on-mouse-enter");
            });

            //Logic while victory is true

            function victory() {
                //First all buttons are unable to click after winning animation is performed

                $(".column").unbind("click");
                $("#reset-score-button").unbind("click");
                $("#settings-score-button").unbind("click");

                //Score is being updated here

                $("#player1").removeClass("focus-one");
                $("#player2").removeClass("focus-two");

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

                victoryCheck = true;

                //After few seconds with animation actual ending screen is appearing

                setTimeout(function () {
                    $("#setup").show();
                    $(".message-winner").removeClass("hidden");
                    $(".setup-message").addClass("hidden");
                    victoryContinueListener();
                    victorySettingsListener();
                }, 3000);
            }

            //Below is the victory check calling for all 4 types of victories

            var slotsInRow = $(".row" + i);

            if (checkForVictory(slotsInCol)) {
                victory();
            } else if (checkForVictory(slotsInRow)) {
                victory();
            } else if (checkForVictory(right())) {
                victory();
            } else if (checkForVictory(left())) {
                victory();
            } else if (victoryCheck === false) {
                switchPlayer();
            }
        });

        //Setup for nav Reset score menu

        $("#reset-score-button").on("click", function () {
            playerOneScore = 0;
            playerTwoScore = 0;
            $("#player1").html(playerOneScore);
            $("#player2").html(playerTwoScore);
        });

        //Setup for nav Settings menu

        $("#settings-score-button").on("click", function () {
            $("#setup").show();
            $(".setup-message").removeClass("hidden");
            $(".message-winner").addClass("hidden");
            enterListener();
            $("body").on("keydown", function (e) {
                if (e.keyCode === 27) {
                    $("#setup").hide();
                    // $("body").unbind("keydown");
                }
            });
        });

        //switchPlayer function

        function switchPlayer() {
            if (currentPlayer === "player1") {
                currentPlayer = "player2";
                playerLight();
            } else {
                currentPlayer = "player1";
                playerLight();
            }
        }

        //Victory checked for dynamic generated arrays

        function checkForVictory(slots) {
            var winners = [];
            var count = 0;
            for (var i = 0; i < slots.length; i++) {
                var slot = $(slots[i]);

                if (slot.hasClass(currentPlayer)) {
                    count++;
                    winners.push(slot);

                    if (count === winningCount) {
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

        function playerLight() {
            // console.log("player1");
            if (currentPlayer === "player1") {
                // console.log(currentPlayer);
                $("#player2").removeClass("focus-two");
                $("#player1").addClass("focus-one");
            } else {
                console.log(currentPlayer);
                $("#player1").removeClass("focus-one");
                $("#player2").addClass("focus-two");
            }
        }
    }
})();

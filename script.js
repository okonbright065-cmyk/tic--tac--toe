document.addEventListener("DOMContentLoaded", () => {

    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");

    let currentPlayer = "X";
    let board = Array(9).fill("");
    let gameActive = true;

    let scoreX = 0;
    let scoreO = 0;

    const winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleClick(cell, index));
    });

    function handleClick(cell, index){

        if(board[index] !== "" || !gameActive){
            return;
        }

        board[index] = currentPlayer;

        cell.textContent = currentPlayer;

        cell.classList.add(currentPlayer === "X" ? "x" : "o");

        checkWinner();

        if(gameActive){
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function checkWinner(){

        for(let pattern of winPatterns){
            const [a,b,c] = pattern;

            if(board[a] && board[a] === board[b] && board[a] === board[c]){

                gameActive = false;

                cells[a].classList.add("winner");
                cells[b].classList.add("winner");
                cells[c].classList.add("winner");

                message.textContent = `🎉 Player ${currentPlayer} Wins!`;

                if(currentPlayer === "X"){
                    scoreX++;
                    document.getElementById("scoreX").textContent = scoreX;
                } else {
                    scoreO++;
                    document.getElementById("scoreO").textContent = scoreO;
                }

                setTimeout(resetBoard, 2000);
                return;
            }
        }

        if(!board.includes("")){
            gameActive = false;
            message.textContent = "😅 It's a Draw!";
            setTimeout(resetBoard, 2000);
        }
    }

    function resetBoard(){

        board = Array(9).fill("");
        gameActive = true;
        currentPlayer = "X";

        cells.forEach(cell => {
            cell.textContent = "";
            cell.className = "cell";
        });

        message.textContent = "Player X's Turn";
    }

    window.resetGame = function(){
        scoreX = 0;
        scoreO = 0;

        document.getElementById("scoreX").textContent = 0;
        document.getElementById("scoreO").textContent = 0;

        resetBoard();
    };

});
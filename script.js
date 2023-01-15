

function setupGame() // Function to setup game window for player
{
    matchStatus.innerText = "Click on the Play Button to start the game."
}

function startGame()  // Function to start tha game 
{
    matchStatus.innerText = "X's Turn.";
    count = 0;
    isPlayPressed = false;
}

function restartGame() // Function to restart the game 
{
    count = 0;
    isPlayPressed = false;
    Array.from(elements).forEach((element)=>{
        element.innerText = "";
    })
    location.reload();
}

function player(count)  // Function to get the current player 
{
    return (count%2 === 0)?("X"):("0");
}

function changePlayer() // Function to change the turn of the player 
{
    count++;
    matchStatus.innerText = (player(count) === "X")?("X's Turn."):("0's Turn.");
    (player(count) === "X")?(turnXMusic.play()):(turn0Music.play());
}

function isWiningCondition() // Function to check winning condition 
{
    if((elements[0].innerText !== "")&&(elements[0].innerText == elements[1].innerText)&&(elements[0].innerText == elements[2].innerText))
    {
        elements[0].style.color = "orange";
        elements[1].style.color = "orange";
        elements[2].style.color = "orange";
        return true;
    }   
    else if((elements[3].innerText !== "")&&(elements[3].innerText == elements[4].innerText)&&(elements[3].innerText == elements[5].innerText))
    {
        elements[3].style.color = "orange";
        elements[4].style.color = "orange";
        elements[5].style.color = "orange";
        return true;
    }   
    else if((elements[6].innerText !== "")&&(elements[6].innerText == elements[7].innerText)&&(elements[6].innerText == elements[8].innerText))
    {
        elements[6].style.color = "orange";
        elements[7].style.color = "orange";
        elements[8].style.color = "orange";
        return true;
    }   
    else if((elements[0].innerText !== "")&&(elements[0].innerText == elements[3].innerText)&&(elements[0].innerText == elements[6].innerText))
    {
        elements[0].style.color = "orange";
        elements[3].style.color = "orange";
        elements[6].style.color = "orange";
        return true;
    }   
    else if((elements[1].innerText !== "")&&(elements[1].innerText == elements[4].innerText)&&(elements[1].innerText == elements[7].innerText))
    {
        elements[1].style.color = "orange";
        elements[4].style.color = "orange";
        elements[7].style.color = "orange";
        return true;
    }   
    else if((elements[2].innerText !== "")&&(elements[2].innerText == elements[5].innerText)&&(elements[2].innerText == elements[8].innerText))
    {
        elements[2].style.color = "orange";
        elements[5].style.color = "orange";
        elements[8].style.color = "orange";
        return true;
    }   
    else if((elements[0].innerText !== "")&&(elements[0].innerText == elements[4].innerText)&&(elements[0].innerText == elements[8].innerText))
    {
        elements[0].style.color = "orange";
        elements[4].style.color = "orange";
        elements[8].style.color = "orange";
        return true;
    }   
    else if((elements[2].innerText !== "")&&(elements[2].innerText == elements[4].innerText)&&(elements[2].innerText == elements[6].innerText))
    {
        elements[2].style.color = "orange";
        elements[4].style.color = "orange";
        elements[6].style.color = "orange";
        return true;
    }   
    else
        return false;
}

function isDrawnCondition() // Function to check match draw condition 
{
    let condition = true;
    Array.from(elements).forEach((element)=>{
        if(element.innerText === "")
            condition =  false;
    })
    return condition;
}

// Importing Music Files 
const turnXMusic = new Audio("TurnOfX.mp3");
const turn0Music = new Audio("TurnOf0.mp3");
const wonXMusic = new Audio("XWon.mp3");
const won0Music = new Audio("0Won.mp3");
const matchDrawnMusic = new Audio("MatchDrawn.mp3");
const restartGameMusic = new Audio("RestartGame.mp3");
const tingMusic = new Audio("Ting.mp3");

// Creating helping Variables 
let count;
let isPlayPressed;

// Targeting elements from HTML 
const matchStatus = document.getElementById("status");
const btn = document.getElementById("btn");
const elements = document.getElementsByClassName("element");

// Adding click listeners to the elements 
btn.addEventListener("click", ()=>{
    if(!isPlayPressed)
    {
        tingMusic.play();
        setTimeout(()=>{
            startGame();
            turnXMusic.play();
            btn.innerText = "Restart";
            isPlayPressed = true;
        }, 500)
    }
    else
    {
        tingMusic.play();
        setTimeout(()=>{
            restartGame();
            btn.innerText = "Play";
        }, 500)
    }
});

Array.from(elements).forEach((element)=>{
    element.addEventListener("click", ()=>{
        if(isPlayPressed && !isWiningCondition() && element.innerText === "")
        {
            element.innerText = player(count);
            if(isWiningCondition())
            {
                matchStatus.innerText = player(count) + " has been won the match.";
                (player(count) === "X")?(wonXMusic.play()):(won0Music.play());
                setTimeout(()=>{
                    matchStatus.innerText = "Click on the Restart Button to restart the game.";
                    restartGameMusic.play();
                    setInterval(()=>{
                        if(isPlayPressed)
                        btn.style.backgroundColor = "red";
                    }, 250);
                    setInterval(()=>{
                        if(isPlayPressed)
                        btn.style.backgroundColor = "rgb(8, 230, 8)";
                    }, 500);
                }, 2000)
            }
            else
            {
                if(isDrawnCondition())
                {
                    matchStatus.innerText = "The match has been drawn.";
                    matchDrawnMusic.play();
                    setTimeout(()=>{
                        matchStatus.innerText = "Click on the Restart Button to restart the game.";
                        restartGameMusic.play();
                        setInterval(()=>{
                            if(isPlayPressed)
                            btn.style.backgroundColor = "red";
                        }, 250);
                        setInterval(()=>{
                            if(isPlayPressed)
                            btn.style.backgroundColor = "rgb(8, 230, 8)";
                        }, 500);
                    }, 2000)
                }
                else
                    changePlayer();
            }
        }
    });
})

// Getting game window ready for user when user visit to website
setupGame();

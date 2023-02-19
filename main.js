// First Part (Start Window)
let start = document.querySelector(".control-buttons span");
let Name = document.querySelector(".info-container .name span");
start.onclick = function(){
    let yourName = prompt("Type Your Name Please");
    if(yourName == null || yourName == ""){
        Name.innerHTML = "UnKnown";
    }
    else {
        Name.innerHTML = yourName;
    }
    start.parentElement.remove();
};

// Second Part (Blocks Flipping)
// Effect Duration
let duration = 1000;
// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");
// Create Array Of Game Blocks
let blocks = Array.from(blocksContainer.children);
// Create Range Of Keys
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);
// Add Order Css Property To Game Blocks
blocks.forEach((block,index) => {
    // Add Order Css Property
    block.style.order = orderRange[index];
    // Add Click Event
    block.addEventListener("click",function () {
        // Trigger FlipBlock Function
        flipBlock(block);
    });
})

// Flip Block Function
function flipBlock(selectedBlock) {
    // Add is-flipped Class
    selectedBlock.classList.add("is-flipped");
    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));
    // If There Is Two Selected Blocks
    if(allFlippedBlocks.length === 2) {
        
        // Stop Clicking Function
        stopClicking();
        // Check Matched Blocks Function
        checkMatchedBlocks(allFlippedBlocks[0],allFlippedBlocks[1]);
    }

}

// Stop Clicking Function
function stopClicking() {
    // Add Class No Clicking on Main Container
    blocksContainer.classList.add("no-clicking");

    // Time Out To Remove No Clicking Class
    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking")
    }, duration);
}

// Check Matching Function
function checkMatchedBlocks (firstBlock,secondBlock) {
    let triesElement = document.querySelector(".tries span");
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.getElementById("success").play();
    }
    else {
        triesElement.innerHTML++;
        if(triesElement.innerHTML == 10){
            gameOver();
        }
        document.getElementById("fail").play();
        setTimeout(()=>{
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        },duration)
    }
}

// Shuffle Function
function shuffle(array) {
    let current = array.length;
    while(current > 0){
        // Get Random Number
        random = Math.floor(Math.random() * current);
        // Decrease Length By 1
        current--;
        [array[current],array[random]] = [array[random], array[current]];
    }
    return array;
}

// Function To Show Game Over Message  
function gameOver(){
    let gameOverMessage = document.createElement("div");
    gameOverMessage.className = "control-buttons";
    let span = document.createElement("span");
    let txt = document.createTextNode("Game Over!");
    span.appendChild(txt);
    gameOverMessage.appendChild(span);
    document.body.appendChild(gameOverMessage);
}
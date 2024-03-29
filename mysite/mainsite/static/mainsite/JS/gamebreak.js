//global objects for the game
let player, enemy, enemys, bullet, bullets, boss, gameHandler, myGameArea;
//global boolean for the game engine
let gamePlaying;

//difficulty level for game preset to 1
let difficultyLevel = 1


/**
 * Fucntion to validate the numbers only in the input text box
 * @param (Event) evt
 **/
function isNumber(evt) {
    let iKeyCode = (evt.which) ? evt.which : evt.keyCode
    if ((iKeyCode != 46 && iKeyCode != 45) && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
        return false;
    }
    return true;
}


/**
  MoveableCanvasObject class is all objects that are moveable on the canavs
**/
class MoveableCanvasObject {
    constructor(width, height, x, y, color) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    //update the canvas
    update() {
        let ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //get the new position of the obejct
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

}

/**
 * player class used used to update sandbox speed and postion on canvas/map clipping
 **/
class Player extends MoveableCanvasObject {
    constructor(width, height, x, y, color, killCount, roundCount) {
        super(width, height, x, y, color);
        this.speedX = 0;
        this.speedY = 0;
        this.killCount = killCount;
        this.roundCount = roundCount;
        this.arrowButtons = false;
    }
    /**
     * if a arrow button is pressed arrowButton is true this runs the code only once
     * otherwise an arrow key is pressed and arrowButtons = false so the code runs every 20mill
     * because the game engine is calling it for constant updates this give mobile users better control of the player
     **/
    resetSpeed() {
        if (!this.arrowButtons) {
            player.speedX = 0;
            player.speedY = 0;
        }
        this.arrowButtons = false;
    }
    //map clipping - check if the player is inside the map
    checkPosition() {
        const maxY = 568;
        const maxX = 295;
        const minXAndY = 0;

        if (this.y <= minXAndY) {
            this.y = minXAndY;
        }
        if (this.y >= maxY) {
            this.y = maxY;
        }
        if (this.x <= minXAndY) {
            this.x = minXAndY;
        }
        if (this.x >= maxX) {
            this.x = maxX;
        }
    }
}


//npc/ enemy constructor
class Npc extends MoveableCanvasObject {
    constructor(width, height, x, y, color) {
        super(width, height, x, y, color);
        this.speedX = 0;
    }
    //Override MoveableCanvasObject
    newPos() {
        this.x += this.speedX;
    }
}


//bullet class
class Bullet extends MoveableCanvasObject {
    constructor(width, height, x, y, color) {
        super(width, height, x, y, color);
        this.speedY = 0;
    }
    //override MoveableCanvasObject
    newPos() {
        this.y += this.speedY;
    }
    shoot() {
        //this.x is set to center of the player
        this.x = (player.x + player.width - this.width + 2) - (player.width / 2);
        this.y = player.y;
        this.speedY = -10;
    }

    /**
     * @param {Object} otherobj
     * @returns {boolean} crash
     * The method for checking whether the bullet has hit any object on the canvas
     **/
    crashWith(otherobj) {
        let crash = true;
        if (otherobj != undefined) {
            let myleft = this.x;
            let myright = this.x + (this.width);
            let mytop = this.y;
            let mybottom = this.y + (this.height);
            let otherleft = otherobj.x;
            let otherright = otherobj.x + (otherobj.width);
            let othertop = otherobj.y;
            let otherbottom = otherobj.y + (otherobj.height);
            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }
        }
        return crash;
    }
}





//game handlers handles all game related specs
class Game_Handler {
    constructor(round) {
        this.round = round;
    }

    /**
     * If enemies or boss pass the player and touch the bottom of canavs then game over
     **/
    checkWin() {
        //if enemies y greater then 590 the game is over
        const gameWinY = 590;
        //for enemies
        for (let i = 0; i < enemys.length; i++) {
            if (enemys[i].y > gameWinY && enemys[i].x != undefined && enemys[i].y != undefined) {
                gamePlaying = false;
                myGameArea.gameOver();
                myGameArea.scoreMenu();
            }
        }
        //for bosses
        for (let i = 0; i < boss.length; i++) {
            if (boss[i].y > gameWinY && boss[i].x != undefined && boss[i].y != undefined) {
                gamePlaying = false;
                myGameArea.gameOver();
                myGameArea.scoreMenu();
            }
        }
    }

    /**
     * Method for handling crashes with enemies
     * if the bullet hits the enemy slice the enemy from the array and add a kill count
     **/
    checkCrashHandle() {
        for (let i = 0; i < enemys.length; i++) {
            for (let j = 0; j < bullets.length; j++) {
                if (bullets[j].crashWith(enemys[i]) && enemys[i] != undefined) {
                    enemys.splice(enemys.indexOf(enemys[i]), 1);
                    bullets.splice(bullets.indexOf(bullets[j]), 1);
                    this.roundHandler();
                    player.killCount += 1;
                    this.updateScoreMenu();

                }
            }
        }
    }

    /**
     * subroutine for handling rounds
     * rounds fomula is killCount % 10 == 0 then add a round
     * round 80 is max round
     * eqution round is every 3 rounds
     **/
    roundHandler() {
        const maxRound = 80;
        if (player.roundCount < maxRound) {
            player.roundCount += 1;
        }

        if (player.killCount % 10 === 0) {
            this.round += 1;
        }
    }
    /**
     * Method for handling crashes with bosses
     * if the bullet hits the boss slice the enemy from the array and add a kill count
     * does not give points
     **/
    checkCrashHandleBoss() {
        for (let i = 0; i < bullets.length; i++) {
            for (let j = 0; j < boss.length; j++) {
                if (bullets[i].crashWith(boss[j]) && boss[j] != undefined) {
                    boss.splice(boss.indexOf(boss[j]), 1);
                }
            }
        }
    }

    //spawn bullet from player shooting
    spawnBullet() {
        let bullet = new Bullet(5, 10, -2, -2, 'black');
        bullet.shoot();
        bullets.push(bullet);
    }

    /**
     * spawn enemies method spawns enemies based on the round and interval
     * fromula interval 120 (constant) - round % 1 == 0
     * This allows for enemies to spawn based off of current round
     **/
    spawnEnemies() {
        const enemiesMaxXPos = 240;
        const playerDivider = 80;
        const width = 30;
        const height = 30;
        const firstY = -5;
        const secondY = -12

        let randomX = Math.floor(Math.random() * enemiesMaxXPos);
        let randomX2 = Math.floor(Math.random() * enemiesMaxXPos);
        if (myGameArea.framNo === 1 || myGameArea.everyInterval(playerDivider - player.roundCount)) {
            if (this.round > 20) {
                enemys.push(new Npc(width, height, randomX, firstY, 'blue'));
                enemys.push(new Npc(width, height, randomX2, secondY, 'blue'));
            } else {
                enemys.push(new Npc(width, height, randomX, firstY, 'blue'));
            }

            //spawn boss fomula round % 3 == 0
            if (this.round % 3 == 0 && this.round != 0) {
                this.spawnBoss();
            }

        }
    }


    //update enemies method to manage enemies speed on canvas
    updateEnemies() {
        //loop threw enemys and update as the rounds increase the speed increases
        for (let i = 0; i < enemys.length; i++) {
            if (this.round < 5) {
                enemys[i].y += 1.25;
            } else if (this.round < 10) {
                enemys[i].y += 1.30;
            } else if (this.round < 15) {
                enemys[i].y += 1.40;
            } else if (this.round < 20) {
                enemys[i].y += 1.50;
            } else {
                enemys[i].y += 2;
            }
            enemys[i].update();
        }
    }

    //update bullets to maintain speed and position on canvas
    updateBullets() {
        //update bullet
        for (let j = 0; j < bullets.length; j++) {
            if (bullets[j].y <= 0) {
                bullets.splice(bullets.indexOf(bullets[j]), 1);
            }
            if (bullets[j] != undefined) {
                bullets[j].newPos();
                bullets[j].update();
            }
        }
    }

    //update boss to maintain speed and position on canvas
    updateBoss() {
        if (boss.length != 0) {
            boss.forEach(el => {
                el.y += 1;
                el.newPos();
                el.update();
            });
        }
    }

    /**
     * This is called from the game engine every 20millsec so having a count variable limits the amout of
     * bosses. equation is: time(millsec), count(int) round(int) spawn(int):
     * equation = while(round is a boss round aka round % 3 == 0 and count  < round) spawn = time*count
     * this equation and method is only run depending on spawn enemies equation 120-playerkillCount % 1 === 0
     * @param {number} count
     **/
    spawnBoss() {
        const maxX = 240;
        const width = 30;
        const height = 30;
        const spawnY = -10;
        let randomX = Math.floor(Math.random() * maxX);
        boss.push(new Npc(width, height, randomX, spawnY, "green"));
    }

    /**
     * @returns {number} this.round
     **/
    getRound() {
        return this.round;
    }

    /**
     * A method for checking the event key pressed on the window
     * If arrow keys are selected move the player
     * If space is selected fire bulelt
     * use javascript e keycodes to find the key codes online
     **/
    checkKeyCode() {
        if (myGameArea.key === 37 && myGameArea.spaceBar == true) {
            this.spawnBullet();
            player.speedX = -5;
        } else if (myGameArea.key === 39 && myGameArea.spaceBar == true) {
            this.spawnBullet();
            player.speedX = 5;
        } else if (myGameArea.key === 38 && myGameArea.spaceBar == true) {
            this.spawnBullet();
            player.speedY = -5;
        } else if (myGameArea.key === 40 && myGameArea.spaceBar == true) {
            this.spawnBullet();
            player.speedY = 5;
        } else if (myGameArea.key === 37) {
            player.speedX = -5;
        } else if (myGameArea.key === 39) {
            player.speedX = 5;
        } else if (myGameArea.key === 38) {
            player.speedY = -5;
        } else if (myGameArea.key === 40) {
            player.speedY = 5;
        } else if (myGameArea.spaceBar == true) {
            this.spawnBullet();
        }
    }

    //write the score to the html
    updateScoreMenu() {
        //show player killCount
        document.getElementById('killCount').textContent = `Enemies Defeated: ${player.killCount}`;
        document.getElementById('roundCounter').textContent = `Round: ${gameHandler.getRound()}`;
    }
}

/**
 * Class for handling the Game Area aka the canvas and buttons of the game
 **/
class MyGameArea {
    constructor() {
        this.canvas = document.createElement('canvas'); //canvas object
        this.arrowLeftButton = document.createElement("button");
        this.arrowRightButton = document.createElement("button");
        this.shootButton = document.createElement("button");
        this.arrowRightButton.className = "gameControlBtn";
        this.arrowLeftButton.className = "gameControlBtn";
        this.shootButton.className = "shootBtn";
        this.spaceBar = false;
    }

    //function for creating the canavs element and adding event listeners to the canvas element
    start() {
        /**
         * css handles canvas size for mobile but this handles the pixel size
         * If need to chnage the pixels do so here CSS is only for phone display
         * This controls the width and height for the game functions not the CSS
         **/
        let width = window.screen.width;
        let height = window.screen.height;
        const canvasWidth = 320;
        const canavsHeight = 600;

        if (width > canvasWidth) {
            this.canvas.width = canvasWidth;
        } else {
            this.canvas.width = width;
        }

        if (height > canavsHeight) {
            this.canvas.height = canavsHeight;
        } else {
            this.canvas.height = height;
        }

        //if its a mobile devise display the mobile buttons otherwise just let player use arrow keys
        if (this.isMobile()) {
            this.displayMobile();
        } else {
            this.displayComputer()
        }

        this.framNo = 0;

        //this calls the game engine
        this.interval = setInterval(updateGameArea, 20);
    }

    //clear the canvas and update
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //the display function for game over
    gameOver() {
        this.canvas.style.display = "none";
        this.canvas.style.visibility = "hidden";
        document.getElementById("scores").style.display = "none";
        document.getElementById("scores").style.visibility = "hidden";
        this.shootButton.style.display = "none";
        this.arrowLeftButton.style.display = "none";
        this.arrowRightButton.style.display = "none";

        document.getElementById("scoreMenu").style.display = "block";
        document.getElementById("scoreMenu").style.visibility = "visible";
        document.getElementById("yourScore").textContent = "" + player.killCount;
    }
    /**
     * @param {Number} n
     * @returns {boolean}
     **/
    everyInterval(n) {
        if ((myGameArea.framNo / n) % 1 === 0) {
            return true;
        }
        return false;
    }

    //score menu handler
    scoreMenu() {
        this.canvas.display = "hidden";
        document.getElementById('scoreMenu').style.display = 'hidden';
        document.getElementById('gameMenu').style.display = "none";
    }

    //check if the user is on a mobile device
    isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    }

    //mobile display for the game interface
    displayMobile() {
        //appending canavs and shooting buttons !needs to be this order for mobile!
        this.shootButton.innerHTML = "Shoot";
        document.querySelector("main").appendChild(this.shootButton);
        this.context = this.canvas.getContext('2d');
        document.querySelector("main").appendChild(this.canvas);
        this.canvas.display = 'inline-block';
        this.canvas.float = 'right';

        //arrow buttons
        this.arrowLeftButton.innerHTML = "Left";
        this.arrowRightButton.innerHTML = "Right";
        document.querySelector("main").appendChild(this.arrowLeftButton);
        document.querySelector("main").appendChild(this.arrowRightButton);

        /***
         * Because the game engine constantly keep reseting the player speed for the arrow key
         * There need to be a boolean varaible to determin weather or not the movement came from the button or arrow
         * put into a player method
         **/
        this.shootButton.addEventListener("click", (e) => {
            gameHandler.spawnBullet()
        });
        this.arrowLeftButton.addEventListener("click", (e) => {
            player.arrowButtons = true;
            player.speedX = -30
        });
        this.arrowRightButton.addEventListener("click", (e) => {
            player.arrowButtons = true;
            player.speedX = 30
        });
    }

    //desktop and laptop game interface display
    displayComputer() {
        //appending canavs
        this.context = this.canvas.getContext('2d');
        document.querySelector("main").appendChild(this.canvas);
        this.canvas.display = 'inline-block';
        this.canvas.float = 'right';


        /**
         * @param {Event} e
         * create event listeners for the game disable the arrow keys and space bar for scrolling use
         * keyup is to disable the players movement on lift aka stop the player from moving when the arrow is not pressed
         **/
        window.addEventListener("keyup", (e) => {
            if (e.keyCode == 32) {
                this.spaceBar = false;
            }
            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                myGameArea.key = null;
            }
        });
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 32) {
                e.preventDefault();
                this.spaceBar = true;
            }
            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                e.preventDefault();
                myGameArea.key = e.keyCode;
            }
        });
    }
}

//The starting function for the game
let startGame = () => {
    document.getElementById("scores").style.display = "inline";
    document.getElementById("scores").style.visibility = "visible";
    enemys = [];
    boss = [];
    bullets = [];
    gamePlaying = true;
    player = new Player(30, 30, 150, 550, 'red', 0, 0);
    gameHandler = new Game_Handler(0);
    myGameArea = new MyGameArea();
    //for restart game
    document.getElementById("scoreMenu").style.display = "none";
    document.getElementById("gameMenu").style.display = "none";
    myGameArea.start();
};

//reload the whole document - easier for resetting objects and keeps canvas element created in JS and not HTML
let resetGame = () => {
    location.reload();
};



//----------------------------------------------------------------------------------------------------
//  GAME ENGINE CONSTANTLY RUNNING !!

//game area always updating every 20mill sec ...
let updateGameArea = () => {
    //if gamePlaying = true
    if (gamePlaying) {
        gameHandler.checkWin();
        gameHandler.checkCrashHandle();
        gameHandler.checkCrashHandleBoss();
        myGameArea.clear();
        //must reset player speed
        player.resetSpeed();
        gameHandler.checkKeyCode();

        gameHandler.spawnEnemies();
        gameHandler.updateEnemies();
        //update player
        player.checkPosition();
        player.newPos();
        player.update();
        gameHandler.updateBullets();
        gameHandler.updateBoss();


        //add a gameframe if the shoot key is enabled then disable the shoot key this prevents lined bullets!
        myGameArea.framNo += 1;
        if (myGameArea.spaceBar == true) {
            myGameArea.spaceBar = false;
        }
    }
}
//-----------------------------------------------------------------------------------------------------



document.getElementById("startGame").addEventListener("click", () => {
    startGame()
});
document.getElementById("playAgainBtn").addEventListener("click", () => {
    resetGame()
});

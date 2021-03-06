const q = {
    init: function(){
        document.querySelector('#restart').addEventListener('click', q.reset);
        document.querySelector('#handwash').addEventListener('click', q.handWash);
        q.gridWidth = document.body.offsetWidth - 20;
        q.reset();
    },
    level: 0,
    points: 0,
    infected: false,
    infectedEmoji: false,
    isGameOver: false,
    gridWidth: 0,
    pick: function(){
        let grid = Math.min(q.level + 3, 20);
        return Math.floor(Math.random() * Math.floor(grid*grid));
    },
    emojis: ["&#x1F600","&#x1F607","&#x1F602","&#x1F970","&#x1F60D","&#x1F643","&#x1F92D","&#x1F928","&#x1F971","&#x1F973","&#x1F97A","&#x1F929","&#x1F92A","&#x1F616","&#x1F914","&#x1F644","&#x1F633","&#x1F637","&#x1F927","&#x1F912" ],
    pickEmoji: function(){
        let x = Math.floor(Math.random() * Math.floor(this.emojis.length));
        if (x >= this.emojis.length-3){
            this.infectedEmoji = true;
        }
        else {
            this.infectedEmoji = false;
        }
        return q.emojis[x];
    },
    squareElement: "<div class='square' style='width:0px' ><span class='emoji'></span></div>",
    reset: function(){
        q.level = 0;
        q.points = 0;
        q.infected = false;
        q.regenerate();
        q.updateStats();
        document.querySelector("#grid").className = ''
        document.querySelector("#gameover").className = 'hide'
        document.querySelector('#handwash').className = '';
        document.querySelector('#restart').className = 'hide';
    },
    regenerate: function(){
        q.generateGrid();
        q.listenToGrid();
        q.showSquare();
    },
    generateGrid: function(){
        let grid = Math.min(q.level+3, 20);
        let squares = "";
        let gridElement = document.querySelector("#grid");
        let sqEl = q.squareElement.replace('0', (q.gridWidth/grid - 1).toFixed());
        for (var i = 0; i < grid*grid; i ++){
            squares += sqEl;
        }
        gridElement.innerHTML = squares;
    },
    listenToGrid: function(){
        let squares = document.querySelectorAll("#grid .square");
        for (var i = 0; i < squares.length; i++){
            squares[i].addEventListener("click", function(e){q.handleClick(e)});
        }
    },
    resetSquares: function(){
        let squares = document.querySelectorAll('#grid .square');
        for (var i = 0; i < squares.length; i++){
            squares[i].className = 'square';
            squares[i].innerHTML = "<span class='emoji'></span>";
        }
    },
    updateStats: function(){
        document.querySelector('#points').innerText = q.points;
        document.querySelector('#level').innerText = q.level;
        
    },
    handWash: function(){
        q.infected = false;
        document.querySelector('#handwash').className = '';
    },
    gameOver: function(){
        document.querySelector("#grid").className = 'hide';
        document.querySelector("#gameover").className = '';
        document.querySelector("#restart").className = '';
        q.handWash();
    },
    handleClick: function(e){
        if (!q.isGameOver){
            if (e.target.className.indexOf('active')>-1){
                if (q.infected){
                    return q.gameOver();
                }
                
                document.querySelector('#handwash').className = '';
                if (q.infectedEmoji){
                    q.infected = true;
                    document.querySelector('#handwash').className = 'active';
                }
                q.points += q.speedPoints;
                let pointsAdded = document.querySelector('#points-added')
                pointsAdded.className = ''
                pointsAdded.innerText = q.speedPoints;
                setTimeout(function(){pointsAdded.className = 'fade';}, 500);
            }
            else {
                return q.gameOver();
            }
            
            this.updateStats();

            var currentLevel = Math.floor(q.points/10)

            if (q.level != currentLevel){

                q.level = currentLevel;
                return q.regenerate();
            }
            this.resetSquares();
            this.showSquare();
        }

    },
    showSquare: function(){
        let sq = document.querySelector('#grid').children[this.pick()];
        sq.querySelector('.emoji').innerHTML = this.pickEmoji();
        sq.className += " active"
        q.startTimer();
    },
    speedPoints: 0,
    timer1: null,
    timer2: null,
    startTimer: function(){
        q.speedPoints = 2
        window.clearTimeout(q.timer1)
        window.clearTimeout(q.timer2)
        q.timer1 = setTimeout(function(){q.speedPoints = 1; }, 500);
        q.timer2 = setTimeout(function(){q.speedPoints = 0; }, 1500);
    }
}

window.onload = q.init;
var windowWidth = window.innerWidth;
window.addEventListener('resize', function() {
    if (window.innerWidth != windowWidth) {
      windowWidth = window.innerWidth;
      q.init();
    }
  });
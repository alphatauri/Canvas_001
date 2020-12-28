const canvas = document.getElementById('canvas');
canvas.height = 630;
canvas.width = 1100;

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';

class Game
{
    constructor(cols, rows)
    {
        this.cols = cols;
        this.rows = rows;
        this.paused = true;
        this.grid = this.build();
    }

    build()
    {
        let tmp = Array(this.cols);
        for (let i = 0; i < this.cols; i++)
            tmp[i] = Array(this.rows);
        return tmp;
    }
    
    forEachCell(call)
    {
        for (let i = 0; i < this.cols; i++)
            for (let j = 0; j < this.rows; j++)
                call(i, j, this.grid[i][j]);
    }

    randomize()
    {
        this.forEachCell((x,y) => this.grid[x][y] = Math.floor(Math.random()*50) < 3 ? 1 : 0);                
    }

    swap(x, y)
    {
        this.grid[x][y] = (this.grid[x][y] + 1) % 2;
    }

    tooglePause()
    {
        this.paused = !this.paused;
    }

    step()
    {
        if (this.paused)
            return;

        let next = this.build();
        this.forEachCell((i,j) => {
                let n = this.neighboursOf(i,j);
                if (n === 3)
                    next[i][j] = 1;
                else if (n < 2 || n > 3)
                    next[i][j] = 0;
                else
                    next[i][j] = this.grid[i][j];
        });
        this.grid = next;    
    }

    neighboursOf(x, y)
    {
        let sum = 0;
        for(let i = -1; i < 2; i++)
            for(let j = -1; j < 2; j++)
                sum += this.grid[(x+i+this.cols) % this.cols][(y+j+this.rows) % this.rows];

        sum -= this.grid[x][y];
        return sum;
    }
}

class App
{
    constructor(canvas, resolution)
    {
        this.cols = Math.floor(canvas.width / resolution);
        this.rows = Math.floor(canvas.height / resolution);
        this.resolution = resolution;
        this.game = new Game(this.cols, this.rows);
        this.initialize(canvas);
    }

    initialize(canvas)
    {
        window.addEventListener("keypress", this.keyPressed);
        canvas.addEventListener("click", this.click);
    }

    keyPressed(e)
    {
        if (e.key === 'Enter')
            app.game.tooglePause();
    }

    click(e)
    {
        const x = Math.floor((e.clientX - e.target.offsetLeft) / app.resolution);
        const y = Math.floor((e.clientY - e.target.offsetTop) / app.resolution);
        app.game.swap(x,y);
    }

    ramdomize()
    {
        this.game.randomize();
    }

    draw()
    {
        this.game.forEachCell((i,j,s) => {
                if (s === 1)
                    this.paint(i, j, this.resolution);
        });
    }

    step()
    {
        this.game.step();
    }
}

app = new App(canvas, 5);
app.ramdomize();
app.paint = (x, y, size) => ctx.fillRect(x * size, y * size, size, size);


const loop = () =>
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    app.draw();
    app.step();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

export class Game
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

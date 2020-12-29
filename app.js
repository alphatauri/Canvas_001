import { Game } from "./game.js";

export class App
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
        app.swap(x,y);
    }

    ramdomize()
    {
        this.game.randomize();
    }

    draw()
    {
        this.game.forEachCell((i,j,status) => {
                if (status === 1)
                    this.paint(i, j, this.resolution);
        });
    }

    step()
    {
        this.game.step();
    }

    swap(x, y)
    {
        this.game.swap(x, y);
    }
}
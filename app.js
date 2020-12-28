const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = 630;
canvas.width = 1100;
paused = true;

ctx.fillStyle = 'black';
const res = 6;
const cols = Math.floor(canvas.width / res);
const rows = Math.floor(canvas.height / res);

const build = () =>
{
    let tmp = Array(cols);
    for (let i = 0; i < cols; i++)
        tmp[i] = Array(rows);
    return tmp;
}

grid = build();

for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++)
        grid[i][j] = Math.floor(Math.random()*50) < 3 ? 1 : 0;

const draw = () =>
{
    for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++)
        {
            if (grid[i][j] === 1)
                ctx.fillRect(i*res, j*res, res, res);
        }
}

neighboursOf = function(x, y)
{
    let sum = 0;
    for(let i = -1; i < 2; i++)
        for(let j = -1; j < 2; j++)
            sum += grid[(x+i+cols) % cols][(y+j+rows) % rows];

    sum -= grid[x][y];
    return sum;
}

const step = () =>
{
    let next = build();
    for(let i = 0; i < cols; i++)
        for(let j = 0; j < rows; j++)
        {
            n = neighboursOf(i,j);
            if (n === 3)
                next[i][j] = 1;
            else if (n < 2 || n > 3)
                next[i][j] = 0;
            else
                next[i][j] = grid[i][j];
        }
    grid = next;
}

const keyPressed = (e) =>
{
    if (e.key === 'Enter')
        paused = !paused;
}

const click = (e) =>
{
    const x = Math.floor((e.clientX-canvas.offsetLeft) / res);
    const y = Math.floor((e.clientY-canvas.offsetTop) / res);
    grid[x][y] = (grid[x][y] + 1) % 2;
}

window.addEventListener("keypress", keyPressed);
canvas.addEventListener("click", click);

const loop = () =>
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    if (!paused)
        step();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);

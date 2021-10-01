import { getBlockData, getColorMap } from '../blockgen.js';

let cx, cy;
let grids = [];
let colormap = getColorMap();

class Grid
{
    constructor(sx, sy, gridsize, data)
    {
        this.sx = sx;
        this.sy = sy;
        this.gridsize = gridsize;
        this.side = 2;
        this.grid = data;
    }

    draw()
    {
        stroke(0);
        strokeWeight(0);
        for(let row = 0;row < this.gridsize;row ++)
        {
            for(let col = 0;col < this.gridsize;col ++)
            {
                let curcolor = colormap[this.grid[row][col]];
                if(curcolor == 'Empty')
                    fill(0, 0, 0, 0);
                else
                    fill(int(curcolor[0] * 255), int(curcolor[1] * 255), int(curcolor[2] * 255));
                square(this.sx + col * this.side, this.sy + row * this.side, this.side);
            }
        }
    }
}

function setup()
{
    createCanvas(1400, 680);

    cx = width / 2;
    cy = height / 2;
    grids.push(new Grid(-650, -300, 128, getBlockData(0, 0, 128, 0)));
    grids.push(new Grid(-350, -300, 128, getBlockData(0, 0, 128, 1)));
    grids.push(new Grid( -50, -300, 128, getBlockData(0, 0, 128, 2)));
}

function draw()
{
    background(200);
    translate(cx, cy);
    grids.forEach((gr) => 
    {
        gr.draw();
    });
    noLoop();
}

window.setup = setup; 
window.draw = draw;
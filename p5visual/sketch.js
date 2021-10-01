import { getBlockData, getColorMap } from '../blockgen.js';

let cx, cy;
let gr;
let colormap = getColorMap();

class Grid
{
    constructor(sx, sy, gridsize, data)
    {
        this.sx = sx;
        this.sy = sy;
        this.gridsize = gridsize;
        this.side = 10;
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
    createCanvas(1200, 680);

    cx = width / 2;
    cy = height / 2;
    gr = new Grid(-500, -300, 15, getBlockData(0, 0, 15, 0));
}

function draw()
{
    background(200);
    translate(cx, cy);
    gr.draw();
    noLoop();
}

window.setup = setup; 
window.draw = draw;
import { Random } from './tools/prng.js';

export { getBlockData, getColorMap, tester };

function getBlockData(chunk_x, chunk_y, gridsize, layer)
{
    let bdata = new Array(gridsize).fill(0).map(() => new Array(gridsize).fill('white'));
    for(let i = 0;i < gridsize;i ++)
    {
        for(let j = 0;j < gridsize;j ++)
        {
            if(Math.sqrt(Math.pow(i - (gridsize / 2), 2) + Math.pow(j - (gridsize / 2), 2)) < (gridsize / 2))
            {
                bdata[i][j] = 'air';
            }
            else
            {
                if(i % 2 == 0)
                {
                    if(layer == 0)
                        bdata[i][j] = 'red';
                    else if(layer == 1)
                        bdata[i][j] = 'green';
                    else
                        bdata[i][j] = 'blue';
                }
                else if(j % 2 == 0)
                    bdata[i][j] = 'black';
            }
        }
    }
    return bdata;
}

function getColorMap()
{
    return {'air': 'Empty', 'white': [1, 1, 1], 'red': [1, 0, 0], 'green': [0, 1, 0], 'blue': [0, 0, 1], 'black': [0, 0, 0]};
}

function tester()
{
    let rn = new Random(4);
    for(let i = 0;i < 20;i ++)
        console.log(rn.random());
}
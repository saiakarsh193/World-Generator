export function getBlockData(chunk_x, chunk_y, gridsize, layer)
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
export { Random };

class Random
{
    constructor(seed)
    {
        this.state = seed;
    }

    random()
    {
        // this.state = (1103515245 * this.state + 12345) % (1 << 29);
        // return this.state / (1 << 29);
        this.state = (8121 * this.state + 28411) % 134456;
        return this.state / 134456;
    }
}
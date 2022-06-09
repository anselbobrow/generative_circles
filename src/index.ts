import * as p5 from 'p5';
import { HSV } from './customTypes';
import NightSky from './NightSky';
const { harmonies, utils: { xspace } } = require("prismaek");

let numPlanets: number, colors: string[], hsvColors: HSV[], ns: NightSky;

export const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background('#0C132D');
        // use hsv with the same max vals as the prismaek library
        p.colorMode(p.HSB, 360, 1, 1);

        numPlanets = p.random(5, 15);
        colors = ['#f9b8b1', '#25388e', '#57dbd8', '#f84791'];
        hsvColors = colors.map(c => xspace(c, "hsv"));
        ns = new NightSky(numPlanets, hsvColors);

        ns.generateRandom(p);
        ns.render(p);
    }

    p.mouseClicked = () => {
        ns.allPlanets.forEach(p => { p.circles[0].fill = harmonies.complementary(p.circles[0].fill)[1] })
        ns.render(p);
        return false;
    }

    p.draw = () => {
    }
}

export const myp5 = new p5(sketch, document.body);
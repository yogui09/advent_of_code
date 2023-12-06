import {readFileSync} from 'fs';

const buffer = readFileSync('./input.txt').toString().trim();
const lines = buffer.split('\n').slice(1);

class Node {
    name = ''
    size = 0;
    children = [];
    parent;

    constructor(name, parent, size = 0) {
        this.name = name;
        this.parent = parent;
        this.size = size;

    }

    parse(lines) {
        if (!lines || !lines.length) {
            return
        }
        const [current, ...rest] = lines;
        const [, command, destination] = current.match(/\$ (\w+) ?(.*)?/);
        switch (command) {
            case 'ls':
                const [children, nextLines] = this.#parseLs(rest);
                children.forEach(child => this.addChild(child));
                this.parse(nextLines);
                break;
            case 'cd':
                if (destination === '..') {
                    this.parent.parse(lines.slice(1));
                } else {
                    this.children.find(c => c.name === destination).parse(lines.slice(1));
                }
                break;
        }
    }

    #parseLs(lines) {
        const linesClone = [...lines];
        const nextCommandIndex = lines.findIndex(l => l.startsWith('$'))
        const children = linesClone
            .splice(0, nextCommandIndex >= 0 ? nextCommandIndex : lines.length)
            .map(child => {
                const [size, name] = child.split(' ');
                return isNaN(parseInt(size, 10)) ?
                    {name, size: 0} : {name, size: parseInt(size, 10)};
            });
        return [children, linesClone];
    }

    addChild({name, size}) {
        const existingChild = this.children.find(c => c.name === name);
        if (existingChild) {
            this.size = this.children.filter(c => c !== existingChild).reduce((sum, c) => sum + c.size, size);
        } else {
            const child = new Node(name, this, size);
            this.children = [...this.children, child];
            this.size += size;
        }
        this.parent?.addChild(this);
    }
}

const root = new Node('/');
root.parse(lines);

const res = root.children.reduce((sum, c) => sum + (c.size < 100000 ? c.size : 0), 0);

function getPart1Folders(node) {
    return node.children
        .reduce((sum, c) => sum + getPart1Folders(c)
            , node.size < 100000 && node.children.length > 0 ? node.size : 0);
}

function getPart2Folders(node, min, max) {
    return node.children
        .filter(c => c.children.length > 0 && c.size > min)
        .reduce((acc, c) => getPart2Folders(c, min, c.size < acc ? c.size : acc), node.size < max ? node.size : max)
}

console.log(getPart1Folders(root));
console.log(getPart2Folders(root, 30000000 - (70000000 - root.size), root.size));

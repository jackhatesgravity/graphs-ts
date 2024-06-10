class Stack {
    private _stack: any[];
    constructor() {
        this._stack = [];
    }
    empty = (): boolean => {
        return this._stack.length === 0;
    }
}


const myStack = new Stack();
console.log(myStack.empty());
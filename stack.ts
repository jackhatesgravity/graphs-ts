interface StackInterface<T> {
    count(): number;

    empty(): boolean;

    put(node: T): number;

    get(): T | undefined;
}

export class Stack<T> implements StackInterface<T> {
    private _stack: T[];

    constructor() {
        this._stack = [];
    }

    public count(): number {
        return this._stack.length;
    }

    public empty(): boolean {
        return this._stack.length === 0;
    }

    public put(node: T): number {
        return this._stack.push(node);
    }

    public get(): T | undefined {
        return this._stack.pop();
    }
}

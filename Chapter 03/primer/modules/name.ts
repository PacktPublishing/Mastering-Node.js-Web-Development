export class Name {
    constructor(public first: string, public second: string) {}

    get nameMessage() {
        return `Hello ${this.first} ${this.second}`;
    }
}

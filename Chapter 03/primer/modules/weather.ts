export class WeatherLocation {
    constructor(public weather: string, public city: string) {}

    get weatherMessage() {
        return `It is ${this.weather} in ${this.city}`;
    }
}

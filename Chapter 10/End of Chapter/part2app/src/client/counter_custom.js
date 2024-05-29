import { Odd } from "./odd_custom";
import { Even } from "./even_custom";

export const Counter = (context) => `
    <button class="btn btn-primary m-2" action="incrementCounter">
        Increment
    </button>
    <div>
        ${ context.counter % 2 ? Odd(context) : Even(context) }
    </div>`

export const style = (stylesheet: any) => {
    return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
}

export const valueOrZero = (value: any) => {
    return value !== undefined ? value : 0;
}

export const increment = (value: any) =>  {
    return Number(valueOrZero(value)) + 1;
}

export const isOdd = (value: any) => {
    return Number(valueOrZero(value)) % 2;
}

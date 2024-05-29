export const toArray = (...args: any[]) => args.slice(0, -1);

export const lower = (val: string) => val.toLowerCase();

export const getValue = (val: any, prop: string) => 
    val?.[prop.toLowerCase()] ?? {};

export const get = (val: any) => val ?? {};

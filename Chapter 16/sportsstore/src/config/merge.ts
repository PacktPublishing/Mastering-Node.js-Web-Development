export const merge = (target: any, source: any) : any => {
    Object.keys(source).forEach(key => {
        if (typeof source[key] === "object" 
                && !Array.isArray(source[key])) {
            if (Object.hasOwn(target, key)) {
                merge(target[key], source[key]);
            } else {
                Object.assign(target, source[key])
            }
        } else {
            target[key] = source[key];
        }
    });
}

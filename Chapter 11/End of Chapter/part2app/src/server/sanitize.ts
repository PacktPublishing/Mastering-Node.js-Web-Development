const matchPattern = /[&<>="'`]/g;

const characterMappings: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "=": "&#x3D;",    
    "'": "&#x27;",
    "`": "&#x60;"
};

export const santizeValue = (value: string) => 
    value?.replace(matchPattern, match => characterMappings[match]);

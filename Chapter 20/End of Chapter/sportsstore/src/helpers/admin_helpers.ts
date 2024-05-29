export const buttonClass = (btn: string, mode: string) => 
    btn == mode ? "btn-secondary" : "btn-outline-secondary";

export const disabled = (val: any) => val == "ID" ? "disabled" : "";

export const selected = (val1: any, val2: any) => 
    val1 == val2 ? "selected" : "";

export const first = (index: number) => index == 0;

export const total = (sels: any[]) => 
    sels.reduce((total, s) => total += (s.quantity * s.product.price), 0);

export interface CartLine {
    productId: number;
    quantity: number;
}

export interface Cart {
    lines: CartLine[];
}

export const createCart = () : Cart => ({ lines: [] });

export const addLine = (cart: Cart, productId: number, quantity: number) => {
    const line = cart.lines.find(l => l.productId == productId);
    if (line !== undefined) {
        line.quantity += quantity;
    } else {
        cart.lines.push({ productId, quantity })
    }
}

export const removeLine = (cart: Cart, productId: number) => {
    cart.lines = cart.lines.filter(l => l.productId !== productId);
}

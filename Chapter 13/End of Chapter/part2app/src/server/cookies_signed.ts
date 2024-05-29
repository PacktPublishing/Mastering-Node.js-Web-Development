import { createHmac, timingSafeEqual } from "crypto";

export const signCookie = (value: string, secret: string) => {
    return value + "." + createHmac("sha512", secret)
        .update(value).digest("base64url");
}

export const validateCookie = (value: string, secret: string) => {
    const cookieValue = value.split(".")[0];
    const compareBuf = Buffer.from(signCookie(cookieValue, secret));
    const candidateBuf = Buffer.from(value);
    if (compareBuf.length == candidateBuf.length && 
        timingSafeEqual(compareBuf, candidateBuf)) {
            return cookieValue;
    }
    return undefined;
}

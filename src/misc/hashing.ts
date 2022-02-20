import * as crypto from "crypto";

export function generateHash(text: string): string {
    let hash = crypto.createHash("sha512");
    hash.update(text);
    return hash.digest("hex").toUpperCase();
}
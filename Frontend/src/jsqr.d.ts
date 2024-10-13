declare module 'jsqr' {
    export function jsQR(data: Uint8ClampedArray, width: number, height: number, options?: any): { data: string } | null;
}

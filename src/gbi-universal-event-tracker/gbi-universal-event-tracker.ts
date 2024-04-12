export const add = (a: number, b: number) => a + b;
export const sub = (a: number, b: number) => a - b;

export const libName = process.env.GBI__LIB_NAME;
export const libVersion = GBI__LIB_VERSION;

export default {
  libName,
  libVersion
};
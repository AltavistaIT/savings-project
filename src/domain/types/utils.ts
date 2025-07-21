export type DeepRequired<T> = {
  [K in keyof T]-?: NonNullable<T[K]> extends (...args: any) => any
    ? NonNullable<T[K]>
    : NonNullable<T[K]> extends Array<infer U>
    ? Array<DeepRequired<U>>
    : DeepRequired<NonNullable<T[K]>>;
};

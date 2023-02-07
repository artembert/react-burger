export type ValueOf<T> = T[keyof T];

export type InputPasswordType = "text" | "password";

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

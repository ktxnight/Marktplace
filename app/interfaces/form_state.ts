/* eslint-disable @typescript-eslint/no-unused-vars */
type FormState<T> = {
    success: boolean;
    errors?: T,
    message?: string
}
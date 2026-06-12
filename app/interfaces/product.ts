/* eslint-disable @typescript-eslint/no-unused-vars */
interface IProduct{
    readonly id: number;
    name: string,
    categoryID: number,
    description: string,
    photo?: string,
    price: number,
    readonly sellerID: number
}
export interface IClient {
    readonly id?: number, // IDENTIFICADOR PRIMÁRIO
    name: string, // NOME COMPLETO
    document: string, // DOCUMENTO (CPF)
    email: string, // EMAIL
    phone: string, // TELEFONE
    dateOfBirth?: Date, // DATA DE NASCIMENTO
    address: Array<IAddress>, // VÁRIOS ENDEREÇOS
}

export enum ECustomerRegistrationSteps {
    STEP01, // EMAIL
    STEP02, // NAME, DOCUMENT, DATE OF BIRTH, PHONE
    STEP03, // ADDRESS
    STEP04, // PASSWORD
    OVERVIEW
}

export type TCustomerRegister = Partial<IClient & {
    password: string
}>
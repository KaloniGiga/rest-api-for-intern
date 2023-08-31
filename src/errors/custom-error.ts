export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor() {
        super()
    }

    abstract formatErrors(): { message: string, field?: string }[]
}
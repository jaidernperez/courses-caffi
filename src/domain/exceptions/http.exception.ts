export class HttpException extends Error {

    public status: number;
    public timestamp: Date;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.timestamp = new Date();
    }
}
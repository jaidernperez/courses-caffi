export class Teacher {

    public id: number;
    public name: string;
    public photo: string;
    public lastname: string;
    public biography: string;
    public state: number;
    public createdDate: Date;

    constructor() {
        this.createdDate = new Date();
    }
}
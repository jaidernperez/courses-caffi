export class Slide {

    public id: number;
    public title: string;
    public description: string;
    public textButton: string;
    public url: string;
    public image: string;
    public alternate: string;
    public type: number;
    public state: number;
    public video: string;
    public createdDate: Date;

    constructor() {
        this.createdDate = new Date();
    }
}
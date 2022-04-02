export class Template {

    public id: number;
    public siteName: string;
    public description: string;
    public logo: string;
    public phone: string;
    public email: string;
    public address: string;
    public city: string;
    public facebookLink: string;
    public instagramLink: string;
    public youtubeLink: string;
    public whatsappLink: string;
    private merchantId: number;
    private accountId: number;
    private apiKey: string;
    private sandbox: number;
    private createdDate: Date;

    constructor() {
        this.createdDate = new Date();
    }
}
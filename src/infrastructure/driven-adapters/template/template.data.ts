import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'templates'})
export class TemplateData {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar', name: 'site_name'})
    public siteName: string;

    @Column({type: 'varchar'})
    public description: string;

    @Column({type: 'varchar'})
    public logo: string;

    @Column({type: 'varchar'})
    public phone: string;

    @Column({type: 'varchar'})
    public email: string;

    @Column({type: 'varchar'})
    public address: string;

    @Column({type: 'varchar'})
    public city: string;

    @Column({type: 'varchar', name: 'facebook_link'})
    public facebookLink: string;

    @Column({type: 'varchar', name: 'instagram_link'})
    public instagramLink: string;

    @Column({type: 'varchar', name: 'youtube_link'})
    public youtubeLink: string;

    @Column({type: 'varchar', name: 'whatsapp_link'})
    public whatsappLink: string;

    @Column({type: 'integer', name: 'merchant_id'})
    public merchantId: number;

    @Column({type: 'integer', name: 'account_id'})
    public accountId: number;

    @Column({type: 'varchar', name: 'api_key'})
    public apiKey: string;

    @Column({type: 'integer'})
    public sandbox: number;

    @Column({type: 'timestamp', name: 'created_date'})
    public createdDate: Date;
}
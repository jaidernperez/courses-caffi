import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'slides'})
export class SlideData {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public title: string;

    @Column({type: 'varchar'})
    public description: string;

    @Column({type: 'varchar', name: 'text_button'})
    public textButton: string;

    @Column({type: 'varchar'})
    public url: string;

    @Column({type: 'varchar'})
    public image: string;

    @Column({type: 'varchar'})
    public alternate: string;

    @Column({type: 'integer'})
    public type: number;

    @Column({type: 'integer'})
    public state: number;

    @Column({type: 'varchar'})
    public video: string;

    @Column({type: 'timestamp', name: 'created_date'})
    public createdDate: Date;

}
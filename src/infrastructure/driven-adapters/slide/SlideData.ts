import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'slide'})
export class SlideData {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public title: string;

    @Column({type: 'varchar', name: 'document_type'})
    public description: string;

    @Column({type: 'varchar'})
    public textButton: string;

    @Column({type: 'varchar'})
    public url: string;

    @Column({type: 'varchar'})
    public image: string;

    @Column({type: 'varchar'})
    public alternate: string;

    @Column({type: 'number'})
    public type: number;

    @Column({type: 'number'})
    public state: number;

    @Column({type: 'timestamp', name: 'created_date'})
    public createdDate: Date;

}
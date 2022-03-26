import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'teachers'})
export class TeacherData {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public name: string;

    @Column({type: 'varchar'})
    public photo: string;

    @Column({type: 'varchar'})
    public lastname: string;

    @Column({type: 'varchar',})
    public biography: string;

    @Column({type: 'integer'})
    public state: number;

    @Column({type: 'timestamp', name: 'created_date'})
    public createdDate: Date;
}
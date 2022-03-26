import {TeacherData} from '../../teacher/teacher.data';
import {Teacher} from '../../../../domain/models';

export interface TeacherDataMapper {

    dataToEntity(data: Promise<TeacherData>): Promise<Teacher>;

    entityToData(entity: Teacher): TeacherData;

    listDataToEntity(listData: Promise<TeacherData[]>): Promise<Teacher[]>;
}
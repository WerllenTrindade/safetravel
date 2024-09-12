import Realm, { BSON } from 'realm' 
import { CoordsschemaProps } from './Coords';

type GenerateProps  ={
    user_id: string,
    description: string,
    license_plate: string,
    coords: CoordsschemaProps[];
}

export class Historic extends Realm.Object<Historic>{
    _id!: string;
    user_id!: string;
    license_plate!: string;
    description!: string;
    status!: string;
    created_at!: Date;
    updated_at!: Date;
    coords!: CoordsschemaProps[]

    static generate({ description, license_plate, user_id, coords}: GenerateProps){
        return {
            _id: new BSON.UUID(),
            user_id,
            license_plate,
            description,
            coords,
            status: 'departure',
            created_at: new Date(),
            updated_at: new Date()
        }
    }

    static schema: any = {
        name: 'Historic',
        primaryKey: '_id',

        properties: {
            _id: 'uuid',
            user_id: {
                type: 'string',
                indexed: true //Informar que vai ser um campo de pesquisa, isso deixa a consulta mais otimizada
            },
            license_plate: 'string',
            description: 'string',
            coords: {
                type: 'list',
                objectType: 'Coords'
            },
            status: 'string',
            created_at: 'date',
            updated_at: 'date'
        }
    }
}
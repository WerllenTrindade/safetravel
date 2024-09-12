import Realm from 'realm' 

export type CoordsschemaProps = {
    latitude: number;
    longitude: number;
    timestamp: number;
}

export class Coords extends Realm.Object<Coords>{
    latitude!: number;
    longitude!: number;
    timestamp!: number;   

    static generate({ latitude, longitude, timestamp }: CoordsschemaProps){
        return {
            latitude,
            longitude,
            timestamp,
        }
    }


    static schema = {
        name: "Coords",
        embedded: true,
        properties: {
            latitude: 'float',
            longitude: 'float',
            timestamp: 'float'
        }
    }
}
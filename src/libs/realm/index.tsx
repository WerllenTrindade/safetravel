import { createRealmContext } from '@realm/react'
import { Historic } from './schemas/Historic';
import { Coords } from './schemas/Coords';
import Realm from 'realm'

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: any = {
    flexible: true, //determina async
    newRealmFileBehavior: realmAccessBehavior,
    existingRealmFileBehavior: realmAccessBehavior
}

export const {
    RealmProvider,
    useObject,
    useProgress,
    useQuery,
    useRealm
} = createRealmContext({
    schema: [ Historic, Coords ],
    schemaVersion: 1
});
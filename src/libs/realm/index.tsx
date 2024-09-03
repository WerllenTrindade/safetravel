import { createRealmContext } from '@realm/react'
import { Historic } from './schemas/Historic';

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
    schema: [ Historic ]
});
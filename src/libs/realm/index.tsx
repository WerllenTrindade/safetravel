import { createRealmContext } from '@realm/react'
import { Historic } from './schemas/Historic';

export const {
    RealmProvider,
    useObject,
    useProgress,
    useQuery,
    useRealm
} = createRealmContext({
    schema: [ Historic ]
});
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import appReducer from 'src/store/reducers/app';
import geoReducer from 'src/store/reducers/geo';
import authReducer from 'src/store/reducers/auth';
import userReducer from 'src/store/reducers/maintenance/users';
import userRolesReducer from 'src/store/reducers/maintenance/userroles';
import userProfileReducer from 'src/store/reducers/maintenance/userprofile';
import branReducer from 'src/store/reducers/maintenance/branches';
import corpReducer from 'src/store/reducers/maintenance/corporates';
import itemReducer from 'src/store/reducers/maintenance/items';
import packReducer from 'src/store/reducers/maintenance/packages';
import refLabReducer from 'src/store/reducers/maintenance/referencelaboratory';
import ptntReducer from 'src/store/reducers/maintenance/patients';
import docReducer from 'src/store/reducers/maintenance/doctors';
import refReducer from 'src/store/reducers/maintenance/referrals';
import transReducer from 'src/store/reducers/transaction/transactionlist';
import txnReducer from 'src/store/reducers/transaction/transaction';
import labReducer from 'src/store/reducers/laboratory/laboratory';
import srvReduce from 'src/store/reducers/laboratory/services';
import eodReduce from 'src/store/reducers/transaction/transactioneod';
import soaReduce from 'src/store/reducers/soa/soa';
import sopReduce from 'src/store/reducers/sop/sop';
import emailReduce from 'src/store/reducers/email/email';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    app: appReducer,
    geo: geoReducer,
    auth: authReducer,
    users: userReducer,
    roles: userRolesReducer,
    profile: userProfileReducer,
    bran: branReducer,
    corps: corpReducer,
    items: itemReducer,
    packs: packReducer,
    ptnts: ptntReducer,
    docs: docReducer,
    refs: refReducer,
    trans: transReducer,
    txn: txnReducer,
    lab: labReducer,
    srv: srvReduce,
    eod: eodReduce,
    soa: soaReduce,
    sop: sopReduce,
    email: emailReduce,
    refLab: refLabReducer,
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
export default store;
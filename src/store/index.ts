import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import app from './modules/app'
import session from './modules/session'
import account from './modules/account'
import user from './modules/user'
import role from './modules/role'
import tenant from './modules/tenant'
import consumption from './modules/consumption'
import orglist from './modules/orglist'
import cmemberscard from './modules/cmemberscard'
import chargehistory from './modules/chargehistory'
import fuyoupay from './modules/fuyoupay'

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        session,
        account,
        user,
        role,
        tenant,
        consumption,
        orglist,
        cmemberscard,
        chargehistory,
        fuyoupay
    }
});

export default store;
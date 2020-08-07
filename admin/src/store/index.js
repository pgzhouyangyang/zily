import Vuex  from "vuex"
import Vue from "vue"

Vue.use(Vuex )

const store = new Vuex.Store({
    state: {
        userInfo: {
            username: "",
            token: "",
        }
    },
    mutations: {
        setUserInfo(state, info) {
            state.userInfo = info;
            window.localStorage.setItem("userInfo", JSON.stringify(info))
        },
        clearUserInfo(state) {
            state.userInfo = {};
            window.localStorage.removeItem("userInfo")
        }
    }
})

export default store
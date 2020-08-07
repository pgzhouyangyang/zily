import Vue from "vue"
import store from "../store"
import router from "../router"

const originFetch  = fetch;
const prefix = "/api";

Object.defineProperty(window, "fetch", {
    configurable: true,
    enumerable: true,
    get() {
        return (url, options = {})=> {
            url = prefix + url;
            let method = (options.method || "GET").toUpperCase();
            if(method == "GET") {
                let arr = [];
                Object.keys(options.params || {}).forEach(key=> {
                    arr.push(key + "=" + options.params[key]);
                });
                url += "?" + arr.join("&")  
            }
            let headers = options.headers || {
                "Content-type": "application/json;charset=UTF-8",
                "Accept": "application/json",
            }
            headers["Authorization"] = "Bearer " + store.state.userInfo.token;
            return originFetch(url, {
                ...options,
                headers,
            }).then(res=> {
                if(res.status == 200) {
                    return Promise.resolve(res.json())
                } else {
                    return Promise.reject(res.json())
                }
            }).then(res=> {
                if(res.errcode) {
                    return Promise.reject(res)
                }
                return Promise.resolve(res)
            }).catch(async (err)=> {
                let res = await err;
                if(res.errcode == 401) {
                    // Vue.prototype.$message.error(res.message);
                    // setTimeout(()=> {
                        router.replace("/login")
                    // }, 1000)
                }
                Vue.prototype.$message.error(res.message);
                return Promise.reject(res)
            })
        }
    }
})
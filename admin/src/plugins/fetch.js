const originFetch  = fetch;
const prefix = "/api"
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
            return originFetch(url, {
                headers: {
                    "Content-type": "application/json;charset=UTF-8",
                    // Accept: "application/json",
                },
                ...options
            }).then(res=> {
                if(res.status == 200) {
                    return res.json()
                } else {
                    return Promise.reject()
                }
            })
        }
    }
})
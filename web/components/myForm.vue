<template>
    <form ref="form">
        <slot></slot>
    </form>
</template>
<script>
export default {
    props: {
        rules: Object,
        form: Object,
       
    },
    data() {
        return {
             type: {
                email: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
            }
        }
    },
    methods: {
        verify() {
            let elements = this.$refs.form.querySelectorAll("input, select, textarea")
            let error = [];
            let _this = this;
            return new Promise((resolve, reject)=> {
                Array.from(elements).forEach(item=> {
                 
                    let name = item.name;
                   (this.rules[name] || []).forEach(r=> {
                       if(r.required && !item.value) {
                           error.push({
                               name,
                               message: r.message
                           })
                       }
                       if(r.type && ! _this.type[r.type].test(item.value)) {
                            error.push({
                               name,
                               message: r.message
                           })
                       }
                   })
                })
                if(!error.length) {
                    resolve()
                } else {
                    reject(error)
                }
            })

          
        }
    }
    
}
</script>
<style lang="scss" scoped>

</style>
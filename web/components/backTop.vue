<template>
        <div class="back-top" v-show="show" @click="backTop">
            <i class="iconfont icon-backtop"></i>
        </div>
</template>
<script>
import {throttle} from "../plugins/public"
export default {
    data() {
        return {
            show: false,
            scrollFn: ()=> {}
        }
    },
    mounted() {
        this.handleScroll();
        this.scrollFn = throttle(this.handleScroll, 500);
        window.addEventListener("scroll",  this.scrollFn)
    },
    destroyed() {
        window.removeEventListener("scroll", this.scrollFn)
    },
    computed: {
    },
    methods: {
        handleScroll() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
            if(scrollTop > 2000) {
                this.show = true
            } else {
                this.show && ( this.show = false)
            }
        },
        backTop() {
            let cacheTop = 0;
            let timerTop = setInterval(() => {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(cacheTop && cacheTop < scrollTop) { //返回顶部过程中滑动滚动条清除定时器；
                      return clearInterval(timerTop);
                }
                if(scrollTop <= 0) {
                     return clearInterval(timerTop);
                }
                let diff = Math.ceil(scrollTop / 6);
                cacheTop = document.documentElement.scrollTop = document.body.scrollTop = scrollTop - diff 
            }, 30)
           
        }
    }
}
</script>
<style lang="scss" scoped>
    .back-top {
        position: fixed;
        width: 40px;
        height: 40px;
        right: 20px;
        bottom: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: 20px;
        box-shadow: 0 0 6px rgba(0,0,0,.12);
        cursor: pointer;
        z-index: 100;
        transform: all 1s;
        opacity: 1;
        &:hover {
            background: #f2f6fc;
        }
        .iconfont {
             font-size: 20px;
             color: #409eff;
        }

    }
</style>
<template>
    <div class="scroll-top" :style="{'width': progress}"></div>
</template>
<script>
export default {
    data() {
        return {
            progress: 0
        }
    },
    mounted() {
        this.handleScroll();
        window.addEventListener("scroll", this.handleScroll, true)
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll, true);
      
    },
    methods: {
        handleScroll() {
            let element = document.documentElement || document.body;
            let { scrollHeight, scrollTop, clientHeight} = element;
            let height = scrollHeight -  clientHeight;
            this.progress = 100 * scrollTop / height + "%"
        }
    }
}
</script>
<style lang="scss" scoped>
    .scroll-top {
        position: fixed;
        left: 0;
        top: 0;
        height: 2px;
        background-color: #50bcb6;
        transition: width .5s ease;
        z-index: 999;
    }
</style>
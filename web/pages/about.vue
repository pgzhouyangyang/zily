<template>
    <div class="info-detail">
        <section>
            <div class="content" v-html="info.contentHtml">
            </div>
        </section>
    </div>
</template>
<script>
import {setScroll, dateFormat} from "../plugins/public"
export default {
    data() {
        return {
            info: {},
        }
    },
    async asyncData(context) {
        let res = await context.$axios.get(`/article/5f2518f80b7d1305bca7cce9`);
        return {info: res.data.body}
    }
}
</script>
<style lang="scss" scoped>
  
    .info-detail section {
        width: 800px;
        margin: 0 auto;
        transition: all .3s;
        padding-bottom: 80px;
        text-align: justify;
        
    }
   
    .title {
        font-size: 30px;
        padding: 130px 0 22px;
        color: #333;
    }
    .stuff>span {
        display: inline-block;
        vertical-align: middle;
        color: #6a737d;
        margin-right: 10px;
        font-size: 13px;
        line-height: 22px;
    }
    .content {
        padding-top: 100px;
        font-size: 16px;
        line-height: 26px;
    }
    @media screen and (max-width: 800px) {
        .info-detail section {
            width: 90%;
        }
        .title {
            font-size: 20px;
            padding: 90px 0 15px;
        }
        .content {
            padding-top: 40px;
        }
    }
</style>
<style >
    .info-detail h2{
        margin-bottom: 20px;
    }
    .info-detail h3  {
        margin-bottom: 10px;
    }
    .info-detail h4  {
        margin-bottom: 10px;
    }
    .info-detail ul {
        padding-left: 20px;
    }
    .info-detail hr {
        margin: 20px 0;
    }
</style>
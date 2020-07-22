<template>
    <div class="article-detail">
        <scroll-bar></scroll-bar>
        <tab-bar :info="info" :showTitle="showTitle"></tab-bar>
        <section>
            <h1 class="title" ref="title">{{info.caption}}</h1>
            <div class="stuff">
                <span>{{info.date | dateFormat}}</span>
                <span>阅读&nbsp;{{info.readNum}}</span>
                <span>喜欢&nbsp;{{info.likeNum}}</span>
                <span></span>
            </div>
            <div class="content">
                {{info.content}}
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
            io: null,
            showTitle: false
        }
    },
    mounted(){
        this.io = new IntersectionObserver(entries=> {
            this.showTitle = !entries[0].isIntersecting
        })
        this.io.observe(this.$refs.title)
    },
    filters: {
        dateFormat(value) {
            let dateParse = dateFormat(value);
            return dateParse.month.cn + " " + dateParse.day + ", " + dateParse.year
        }
    },
    async asyncData(context) {
        let res = await context.$axios.get(`/article/${context.params.articleId}`);
        return {info: res.data.body}
    }
}
</script>
<style lang="scss" scoped>
    .article-detail section {
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
        .article-detail section {
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
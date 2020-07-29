<template>
    <header class="tab-bar">
        <div>
            <span class="icon logo"><nuxt-link to="/">丸</nuxt-link></span>
            <span v-if="!player" class="icon iconfont icon-pause player" @click="onplayer"></span>
            <span v-else class="icon playing" @click="onplayer">
                <span class="line1"></span>
                <span class="line2"></span>
                <span class="line3"></span>
                <span class="line4"></span>
                <span class="line5"></span>
            </span>
        </div>
        <div >
            <h3 class="title" :class="[showTitle ? 'active' : '']">{{info.caption}}</h3>
        </div>
        <div>
            <span></span>
            <span class="icon iconfont icon-like like" :class="[like ? 'liked' : '']" @click="onlike"></span>
            <span class="icon portrait">
                <nuxt-link to="about"> <img src="https://image.raindays.cn/Mood/image/1593794583505.jpeg"></nuxt-link>
                
            </span>
        </div>

        <div class="music-progress" :style="{width: progress}"></div>
        <audio id="music" loop="loop" preload="auto" ref="music">
            <source type="audio/mpeg" :src="info.music.url">
        </audio>
    </header>
</template>
<script>
export default {
    props: {
        info: {
            type: Object
        },
        showTitle: false,
    },
    data() {
        return {
            like: false,
            player: false,
            progress: 0,
            timer: null
        }
    },
    destroyed() {
        clearInterval(this.timer);
    },
    methods: {
        onlike() {
            this.like = !this.like;
        },
        onplayer() {
            let music = this.$refs.music;
            let duration = music.duration;
            this.player = !this.player;
            if(this.player) {
                music.play();
                this.timer = setInterval(()=> {
                    let progress = 100 * music.currentTime / duration;
                    this.progress = progress + "%"
                }, 50)
            } else {
                 music.pause()
                 clearInterval(this.timer);
            }


        }
    }
}
</script>
<style lang="scss">
    .tab-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f6f7f8;
        padding: 0 15px;
        transition: all .3s;
        font-size: 24px;
        background: #fff;
        &>div:first-of-type,  &>div:last-of-type {
             flex: 0 0 auto;
        }
        .icon {
             width: 26px;
             height: 26px;
             font-size: 24px;
             float: left;
             margin: 0 5px;
             cursor: pointer;
             color: #888;
             transition: all 0.3s;
            
        }
        .logo {
            font-family: cursive;
            font-weight: bold;
            color: #333;
        }
        .portrait img{
            width: 100%;
            height: 100%;
            vertical-align: top
        }
        .like:hover {
            color: #ef6d57;;
        }
        .liked {
            color: #ef6d57;
        }
        .title {
            color: #666;
            font-weight: normal;
            font-size: 14px;
            opacity: 0;
            transition: all 0.3s;
            &.active {
                opacity: 1;
            }
        }
        .player {
            font-size: 18px;
            line-height: 26px;
            &:hover {
                color: #333;
            }
        }

        .playing{
            display: flex;
            align-items: flex-end;
            span {
                border-right: 3px solid #888;
                padding: 0 2px;
                height: 26px;
                animation: player 1s 0s infinite;
            }
            .line1 {
                // animation-delay: 1s;
                height: 14px;
            }
            .line2 {
                animation-delay: 0.1s;
                height: 20px;
            }
            .line3 {
                animation-delay: 0.2s;
                height: 26px;
            }
            .line4 {
                animation-delay: 0.3s;
                height: 20px;
            }
            .line5 {
                animation-delay: 0.2s;
                 height: 14px;
            }
        }
    }

    .music-progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 50px;
        background: #eee;
        z-index: -1;
    }
    // @media screen and (max-width: 600px){
    //          .tab-bar {
    //              position: absolute;
    //          }
    // }
    @keyframes player {
        0% {
            height: 26px;
        }
        10% {
            height: 22px;
        }
        20% {
            height: 18px;
        }
        30% {
            height: 14px;
        }
        40% {
            height: 10px;
        }
        50% {
            height: 6px;
        }
        60% {
            height: 10px;
        }
        70% {
            height: 14px;
        }
        80% {
            height: 18px;
        }
        90% {
            height: 22px;
        }
        100% {
            height: 26px;
        }
    }
</style>
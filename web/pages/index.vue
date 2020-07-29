<template>
  <div class="container" :class="{ navActive: showNav }">
    <header class="header">
      <div class="logo">
        丸·子
      </div>
      <div class="menu" @click="menu">
        <span
          ><i
            class="iconfont"
            :class="showNav ? 'icon-close' : 'icon-menu'"
          ></i
        ></span>
      </div>
    </header>
    <div class="cover">
      <img class="image" src="/images/cover.jpeg" alt />
      <div class="mask"></div>

      <section>
        <p class="time">{{ "2020-03-06" | dateFormat }}</p>
        <h2 class="title">
          <nuxt-link to="/">水调歌头·游泳</nuxt-link>
        </h2>
        <div class="describe">
          才饮长沙水，
          又食武昌鱼。
          万里长江横渡，
          极目楚天舒。
          不管风吹浪打，
          胜似闲庭信步，
          今日得宽馀。
          子在川上曰：
          逝者如斯夫！

          风樯动，
          龟蛇静，
          起宏图。
          一桥飞架南北，
          天堑变通途。
          更立西江石壁，
          截断巫山云雨，
          高峡出平湖。
          神女应无恙，
          当惊世界殊。
        </div>
      </section>
    </div>
    <main class="main">
      <section
        class="section"
        v-for="(item, index) in articleList"
        :key="item._id"
      >
        <div class="thumbnail">
          <img v-lazy="item.thumbnail.url" alt />
        </div>
        <div class="info">
          <p class="time">{{ item.date | dateFormat }}</p>
          <h2 class="title">
            <nuxt-link :to="item._id"
              >{{ item.caption }}</nuxt-link
            >
          </h2>
          <div class="describe">
            {{ item.describe }}
          </div>
          <div class="stuff">
            <div>
              <i class="iconfont icon-text"></i>
              <span>{{ item.words }}</span>
            </div>
            <div>
              <i class="iconfont icon-view"></i>
              <span>{{ item.readNum }}</span>
            </div>
            <div>
              <i class="iconfont icon-like"></i>
              <span>{{ item.likeNum }}</span>
            </div>
          </div>
        </div>
      </section>

      <div class="more">
        <button
          class="btn btn-default"
          @click="loadMore"
          v-show="loading == 'more'"
        >
          加载更多
        </button>

        <div class="btn loading" v-show="loading == 'loading'">
          加载中...
        </div>

        <div class="btn" v-show="loading == 'loaded'">
          没有更多了~~
        </div>
      </div>
    </main>
    <!-- <footer class="footer">


    </footer> -->
    <my-nav :show="showNav"></my-nav>

    <back-top></back-top>
  </div>
</template>

<script>
import { setScroll, dateFormat } from "../plugins/public";
const PAGESIZE = 10;
export default {
  data() {
    return {
      showNav: false,
      articleList: [],
      pageSize: PAGESIZE,
      pageNow: 1,
      loading: "more"
    };
  },
  methods: {
    menu() {
      this.showNav = !this.showNav;

      document.body.style.overflowY = this.showNav ? "hidden" : "";
    },

    loadMore() {
      if (this.loading == "loading" || this.loading == "loaded") {
        return;
      }
      this.pageNow += 1;
      this.loading = "loading";
      this.$nuxt.$loading.start();
      this.$axios
        .get("/article", {
          params: {
            pageSize: this.pageSize,
            pageNow: this.pageNow
          }
        })
        .then(res => {
          this.$nuxt.$loading.finish();
          setTimeout(() => {
            let result = res.data.body;
            this.articleList.push(...result.data);
            setScroll(".more", "index");
            this.loading =
              result.totalSize >
              Number(result.pageNow) * Number(result.pageSize)
                ? "more"
                : "loaded";
          }, 1000);
        });
    }
  },
  filters: {
    dateFormat(value) {
      let dateParse = dateFormat(value);
      return dateParse.month.cn + " " + dateParse.day + ", " + dateParse.year;
    }
  },
  beforeRouteLeave(to, from, next) {
    document.body.style.overflowY = "";
    next();
  },
  async asyncData(context) {
    let result = await context.$axios.get("/article", {
      params: {
        pageSize: PAGESIZE,
        pageNow: 1
      }
    });
    result = result.data.body;
    return {
      articleList: result.data,
      loading: result.totalSize < result.pageSize ? "loaded" : "more"
    };
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  height: 64px;
  z-index: 10;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;

  .logo {
    font-size: 40px;
    color: #fff;
    font-family: cursive;
    letter-spacing: -14px;;
  }

  .menu {
    width: 30px;
    height: 30px;
   background: hsla(0,0%,100%,.9);
   border-radius: 2px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    color: red;

    .icon-menu {
      font-size: 22px;
    }
  }
}
.navActive .header .logo {
  color: #333;
}
.cover {
  height: 100vh;
  position: relative;
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(109, 67, 47, 0.7); //rgba(176, 14, 37, 0.7);
    clip-path: polygon(0 0, 25% 0, 60% 100%, 0 100%);
  }

  section {
    position: absolute;
    top: 54%;
    left: 10%;
    color: #fff;
    width: 30%;
    transform: translateY(-50%);

    .time {
      font-size: 14px;
    }
    .title {
      margin: 15px 0 30px;
      transition: all .3s;
      font-weight: normal;
      a {
        font-size: 28px;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        transition: all .3s;

        &:hover {
          text-decoration: underline;
        }
      }
    }
    .describe {
      line-height: 22px;
    }
  }
}
.main {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 40px;
  position: relative;

  &::after {
    content: "";
    width: 1px;
    position: absolute;
    left: 50%;
    background: #eaeaea;
    top: -100px;
    bottom: 0;
    z-index: -1;
  }
}
.section {
  margin-top: 100px;
  padding: 0 10px;
  position: relative;

  .thumbnail {
    width: 680px;
    height: 440px;
    border-radius: 6px;
    border: 1px solid #f3fafd;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
    z-index: 1;
    display: inline-block;
    vertical-align: top;
    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .info {
    position: absolute;
    left: 660px;
    top: 20px;
    width: 500px;
    height: 400px;
    padding: 80px 100px 0 80px;
    border: 1px solid #eaeaea;
    border-radius: 6px;
    background: #fff;
    text-align: left;
    .time {
      color: #999;
      font-size: 12px;
    }
    .title {
      font-size: 24px;
      font-weight: normal;
      letter-spacing: 0.4px;
      margin-top: 8px;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      a {
        &:hover{
          background: radial-gradient(circle at 10px -7px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x,
          radial-gradient(circle at 10px 27px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x;
          background-size: 20px 20px;
          background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
          animation: waveFlow 1s infinite linear;
        }
        @keyframes waveFlow {
          from { background-position-x: -10px, 0; }
          to { background-position-x: -30px, -20px; }
        }
      }
    }

    .describe {
      color: #666;
      font-size: 14px;
      line-height: 22px;
      margin-top: 10px;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .stuff {
      display: flex;
      color: #999;
      margin-top: 60px;
      font-size: 16px;
      line-height: 22px;
      & > div {
        padding: 0 5px;
        transition: color 0.3s;

        &> * {
          display: inline-block;
          vertical-align: middle;
        }
      }

      & > div:hover {
        color: #50bcb6;
      }
    }
  }
}
.section:nth-of-type(even) {
  text-align: right;
}
.section:nth-of-type(even)  .info{
  left: auto;
  right: 660px;
}
.more {
  margin-top: 30px;
  text-align: center;
}
.footer {
  height: 300px;
  background: rgba(0, 0, 0, 0.1);
}
@media screen and (max-width: 1200px) {
  .main {
    width: 900px;
  }
  .section {
    .thumbnail {
      width: 480px;
      height: 310px;
      text-align: center;
      img {
        width: 680px;
      }
    }

    .info {
      left: 450px;
      top: 10px;
      width: 420px;
      height: 290px;
      padding: 50px 60px 0;

      .stuff {
        margin-top: 30px;
      }
    }


  }
  .section:nth-of-type(even)  .info{
    left: auto;
    right: 450px;
  }
}

@media screen and (max-width: 900px) {
  .main {
    width: 100%;
  }
  .section {
    margin-top: 60px;
    border-bottom: 1px solid #eaeaea;
    .thumbnail {
      width: 100%;

      max-height: 400px;
      border: none;

      img {
        max-width: 100%;
      }
    }
    .info {
      position: static;
      width: 100%;
      border: none;
      padding: 40px 20px;
      height: auto;
    }
  }
  .cover {
    .mask {
      clip-path: polygon(0 0,220px 0,700px 100%,0 100%);
    }
    section {
      width: 40%;
      .title a {
        font-size: 22px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .cover .mask {
    clip-path: none;
  }

  .header {
    top: 40px;
  }
  .cover {
    section {
     bottom: 8%;
      left: 5%;
      top: auto;
      width: 70%;
      transform: none;
    }
  }
}
</style>

<template>
  <div>
    <tab-bar :showLike="false"></tab-bar>
    <section class="section">
      <div class="year-wrapper" v-for="(value, key) in data" :key="key">
        <ul class="month-wrapper" v-for="(val, k) in value" :key="k">
          <li class="month">{{ val[0].date | dateFormat }}</li>
          <li>
            <ul class="day-wrapper">
              <li class="day" v-for="item in val" :key="item._id">
                <div class="day-l">
                  <img
                    v-lazy="item.thumbnail.url || '/images/default.jpg'"
                    alt
                  />
                  <div class="tit">
                    <p>
                      <nuxt-link :to="item._id"> {{ item.caption }}</nuxt-link>
                    </p>
                    <p>{{ item.likeNum }} LIKE / {{ item.readNum }} READ</p>
                  </div>
                </div>
                <div class="day-r">
                  {{ /(\d+)-(\d+)-(\d+)/.exec(item.date)[3] }}th
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <load-more :loading="loading"></load-more>
    </section>
  </div>
</template>
<script>
import { setScroll, dateFormat } from "../plugins/public";
const PAGESIZE = 10;
export default {
  data() {
    return {
      pageSize: PAGESIZE,
      pageNow: 1,
      loading: "loading",
      io: null
    };
  },
  methods: {
    formatData() {
      // 按年月将数据分开展示
    }
  },
  mounted() {
    let _this = this;
    this.io = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        _this.load();
      }
    });
    this.io.observe(document.querySelector(".bottom-loading"));
  },
  methods: {
    load() {
      setTimeout(() => {
        this.pageNow += 1;
        this.$axios
          .get("/article", {
            params: {
              pageSize: PAGESIZE,
              pageNow: this.pageNow
            }
          })
          .then(res => {
            let data = res.data.body.data;
            this.data = data.reduce((total, item) => {
              const [, year, month] = /(\d+)-(\d+)/.exec(item.date);
              total["_" + year] = total["_" + year] || {};
              total["_" + year]["_" + month] =
              total["_" + year]["_" + month] || [];
              total["_" + year]["_" + month].push(item);
              return total;
            }, this.data);
          });
      }, 1000);
    }
  },
  filters: {
    dateFormat(value) {
      let dateParse = dateFormat(value);
      return dateParse.month.cn + ", " + dateParse.year;
    }
  },
  async asyncData(context) {
    let result = await context.$axios.get("/article", {
      params: {
        pageSize: PAGESIZE,
        pageNow: 1
      }
    });
    let data = result.data.body.data;
    data = data.reduce((total, item) => {
      const [, year, month] = /(\d+)-(\d+)/.exec(item.date);
      total["_" + year] = total["_" + year] || {};
      total["_" + year]["_" + month] = total["_" + year]["_" + month] || [];
      total["_" + year]["_" + month].push(item);
      return total;
    }, {});
    return { data };
  }
};
</script>
<style lang="scss" scoped>
.section {
  width: 640px;
  margin: 0 auto;
  transition: all 0.3s;
  padding: 80px 20px 20px;
  margin: 0 auto;
}
.year-wrapper {
  padding: 10px 0;
}

.month-wrapper {
  .month {
    color: #6e7ab5;
    font-weight: 400;
    font-size: 18px;
    margin: 30px 0 10px;
    list-style: none;
    position: relative;

    &::before {
      content: "";
      width: 12px;
      height: 12px;
      display: inline-block;
      background-color: #dce8ec;
      border: 3px solid #afcfff;
      margin-right: 22px;
      border-radius: 50%;
      box-sizing: border-box;
    }
  }
}
.day-wrapper {
  padding-left: 30px;
  border-left: 1px solid #f3fafd;
  margin-left: 6px;

  .day {
    padding: 25px 0;
    border-bottom: 1px solid #f3fafd;
    display: flex;
    justify-content: space-between;
  }
  .tit {
    a {
      word-break: break-all;
      // display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      &:hover {
        background: radial-gradient(
              circle at 10px -7px,
              transparent 8px,
              currentColor 8px,
              currentColor 9px,
              transparent 9px
            )
            repeat-x,
          radial-gradient(
              circle at 10px 27px,
              transparent 8px,
              currentColor 8px,
              currentColor 9px,
              transparent 9px
            )
            repeat-x;
        background-size: 20px 20px;
        background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
        animation: waveFlow 1s infinite linear;
      }
      @keyframes waveFlow {
        from {
          background-position-x: -10px, 0;
        }
        to {
          background-position-x: -30px, -20px;
        }
      }
    }
  }
  .tit p:first-of-type {
    color: #5b6773;
    cursor: pointer;
    font-size: 15px;
    padding-bottom: 5px;
  }
  .tit p:last-of-type {
    color: #a1a0d6;
    font-size: 13px;
    letter-spacing: 0;
  }
  .day-l {
    display: flex;
    img {
      width: 45px;
      height: 45px;
      border-radius: 4px;
      margin-right: 15px;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      justify-content: center;
      border: 1px solid #f3fafd;
    }
  }
  .day-r {
    color: #d2c6a3;
    font-size: 13px;
  }
}

@media screen and (max-width: 500px) {
  .section {
    width: 100%;
    padding-top: 60px;
  }
  .day-wrapper {
    padding-left: 18px;
  }
}
</style>

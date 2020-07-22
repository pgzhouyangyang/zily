<template>
<transition name="slide">
  <div class="nav" v-show="show">
    <ul class="nav-list">
      <li><nuxt-link to="/">Article</nuxt-link></li>
      <li><nuxt-link to="/about">About</nuxt-link></li>
    </ul>
  </div>
</transition>
</template>
<script>
export default {
    props: ["show"]
}
</script>
<style lang="scss" scoped>
    .nav {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 200;
      background: hsla(0,0%,100%,.96);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      opacity: 1;
    }
    .slide-enter {
      transform: translateY(-100%);
      opacity: 0;
    }
    .slide-leave {
      transform: translateY(0);
    }
    .slide-leave-active {
      opacity: 0;
      transform: translateY(-100%);
    }
    .nav-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        padding: 0 20px 10px 20px;
        a {
          font-size: 20px;
          cursor: pointer;
          color: #666;
          letter-spacing: 1px;
          &:hover {
            color: #333;
          }
        }
      }
    }
</style>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul>
    <img :src="Asrc" alt="">
    <div class='divmy' :style="'background-image:url('+Bsrc+')'"></div>
    <button @click="showImg">点击</button>
    <div class="mask" v-show="count!=2"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      Asrc: "",
      Bsrc: "",
      imgSrc:
        "http://" +
        window.location.host +
        window.location.pathname +
        "static/images/logo.png",
      num: 0,
      count: 0
    };
  },
  watch: {
    count(newVal, oldVal) {
      if (newVal === 2) {
        this.Bsrc = this.imgSrc;
      }
    }
  },
  mounted() {
    const that = this;
    let imgArr = ["logo.png", "logo1.png"];
    for (let i = 0; i < imgArr.length; i++) {
      let img = new Image();
      img.src = this.imgSrc;
      img.style = "opcity:0;position:fixed;top:-100%;left:-100%;";
      img.onload = function() {
        that.$el.appendChild(img);
        that.count++;
      };
    }
  },
  methods: {
    showImg() {
      if (this.num === 1) {
        this.Bsrc = this.imgSrc;
      } else {
        this.Asrc = this.imgSrc;
        this.num++;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.divmy {
  width: 200px;
  height: 200px;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.6;
  background-color: #000;
  z-index: 1000;
}
</style>

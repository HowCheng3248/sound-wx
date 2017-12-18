<template>
  <div>
    <ul id="container" class="container">
      <li v-for="color in getColor" :class="color" v-on:click="choiceBox(color,$event)"></li>
    </ul>
    <p style="display:none;">{{select.length}}</p>
  </div>
</template>
<script>
export default {
  name: "game",
  data() {
    return {
      colors: [
        "red",
        "red",
        "black",
        "black",
        "green",
        "green",
        "blue",
        "blue",
        "yellow",
        "yellow"
      ],
      select: []
    };
  },
  computed: {
    getColor() {
      return this.colors.sort(function() {
        return 0.5 - Math.random();
      });
    }
  },
  mounted() {},
  methods: {
    choiceBox(color, e) {
      if (e.target.classList.length === 2) {
        //已经算中再次点击
        e.target.classList.remove("selected");
        for (let i = 0; i < this.select.length; i++) {
          if (this.select[i] === color) {
            this.select.splice(i, 1);
          }
        }
        return false;
      }
      if (this.select.length < 2) {
        this.select.push(color);
        e.target.classList.add("selected");
      } else {
        //不能选3个
        return false;
      }
      if (this.select.length === 2 && this.select[0] === this.select[1]) {
        //删除相同元素
        let children = document.getElementsByClassName(this.select[0]);
        document.getElementById("container").removeChild(children[0]);
        document.getElementById("container").removeChild(children[0]);
        this.select = [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: row wrap;
  width: 200px;
  height: 80px;
  li {
    list-style: none;
    width: 40px;
    height: 40px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #eee;
    &.selected {
      opacity: 0.5;
    }
  }
}
.red {
  background-color: red;
}
.black {
  background-color: black;
}
.blue {
  background-color: blue;
}
.yellow {
  background-color: yellow;
}
.green {
  background-color: green;
}
</style>

<template>
  <div>
    <ul id="container" class="container">
      <li v-for="color in getColor" :class="color" @click="choiceBox(color)"></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'game',
    data () {
      return {
        colors: ['red', 'red', 'black', 'black', 'green', 'green', 'blue', 'blue', 'yellow', 'yellow'],
        sltA: '',
        sltB: ''
      }
    },
    computed: {
      getColor(){
        return this.colors.sort(function () {
          return 0.5 - Math.random();
        });
      },
    },
    mounted(){
    },
    methods: {
      choiceBox(color){
          if(this.sltA!==''&&this.sltB!==''){

          }else if(this.sltA===''&&this.sltB!==''){
            this.sltA = color;
          }else if(this.sltA!==''&&this.sltB===''){
            this.sltB = color;
          }else {
            this.sltA = color;
          }
      }
    }
  }
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
      &.selected{
        opacity: .5;
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

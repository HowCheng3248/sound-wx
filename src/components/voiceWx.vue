<template>
  <div class="container">
    <button class="btn" type="button" :class="{'working':isWorking}">{{btnText}}</button>
    <!--@touchstart.capture="statVoice"  @touchend="stopVoice"-->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        btnText:'点击开始吹气',
        isWorking:false,
        voice: {
          localId: '', //音频的本地ID
          serverId: '', // 返回音频的服务器端ID
        },
        resData: {},
        appId: 'wxbf6bc8d2ddf651ad',
      }
    },
    mounted(){
      this.getWxAjax();
    },
    methods: {
      getWxAjax(){
        const that = this;
        let host = PUBLICSRC;
        let option = {
          url: `/getBaseInfo?url=${PUBLICSRC}`,
          method: 'get',
          data: {},
        };
        that.axios(option).then((res) => {
          this.resData = res.data;
          this.wxReady();
        }).catch((error) => {
          alert(error);
        });
      },
      wxReady(){
          const that = this;
        let configObj = {
          debug: false,
          appId: this.appId, // 必填，公众号的唯一标识
          timestamp: this.resData.timestamp, // 必填，生成签名的时间戳
          nonceStr: this.resData.noncestr, // 必填，生成签名的随机串
          signature: this.resData.signature, // 必填，签名
          jsApiList: ['startRecord', 'stopRecord', 'uploadVoice']
        };
        wx.config(configObj);
        wx.ready(function () {
          that.$el.children[0].onclick = function () {
            that.voiceStep();
          };
        });
        wx.error(function (res) {
          alert(res.errMsg);
        });
      },
      voiceStep(){
          if(!this.isWorking){
              this.statVoice();
          }else {
              this.stopVoice();
          }
      },
      statVoice(){
        this.btnText = '再次点击结束吹气';
        this.isWorking = true;
        wx.startRecord({
          cancel: function () {
            alert('用户拒绝授权录音');
          }
        });
      },
      stopVoice(){
        this.btnText = '等待结果';
        this.isWorking = false;
        wx.stopRecord({
          success: function (res) {
            this.voice.localId = res.localId;
            alert('语音成功，localId 为' + res.localId);
            //上传语音
            wx.uploadVoice({
              localId: this.voice.localId,
              success: function (res) {
                alert('上传语音成功，serverId 为' + res.serverId);
                this.voice.serverId = res.serverId;
              }
            });
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
      },
    },
  }
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    .btn {
      outline: none;
      border: 0;
      position: relative;
      display: block;
      width: 2rem;
      height: 2rem;
      margin: 1rem auto;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border-radius: 100%;
      font-size: .2rem;
      text-align: center;
      text-decoration: none;
      color: #FFFFFF;
      line-height: 2rem;
      overflow: hidden;
      background-color: #04be02;
      /*&:visited {
        color: #FFFFFF;
      }
      &:active {
        animation: myBtn 1s infinite;
        -webkit-animation: myBtn 1s infinite;
      }*/
      &.working {
        animation: myBtn 1s infinite;
        -webkit-animation: myBtn 1s infinite;
      }
     /* &:after {
        content: " ";
        width: 200%;
        height: 200%;
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid rgba(0, 0, 0, 0.2);
        -webkit-transform: scale(0.5);
        -ms-transform: scale(0.5);
        transform: scale(0.5);
        -webkit-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
      }*/
    }
  }

  @keyframes myBtn {
    0% {
      -webkit-box-shadow: 0 0 .2rem 0 #039702;
      -moz-box-shadow: 0 0 .2rem 0 #039702;
      box-shadow: 0 0 .2rem 0 #039702;
    }
    50% {
      -webkit-box-shadow: 0 0 .2rem .1rem #039702;
      -moz-box-shadow: 0 0 .2rem .1rem #039702;
      box-shadow: 0 0 .2rem .1rem #039702;
    }
    100% {
      -webkit-box-shadow: 0 0 .2rem .2rem #039702;
      -moz-box-shadow: 0 0 .2rem .2rem #039702;
      box-shadow: 0 0 .2rem .2rem #039702;
    }
  }
</style>

/* http://res.wx.qq.com/open/js/jweixin-1.2.0.js 需要引用的外部js */
wx.config({
    debug: false,
    appId: '', // 必填，公众号的唯一标识
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名
    jsApiList: ['startRecord', 'stopRecord', 'uploadVoice']
});

wx.ready(function() {
    var voice = {
        localId: '', //音频的本地ID
        serverId: '' // 返回音频的服务器端ID
    };
    //开始录音
    wx.startRecord({
        cancel: function() {
            alert('用户拒绝授权录音');
        }
    });
    //停止录音
    wx.stopRecord({
        success: function(res) {
            voice.localId = res.localId;
        },
        fail: function(res) {
            alert(JSON.stringify(res));
        }
    });
    //上传语音
    if (voice.localId == '') {
        alert('请先录制一段声音');
        return;
    }
    wx.uploadVoice({
        localId: voice.localId,
        success: function(res) {
            alert('上传语音成功，serverId 为' + res.serverId);
            voice.serverId = res.serverId;
        }
    });
});

wx.error(function(res) {
    alert(res.errMsg);
});

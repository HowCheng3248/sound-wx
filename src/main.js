import Vue from 'vue'
import App from './App'
import Axios from './axios'
import VueAxios from 'vue-axios'
import 'babel-polyfill'

Vue.use(VueAxios, Axios);
Vue.prototype.PUBLICSRC = PUBLICSRC;
Vue.prototype.dataReport = function(pageCode, openId, cb) {
    Vue.axios.get('/dataReport/reported?openid=' + openId + '&appid=1&pageCode=' + pageCode + '&operatorCode=1').then((res) => {
        if (res.data.code === 200) {
            if (cb) {
                cb();
            }
        }
    }).catch((err) => {
        Vue.$messagebox(tipObj.error);
    });
};


/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
})
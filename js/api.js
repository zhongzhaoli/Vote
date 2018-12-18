const api = {
    //socket_url
    socket_url: (typeof baseSocket !== 'undefined') ? baseSocket : "http://111.231.242.150:1080",
    //api_url
    url: (typeof baseUrl !== 'undefined') ? baseUrl : "http://10.1.53.123:9999",
    //登录接口 获取用户信息接口
    login_api(id) {
        let url = this.url + "/auth";
        return ajax.ajax(url, 'post', {
            "id": id
        });
    },
    //用户投票纪录几口
    user_vote_history(user_id) {
        let url = this.url + "/orgVote?userid=" + user_id;
        return ajax.ajax(url);
    },
    //投票接口
    vote(obj) {
        let url = this.url + "/vote";
        return ajax.ajax(url, "post", obj);
    },
    //总计接口
    total() {
        let url = this.url + "/total";
        return ajax.ajax(url, "get");
    },
    //清空接口
    clear(data) {
        let url = this.url + "/clear";
        return ajax.ajax(url, "post", data);
    },
    //获取状态
    get_status(){
        let url = this.url + "/status";
        return ajax.ajax(url, "get");
    },
    //修改状态
    change_status(type, data = {"userid": getCookie("kx_user_id")}){
        let url = this.url + "/admin/" + type;
        return ajax.ajax(url, "post", data);
    }
}
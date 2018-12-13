const api =  {
    //socket_url
    socket_url: (typeof baseSocket !== 'undefined') ? baseSocket : "http://10.1.53.149:1080",
    //api_url
    url: (typeof baseUrl !== 'undefined') ? baseUrl : "http://10.1.53.123:9999",
    //登录接口 获取用户信息接口
    login_api(id){
        let url = this.url + "/auth";
        return ajax.ajax(url, 'post', {"id": id});
    },
    //用户投票纪录几口
    user_vote_history(user_id){
        let url = this.url + "/orgVote?userid=" + user_id;
        return ajax.ajax(url);
    },
    //投票接口
    vote(obj){
        let url = this.url + "/vote";
        return ajax.ajax(url, "post", obj);
    }
}
window.api = api;
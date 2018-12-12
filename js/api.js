const api =  {
    url: "",
    login_api(id){
        let url = this.url + "/auth";
        return ajax.ajax(url, 'post', {"id": id});
    }
}
window.api = api;
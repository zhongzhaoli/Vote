const ajax = {
    ajax: function(url, type, data = {}){
        var promise = new Promise(function(sucess, error){
            $.ajax({
                url: url,
                data: data,
                type: type,
                success: (mes) => {
                    sucess(mes);
                },
                error: (err) => {
                    error(err);
                }
            })
        });
        return promise;
    }
};
window.ajax = ajax;
const ajax = {
    ajax: function(url, type, data = {}){
        var promise = new Promise(function(sucess_fun, error_fun){
            $.ajax({
                url: url,
                data: data,
                type: type,
                success: (mes) => {
                    sucess_fun(mes);
                },
                error: (err) => {
                    error_fun(err);
                }
            })
        });
        return promise;
    }
};
window.ajax = ajax;
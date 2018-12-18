$(function () {
    let img = new Image();
    img.onload = function () {

    }
    img.src = "../images/loading.gif";
})

let show_loading = function () {
    if ($(".loading").length) {
        $(".loading").remove();
    }
    let a = $("<div class='loading'><img src='./images/loading.gif'></div>").appendTo($("body"));
    a.show();
}
let close_loading = function () {
    $(".loading").remove();
}
let body_show = function () {
    $("[data-body]").show();
}
Array.prototype.max = function () {
    var max = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++) {
        if (this[i] > max) {
            max = this[i];
        }
    }
    return max;
}
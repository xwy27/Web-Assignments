$().ready(function () {
    $("button[type=reset]").trigger("click");
    $("#error").hide("fast");
    $("button[type=reset]").click(function () {
        $("input").removeClass("error");
        $("#error").hide("fast");
    });
    $("input").click(function () {
        $("#error").hide("fast");
    });
    $("#username").bind("input propertychange", function () {
        if (validUsername($(this).val())) this.classList.remove("error");
        else this.classList.add("error");
    });
    $("#studentId").bind("input propertychange", function () {
        if (validStuId($(this).val())) this.classList.remove("error");
        else this.classList.add("error");
    });
    $("#tel").bind("input propertychange", function () {
        if (validTel($(this).val())) this.classList.remove("error");
        else this.classList.add("error");
    });
    $("#mailBox").bind("input propertychange", function () {
        if (validMail($(this).val())) this.classList.remove("error");
        else this.classList.add("error");
    });
    if ($("#error").html() != "right") {
        $("#error").show("fast");
    }
});

function check() {
    var message = $("input");
    var result = isValid(message);
    if (!result) {
        $("#error").html("请检查信息合法性!");
        $("#error").show("fast");
    }
    return result;
}

function isValid(message) {
    var valid = true;
    if (!validUsername($(message[0]).val())) {
        $(message[0]).addClass('error');
        valid = false;
    } else {
        $(message[0]).removeClass('error');
    }
    if (!validStuId($(message[1]).val())) {
        $(message[1]).addClass('error');
        valid = false;
    } else {
        $(message[1]).removeClass('error');
    }
    if (!validTel($(message[2]).val())) {
        $(message[2]).addClass('error');
        valid = false;
    } else {
        $(message[2]).removeClass('error');
    }
    if (!validMail($(message[3]).val())) {
        $(message[3]).addClass('error');
        valid = false;
    } else {
        $(message[3]).removeClass('error');
    }
    return valid;
}

function validUsername(username) {
    return username.match(/^[a-zA-Z]{1}\w{5,17}/) != null;
}

function validStuId(studentId) {
    return studentId.match(/^[1-9]{1}\d{7}$/) != null;
}

function validTel(tel) {
    return tel.match(/^[1-9]{1}\d{10}$/) != null;
}

function validMail(mailBox) {
    return mailBox.match(/^[a-zA-Z0-9_\-]+@(([a-zA-Z_])+\.)com$/) != null;
}
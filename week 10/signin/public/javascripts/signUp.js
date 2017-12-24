$().ready(function () {
    var OL_Action_Root = "http://localhost:8000";
    //bind the click event for reset
    $("button[type=reset]").trigger("click");
    $("button[type=reset]").click(function () {
        $("input").removeClass("error");
        $("#error").hide("fast");
        $("#ERROR").hide("fast");
    });
    
    //bind the click event for back
    $("button[type=back]").trigger("click");
    $('button[type=back]').click(function() {
        window.location.href='/';
    });
    
    //hide the error message
    $("#error").hide("fast");
    if ($("#ERROR").html().length < 2) {
        $("#ERROR").hide("fast");
    }
    $("input").click(function () {
        $("#error").hide("fast");
        $("#ERROR").hide("fast");
    });
    //show error message
    if ($("#error").html() != "right") {
        $("#error").show("fast");
    }

    //highlight the error item real time
    $("#username").bind("input propertychange", function () {
        if (validUsername($(this).val())) this.classList.remove("error");
        else this.classList.add("error");
    });
    $("#password").bind("input propertychange", function () {
        if (validPsd($(this).val())) this.classList.remove("error");
        else this.classList.add("error");
    });
    $("#confirmpsd").bind("input propertychange", function () {
        if ($(this).val() == $("#password").val()) this.classList.remove("error");
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

    //the implement of no jumping page after form post
    //make show error message without reload page from sever true
    $("#formSignUp").ajaxForm(function(data){  
		// alert(data['error']);
		if (data['error'] != undefined) {
			$('#error').html(data['error']);
			$('#error').show('fast');
		} else {
			window.location.href = OL_Action_Root + '/detail';
		}
  	});
});

//font-end check validation
function check() {
    var message = $("input");
    var result = detailError(message);
    if (result != 'right') {
        $("#error").html(result);
        $("#error").show("fast");
        return false;
    }
    return true;
}

//font-end invalidation message
function detailError(message) {
    var valid = "";
    var flag = true;
    if ($(message[0]).val().length < 6 || $(message[0]).val().length > 18) {
        flag = false;
        valid += "<br>用户名长度应为6-18";
    }
    if ($(message[0]).val().match(/^[a-zA-Z]/) == null) {
        flag = false;
        valid += "<br>用户名应以英文字母开头";
    }
    if ($(message[1]).val().length < 6 || $(message[1]).val().length > 12) {
        flag = false;
        valid += "<br>密码长度为6-12";
    }
    if (!validPsd($(message[1]).val())) {
        flag = false;
        valid += "<br>密码由数字，字母，中划线或下划线组成";
    }
    if ($(message[2]).val() != $(message[1]).val()) {
        flag = false;
        valid += "<br>密码不一致";
    }
    if ($(message[3]).val().length != 8) {
        flag = false;
        valid += "<br>学号长度为8";
    }
    if ($(message[3]).val()[0] == '0') {
        flag = false;
        valid += "<br>学号不能以0开头";
    }
    if ($(message[4]).val().length != 11) {
        flag = false;
        valid += "<br>电话号码长度应为11";
    }
    if ($(message[4]).val()[0] == '0') {
        flag = false;
        valid += "<br>电话号码不能以0开头";
    }
    if (!validMail($(message[5]).val())) {
        flag = false;
        valid += "<br>邮箱格式为xxx@xx.com";
    }
    if (flag)    return 'right';
    else {
        valid = valid.substr(4);
        return valid;
    }
}

function validUsername(username) {
    return username.match(/^[a-zA-Z]{1}\w{5,17}/) != null;
}

function validPsd(password) {
    return password.match(/^[a-zA-z0-9_-]{6,12}/) != null;
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
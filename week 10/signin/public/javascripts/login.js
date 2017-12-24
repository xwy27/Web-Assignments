$(function(){
	var OL_Action_Root = "http://localhost:8000";

	$('#signup').click(function() {
		window.location.href='/regist';
	});

	$("#error").hide("fast");
	$("#username").bind("input propertychange", function () {
        $('#message').hide('fast');
    });
	$("#password").bind("input propertychange", function () {
		$('#message').hide('fast');
    });

	//the implement of no jumping page after form post
    //make show error message without reload page from sever true
	$("#formLogin").ajaxForm(function(data){  
		// alert(data['error']);
		if (data['error'] != undefined) {
			$('#message').html(data['error']);
			$('#message').show('fast');
		} else {
			window.location.href = OL_Action_Root + '/detail';
		}
  	});
});
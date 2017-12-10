$(document).ready(function() {
    $('#result').addClass('disabled');
    listenIcon();
    listenMouse();
})

function listenIcon() {
    $('.apb').eq(0).click(function() {
        printOrder();
    });
}

//鼠标移出区域
function listenMouse() {
    $('#button').mouseleave(function() {
        $('#result').text('');
        reset();
    });
}

function reset() {
    $('#control-ring li').each(function() {
        $(this).removeClass('disabled-fixed');
    });
    $('.value').each(function() {
        $(this).html('...');
        $(this).removeClass('value-visable');
        $(this).removeClass('value-invisable');
    });
    $('#result').addClass('disabled');
    $('#order').html('');
}

function printOrder() {
    var doList = $.makeArray($("li"));
	doList.sort(function () {
		return (Math.random() < 0.5);
	});
	var order = [];
	for (var i = 0; i < doList.length; i++){
		order.push($(doList[i]).attr('id'));
    };
    $('#order').html('Order: ' + order.join(', '));
    selectHandler(order, doList, 0);
}

function selectHandler(order, doList, currentSum) {
    $('.apb').unbind();
    var handler = {
        'A' : aHandler,
        'B' : bHandler,
        'C' : cHandler,
        'D' : dHandler,
        'E' : eHandler
    };
    if (order.length != 0) {
        var command = order.shift();
        var target = doList.shift();
        var error = failHandler();
        handler[command].call(target, error, order, doList, currentSum);
    } else {
        var error = failHandler();
        bubbleHandler.call($('#result'), error, currentSum);
    }
}

function aHandler(error, order, doList, currentSum) {
    var target = this;
    if (error) {
        $('#order').html($("#order").html() + "<br/>" + '这不是个天大的秘密');
    } else {
        $('#order').html($("#order").html() + "<br/>" + '这是个天大的秘密');
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000',
        async: true,
        beforeSend: function() {
            if (!$(target).hasClass('disabled') && !$(target).hasClass('disabled-fixed')) {
                $(target).children('div').eq(0).addClass('value-visable');
                $(target).addClass('running');
                $(target).prevAll().addClass('disabled');
                $(target).nextAll().addClass('disabled');
            }
        },
        success: function(data) {
            $(target).children('div').eq(0).html(data);
            $(target).prevAll().removeClass('disabled');
            $(target).nextAll().removeClass('disabled');
            $(target).addClass('disabled-fixed').removeClass('running');
            selectHandler(order, doList, currentSum + parseInt(data));
        }
    });
}

function bHandler(error, order, doList, currentSum) {
    var target = this;
    if (error) {
        $('#order').html($("#order").html() + "<br/>" + '我知道');
    } else {
        $('#order').html($("#order").html() + "<br/>" + '我不知道');
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000',
        async: true,
        beforeSend: function() {
            if (!$(target).hasClass('disabled') && !$(target).hasClass('disabled-fixed')) {
                $(target).children('div').eq(0).addClass('value-visable');
                $(target).addClass('running');
                $(target).prevAll().addClass('disabled');
                $(target).nextAll().addClass('disabled');
            }
        },
        success: function(data) {
            $(target).children('div').eq(0).html(data);
            $(target).prevAll().removeClass('disabled');
            $(target).nextAll().removeClass('disabled');
            $(target).addClass('disabled-fixed').removeClass('running');
            selectHandler(order, doList, currentSum + parseInt(data));
        }
    });
}

function cHandler(error, order, doList, currentSum) {
    var target = this;
    if (error) {
        $('#order').html($("#order").html() + "<br/>" + '你知道');
    } else {
        $('#order').html($("#order").html() + "<br/>" + '你不知道');
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000',
        async: true,
        beforeSend: function() {
            if (!$(target).hasClass('disabled') && !$(target).hasClass('disabled-fixed')) {
                $(target).children('div').eq(0).addClass('value-visable');
                $(target).addClass('running');
                $(target).prevAll().addClass('disabled');
                $(target).nextAll().addClass('disabled');
            }
        },
        success: function(data) {
            $(target).children('div').eq(0).html(data);
            $(target).prevAll().removeClass('disabled');
            $(target).nextAll().removeClass('disabled');
            $(target).addClass('disabled-fixed').removeClass('running');
            selectHandler(order, doList, currentSum + parseInt(data));
        }
    });
}

function dHandler(error, order, doList, currentSum) {
    var target = this;
    if (error) {
        $('#order').html($("#order").html() + "<br/>" + '他知道');
    } else {
        $('#order').html($("#order").html() + "<br/>" + '他不知道');
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000',
        async: true,
        beforeSend: function() {
            if (!$(target).hasClass('disabled') && !$(target).hasClass('disabled-fixed')) {
                $(target).children('div').eq(0).addClass('value-visable');
                $(target).addClass('running');
                $(target).prevAll().addClass('disabled');
                $(target).nextAll().addClass('disabled');
            }
        },
        success: function(data) {
            $(target).children('div').eq(0).html(data);
            $(target).prevAll().removeClass('disabled');
            $(target).nextAll().removeClass('disabled');
            $(target).addClass('disabled-fixed').removeClass('running');
            selectHandler(order, doList, currentSum + parseInt(data));
        }
    });
}

function eHandler(error, order, doList, currentSum) {
    var target = this;
    if (error) {
        $('#order').html($("#order").html() + "<br/>" + '才不怪');
    } else {
        $('#order').html($("#order").html() + "<br/>" + '才怪');
    }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000',
        async: true,
        beforeSend: function() {
            if (!$(target).hasClass('disabled') && !$(target).hasClass('disabled-fixed')) {
                $(target).children('div').eq(0).addClass('value-visable');
                $(target).addClass('running');
                $(target).prevAll().addClass('disabled');
                $(target).nextAll().addClass('disabled');
            }
        },
        success: function(data) {
            $(target).children('div').eq(0).html(data);
            $(target).prevAll().removeClass('disabled');
            $(target).nextAll().removeClass('disabled');
            $(target).addClass('disabled-fixed').removeClass('running');
            selectHandler(order, doList, currentSum + parseInt(data));
        }
    });
}

function bubbleHandler(error, currentSum) {
    if (error) {
        $('#order').html($("#order").html() + "<br/>" + '楼主异步调用战斗力感人，目测不超过' + currentSum);
    } else {
        $('#order').html($("#order").html() + "<br/>" + '楼主异步调用战斗力感人，目测超过' + currentSum);
    }
    $(this).html(currentSum);
    $(this).addClass('disabled');
    $('#control-ring li').each(function() {
        $(this).removeClass('disabled-fixed').removeClass('disabled');
    });
}

function failHandler() {
    return (Math.random() < 0.5);
}
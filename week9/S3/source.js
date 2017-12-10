$(document).ready(function() {
    var isPlaying = false;
    $('#result').addClass('disabled');
    listenIcon();
    listenMouse();
})

function listenIcon() {
    $('.apb').eq(0).click(function() {
        reset();
        isPlaying = true;
        getAllRandomNumbers();
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
    isPlaying = false;
    $('#control-ring li').each(function() {
        $(this).removeClass('disabled-fixed').removeClass('disabled');
    });
    $('.value').each(function() {
        $(this).html('...');
        $(this).removeClass('value-visable');
        $(this).removeClass('value-invisable');
    });
    $('#result').addClass('disabled');
}

function getResult() {
    var sum = 0;
    $('.value').each(function() {
        sum += parseInt($(this).html());
    });
    $('#result').html(sum);
    $('#result').addClass('disabled');
    $('#control-ring li').each(function() {
        $(this).removeClass('disabled-fixed').removeClass('disabled');
    });
    isPlaying = false;
}

function getRandomNumber(arg) {
    $('.apb').unbind();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000',
        async: true,
        cache: false,
        beforeSend: function() {
            if (isPlaying) {
                arg.children('div').eq(0).addClass('value-visable');
                arg.addClass('running');
            }
        },
        success: function(data) {
            if (isPlaying) {
                arg.children('div').eq(0).html(data);
                arg.addClass('disabled-fixed').removeClass('running');
                if (finish()) {
                    getResult();
                }
            }
        }
    });
}

function getAllRandomNumbers() {
    $('#control-ring li').each(function() {
        getRandomNumber($(this));
    });
}

function finish() {
    var flag = true;
    $('#control-ring li').each(function() {
        if (!$(this).hasClass('disabled-fixed')) {
            flag = false;
        }
    });
    if (flag) {
        $('#result').removeClass('disabled');
    }
    return flag;
}
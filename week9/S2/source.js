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
        getRandomNumber($('#control-ring li').eq(0), 0);
    });
}

//鼠标移出区域
function listenMouse() {
    $('#button').mouseleave(function() {
        $('#result').html('');
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
    $('#result').html('');
}

function getResult() {
    var sum = 0;
    $('.value').each(function() {
        sum += parseInt($(this).html());
    });
    $('#result').html(sum);
    $('#result').addClass('disabled');
    $('#control-ring li').each(function() {
        $(this).removeClass('disabled-fixed');
    });
    isPlaying = false;
}

function getRandomNumber(arg, counter) {
    $('.apb').unbind();
    if (counter != 5) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000',
            async: true,
            beforeSend: function() {
                if (!arg.hasClass('disabled') && !arg.hasClass('disabled-fixed') && isPlaying) {
                    arg.children('div').eq(0).addClass('value-visable');
                    arg.addClass('running');
                    arg.prevAll().addClass('disabled');
                    arg.nextAll().addClass('disabled');
                }
            },
            success: function(data) {
                if (isPlaying) {
                    arg.children('div').eq(0).html(data);
                    arg.prevAll().removeClass('disabled');
                    arg.nextAll().removeClass('disabled');
                    arg.addClass('disabled-fixed').removeClass('running');
                    if (finish()) {
                        getResult();
                    }
                    getRandomNumber(arg.next(), counter+1);
                }
            }
        });
    }
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
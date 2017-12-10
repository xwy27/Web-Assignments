$(document).ready(function() {
    var isPlaying = false;
    $('#result').addClass('disabled');
    listenRingMenu();
    listenInfo();
    listenMouse();
})

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
}

function listenRingMenu() {
    $('#control-ring li').click(function() {
        if (!$(this).hasClass('disabled') &&
            !$(this).hasClass('disabled-fixed') &&
            !$(this).hasClass('running')) {
                isPlaying = true;
                getRandomNumber($(this));
            }
    });
    
}

function listenInfo() {
    $('#result').click(function() {
        if (finish()) {
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
    });
}

function getRandomNumber(arg) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000',
        async: true,
        beforeSend: function() {
            if ($('#result').html() != '') {
                $('.value').each(function() {
                    $(this).html('...');
                    $(this).addClass('value-invisable');
                });
                $('#result').html('');
            }
            if (!arg.hasClass('disabled') && !arg.hasClass('disabled-fixed') && isPlaying) {
                arg.children('div').eq(0).removeClass('value-invisable').addClass('value-visable');
                arg.addClass('running');
                arg.prevAll().addClass('disabled');
                arg.nextAll().addClass('disabled');
            }
        },
        success: function(data) {
            if (isPlaying)
                arg.children('div').eq(0).html(data);
        },
        complete: function() {
            if (isPlaying) {
                arg.prevAll().removeClass('disabled');
                arg.nextAll().removeClass('disabled');
                arg.addClass('disabled-fixed').removeClass('running');
                finish();
            }
        }
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

function partFinish() {
    var flag = false;
    $('#control-ring li').each(function() {
        if ($(this).hasClass('disabled-fixed')) {
            flag = true;
        }
    });
    return flag;
}


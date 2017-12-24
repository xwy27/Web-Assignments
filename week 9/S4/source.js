$(document).ready(function () {
    var isPlaying = false;
    $('#result').addClass('disabled');
    listenIcon();
    listenMouse();
})

function listenIcon() {
    $('.apb').eq(0).click(function () {
        reset();
        isPlaying = true;
        printOrder();
    });
}

//鼠标移出区域
function listenMouse() {
    $('#button').mouseleave(function () {
        $('#result').text('');
        reset();
    });
}

function reset() {
    isPlaying = false;
    $('#control-ring li').each(function () {
        $(this).removeClass('disabled-fixed').removeClass('disabled');
    });
    $('.value').each(function () {
        $(this).html('...');
        $(this).removeClass('value-visable');
        $(this).removeClass('value-invisable');
    });
    $('#result').addClass('disabled');
    $('#result').html('');
    $('#order').html('');
}

function getResult() {
    var sum = 0;
    $('.value').each(function () {
        sum += parseInt($(this).html());
    });
    $('#result').html(sum);
    $('#result').addClass('disabled');
    $('#control-ring li').each(function () {
        $(this).removeClass('disabled-fixed').removeClass('disabled');
    });
    isPlaying = false;
}

function randomize(arr1, arr2) {
    for (var i = arr2.length; i > 0; --i) {
        var index = Math.floor(Math.random() * i);

        var temp1 = arr1[i - 1];
        arr1[i - 1] = arr1[index];
        arr1[index] = temp1;

        var temp2 = arr2[i - 1];
        arr2[i - 1] = arr2[index];
        arr2[index] = temp2;
    }
}

function printOrder() {
    var order1 = ['A', 'B', 'C', 'D', 'E'];
    var order2 = [0, 1, 2, 3, 4];
    randomize(order1, order2);
    $('#order').html('Order: ' + order1.join(', '));
    getRandomNumber(order2, 0);
}

function getRandomNumber(arr, counter) {
    $('.apb').unbind();
    if (counter != 5) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000',
            async: true,
            beforeSend: function () {
                if (!$("#control-ring li").eq(arr[counter]).hasClass('disabled') &&
                    !$("#control-ring li").eq(arr[counter]).hasClass('disabled-fixed') &&
                    isPlaying) {
                    $("#control-ring li").eq(arr[counter]).children('div').eq(0).removeClass('value-invisable').addClass('value-visable');
                    $("#control-ring li").eq(arr[counter]).addClass('running');
                    $("#control-ring li").eq(arr[counter]).prevAll().addClass('disabled');
                    $("#control-ring li").eq(arr[counter]).nextAll().addClass('disabled');
                }
            },
            success: function (data) {
                if (isPlaying) {
                    $("#control-ring li").eq(arr[counter]).children('div').eq(0).html(data);
                    $("#control-ring li").eq(arr[counter]).prevAll().removeClass('disabled');
                    $("#control-ring li").eq(arr[counter]).nextAll().removeClass('disabled');
                    $("#control-ring li").eq(arr[counter]).addClass('disabled-fixed').removeClass('running');
                    if (finish()) {
                        getResult();
                    }
                    getRandomNumber(arr, counter + 1);
                }
            }
        });
    }
}

function getAllRandomNumbers() {
    $('#control-ring li').each(function () {
        getRandomNumber($(this));
    });
}

function finish() {
    var flag = true;
    $('#control-ring li').each(function () {
        if (!$(this).hasClass('disabled-fixed')) {
            flag = false;
        }
    });
    if (flag) {
        $('#result').removeClass('disabled');
    }
    return flag;
}
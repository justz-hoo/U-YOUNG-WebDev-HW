var password = document.querySelector('#password');

var default_sign_tag = 0;

var helperText = {
    charLength: document.querySelector('#pwChar'),
    lowercase: document.querySelector('#pwLower'),
    uppercase: document.querySelector('#pwCap'),
    number: document.querySelector('#pwNum')
};

var pattern = {
    charLength: function () {
        if (password.value.length >= 7) {
            return true;
        }
    },
    lowercase: function () {
        var regex = /^(?=.*[a-z]).+$/;

        if (regex.test(password.value)) {
            return true;
        }
    },
    uppercase: function () {
        var regex = /^(?=.*[A-Z]).+$/;

        if (regex.test(password.value)) {
            return true;
        }
    },
    number: function () {
        var regex = /^(?=.*[0-9]).+$/;

        if (regex.test(password.value)) {
            return true;
        }
    }
};

// Listen for keyup action on password field
password.addEventListener('keyup', function () {
    // Check that password is a minimum of 8 characters
    patternTest(pattern.charLength(), helperText.charLength);

    // Check that password contains a lowercase letter
    patternTest(pattern.lowercase(), helperText.lowercase);

    // Check that password contains an uppercase letter
    patternTest(pattern.uppercase(), helperText.uppercase);

    // Check that password contains a number or special character
    patternTest(pattern.number(), helperText.number);

    // Check that all requirements are fulfilled
    if (hasClass(helperText.charLength, 'valid') &&
        hasClass(helperText.lowercase, 'valid') &&
        hasClass(helperText.uppercase, 'valid') &&
        hasClass(helperText.number, 'valid')
    ) {
        addClass(password.parentElement, 'valid');
        $('.pwCheck').addClass('pwValid');
        // alert('password valid');
    } else {
        removeClass(password.parentElement, 'valid');
        $('.pwCheck').removeClass('pwValid');
    }
});

function patternTest(pattern, response) {
    if (pattern) {
        addClass(response, 'valid');
    } else {
        removeClass(response, 'valid');
    }
}

function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function hasClass(el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    } else {
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
}

//Show and hide pw
$('#showPW').click(function () {
    if ($(this).hasClass('hide')) {
        $('#password').attr('type', 'text');
        $(this).removeClass('hide');
    } else {
        $('#password').attr('type', 'password');
        $(this).addClass('hide');
    }
});

$('#login').click(function (){
    // $('#click_type').innerHTML('Login')
    let test_name = 'Piggy';
    let test_password = 'PiggyWeb123';
    if (hasClass(password.parentElement, 'valid') &&
        $('#usr_name').val() !== ''){
        let username = document.querySelector('#usr_name').value;
        console.log('username: ', username);
        let password = document.querySelector('#password').value;
        console.log('password: ', password);
        let isHad = false;//定义一个开关变量
        let index = 0 ; //定义一个下标确定用户
        //遍历数组进行匹配
        for(let i = 0; i < user_array.length; i++){
            if(username === user_array[i].username){//有这个账号
                isHad=true;
                index=i;
                break;
            }
        }
        // console.log('当前密码：%s', password);
        // console.log('存储密码：%s', user_array[index].password);
        if (isHad){
            if(password === user_array[index].password){
                current_user.username = user_array[index].username;
                current_user.state = 1;  // 1表示处于正在登陆状态
                console.log(current_user);
                window.localStorage.curUsr = JSON.stringify(current_user);
                $('#prompt_content').html('登陆成功，即将为您转跳');
                setTimeout(function(){window.location.href = './index.html'},1000);
            }
            else {
                $('#prompt_content').html('密码错误，请重新输入密码');
            }
        }
        else{
            $('#prompt_content').html('用户不存在，请先注册，为您跳转到登陆界面');
            setTimeout(function(){window.location.href = './login.html'},2000);
        }
    }
    else if ($('#usr_name').val() === ''){
        $('#prompt_content').html('用户名不能位空');
    }
    else {
        $('#prompt_content').html('注册密码格式不规范，请重新输入密码');
    }
})

$('#signup').click(function (){
    $('#login').remove();
    $(this).parent().append('<div class="click_button" id="confirm_sign" onclick="confirm_sign(this)">确认注册</div>')
    $(this).remove();
    $('#prompt_content').html('这里是注册界面 :) 注: 点击 ' +
        '<span id="me" style="font-size: 20px; color: #ad7c35" onclick="generate_default_usr()">' +
        '我</span> 可以生成默认注册账号');
})

function generate_default_usr(){
    document.querySelector('#usr_name').value = 'Piggy';
    document.querySelector('#password').value = 'Piggy123';
    addClass(password.parentElement, 'valid');
    $('.pwCheck').addClass('pwValid');
    default_sign_tag = 1;
}

function confirm_sign(confirm_btn){
    if (hasClass(password.parentElement, 'valid') &&
        $('#usr_name').val() !== ''){

        $(confirm_btn).remove();
        // 注册用户和密码符合要求
        let username = document.querySelector('#usr_name').value;
        console.log('username: ', username);
        let password = document.querySelector('#password').value;
        console.log('password: ', password);

        for(let i = 0; i < user_array.length; i++){
            // 判断是否有相同账号
            if (username===user_array[i].username){
                if (password === user_array[i].password)
                {
                    $('#prompt_content').html('该账号已经存在，密码正确');
                    // setTimeout(function (){window.location.href = '../index.html';}, 2000);
                    setTimeout(function(){$('#prompt_content').html('是否登陆 ？' +
                        '<button class="yes_or_no" id="yes" onclick="sign_yes()">是</button>' +
                        '<button class="yes_or_no" id="no" onclick="sign_no()">否</button>');},1000);
                }
                else {
                    $('#prompt_content').html('该账号已经存在，密码错误，为您转到登陆界面');
                    setTimeout(function (){window.location.href = './login.html';}, 2000);
                }
                return;
            }
        }
        //创建对象
        let obj = {username:username,password:password,score:0}
        console.log(obj);
        user_array.push(obj);
        window.localStorage.userArr=JSON.stringify(user_array);
        $('#prompt_content').html('注册成功');

        setTimeout(function(){$('#prompt_content').html('是否登陆 ？' +
            '<button class="yes_or_no" id="yes" onclick="sign_yes()">是</button>' +
            '<button class="yes_or_no" id="no" onclick="sign_no()">否</button>');},1000);
    }
    else if ($('#usr_name').val() === ''){
        $('#prompt_content').html('用户名不能为空');
    }
    else {
        $('#prompt_content').html('注册密码格式不规范，请重新输入密码');
    }
}

function sign_yes(){
    current_user.username = user_array[user_array.length - 1].username;
    current_user.state = 1;  // 1表示处于正在登陆状态
    console.log('当前用户为：', current_user);
    window.localStorage.curUsr = JSON.stringify(current_user);
    $('#prompt_content').html('登陆成功，即将为您转跳');
    setTimeout(function (){window.location.href = './index.html';}, 1000);
}

function sign_no(){
    $('#prompt_content').html('取消登陆，您将以游客身份浏览');
    current_user.username = '';
    current_user.state = 0;
    console.log('当前用户不登录');
    window.localStorage.curUsr = JSON.stringify(current_user);
    setTimeout(function (){window.location.href = './index.html';}, 1500)
}


// user_array用于存储用户名和密码的localstorage
// var obj = {username:"a",password:"123",score:1000}
// console.log(obj.username);
// 先获取所有用户的对象//变成数组
if(window.localStorage.userArr){//判断是否存在
    var user_array = JSON.parse(window.localStorage.userArr);
}else{ //如果不存在
    user_array = [];//创建一个新数组
}

// window.localStorage.setItem('now_usr', '')
if(window.localStorage.curUsr){  // 存在
    var current_user = JSON.parse(window.localStorage.curUsr);
    // if (current_user.state === 1){
    //     $('#prompt_content').html('欢迎' + current_user.username + '来到游氧旅行，即将为您自动登录');
    //     setTimeout(function (){window.location.href='../index.html'}, 3000);
    // }
}
else { //不存在
    current_user = {};
    current_user.state = 0;
}
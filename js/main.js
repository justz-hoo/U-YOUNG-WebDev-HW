if(window.localStorage.curUsr){  // 存在
    var current_user = JSON.parse(window.localStorage.curUsr);
    if (current_user.state === 1){
       $('.sidebar li:nth-last-of-type(1)').children().html('Hi, ' + current_user.username);
    }
}

// 创建cookie
function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue; // 设置cookie用户名
    document.cookie = expires;  // 设置cookie时间
    // var tmp = cname+"="+cvalue+"; "+expires;
    // console.log(cname, cvalue, expires);  // username piggy expires=Thu, 05 Jan 2023 11:02:46 GMT
    // console.log(document.cookie);  // username=piggy
    // console.log(tmp);  // username piggy expires=Thu, 05 Jan 2023 11:02:46 GMT
}
function getCookie(cname){
    var name = cname + "=";  // cookie没有设置name='username=' ca=''
    // cookie有设置name='username=' ca='username=piggy; ...(时间)'
    var ca = document.cookie.split(';');
    // console.log(ca); // username=zyj
    // console.log('ca的长度为：%d', ca.length);
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        // console.log(c);
        if (c.indexOf(name)==0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
function checkCookie(){
    let user=getCookie("username");
    if (user!=""){
        // alert("欢迎 " + user + " 再次访问");
    }
    else {
        if(window.localStorage.curUsr){
            let current_user = JSON.parse(window.localStorage.curUsr);
            user = current_user.username;
            if (user!='' && user != null && current_user.state !== 0){
                setCookie("username",user,30);
            }
        }
        else {
            // alert('您现在以游客的身份浏览，请登陆');
            setTimeout(function (){window.location.href = 'login.html';}, 2000);
        }
    }
}
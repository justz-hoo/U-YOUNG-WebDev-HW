/*@TODO：
*   ------------------------增删亮点-----------------------*/
var main=document.querySelector(".add_new_light select");
var img=document.querySelector(".add_new_light .new_pic");
let img_str = '../images/highlight/1.jpg'
main.onchange=function(){
    img_str = this.value
    img.setAttribute("src",this.value);
}
function del_from_LS1(selected) {
    let str = $(selected).parent().parent().children('.title').html().trim();
    let num = '';
    for (let i = 2; i < str.length; i++){
        if (str[i] === '：'){
            break;
        }
        num += str[i];
    }

    for (let i = Number(num) - 1; i < hight_lights_array.length; i++) {
        hight_lights_array[i].num = i.toString();
    }
    hight_lights_array.splice(Number(num)-1, 1);  //删除元素
    window.localStorage.high_lightsArr = JSON.stringify(hight_lights_array);
    $(selected).parent().parent().parent().remove();
    window.location.reload();
    window.location.href = '#travel_highlight';
}
function add_new_light(){
    let name = $('.add_new_light input');
    let description = $('.add_new_light textarea');
    let details = $('.cards');
    let num_high = (hight_lights_array.length + 1).toString();
    details.append('<div class="highlight_card">\n' +
        '                <!--                文字-->\n' +
        '                <div class="words">\n' +
        '                    <!--                标题-->\n' +
                             '<div class="title">' +
                                '亮点' + num_high + '：'+ name.val() + '\n' +
                             '</div>\n' +
        '                    <!--                介绍-->\n' +
        '                    <div class="else">\n' +
        '                        <p>\n' + description.val() +
        '                        </p>\n' +
        '                    </div>\n' +
        '                    <div><button type="button" onclick="del_from_LS1(this)">删除</button></div>' +
        '                </div>\n' +
        '                <!--                图片-->\n' +
        '                <div class="pic" style="background-image: url('+ img_str +');"></div>\n' +
        '            </div>');
    let obj =  {num:num_high, title:name.val(), description:description.val(), img_url:img_str};
    add_to_LS1(obj, "high_lightsArr");
}
function add_to_LS1(obj, name) {
    hight_lights_array.push(obj);
    window.localStorage.high_lightsArr = JSON.stringify(hight_lights_array);
}
let text_des = document.querySelector('.add_new_light textarea')
text_des.value = '一半巴厘风情<br>一半加州气息<br>日月湾并不适合所有人<br>但是是嬉皮士和浪人的天堂'
// 根绝localstorage是否存在high_lights进行创建
if (window.localStorage.high_lightsArr) { //存在
    var hight_lights_array = JSON.parse(window.localStorage.high_lightsArr);
    render_highLights2();
}
else {  //不存在
    hight_lights_array = [];
    render_highLights1()
}
// 从jsonfile中读取渲染
function render_highLights1() {
    $.ajax({
        url: "../data/1.json",//json文件位置
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function(data) {//请求成功完成后要执行的方法
            //each循环 使用$.each方法遍历返回的数据date
            $.each(data.high_lights, function(i, item) {
                add_new_light2(item.num, item.title, item.description, item.img_url);

                // 创建localstorage对象
                let obj = {num:item.num, title:item.title, description:item.description, img_url:item.img_url};
                hight_lights_array.push(obj);
                window.localStorage.high_lightsArr = JSON.stringify(hight_lights_array);
            })

        }
    })
}
// 从LS中渲染
function render_highLights2() {
    for (let i = 0; i < hight_lights_array.length; i++) {
        let num = hight_lights_array[i].num;
        let title = hight_lights_array[i].title;
        let description = hight_lights_array[i].description;
        let img_url = hight_lights_array[i].img_url;
        add_new_light2(num, title, description, img_url);
    }
}
function add_new_light2(num, title, description, img_url){
    let details = $('.cards');
    details.append('<div class="highlight_card">\n' +
        '                <!--                文字-->\n' +
        '                <div class="words">\n' +
        '                    <!--                标题-->\n' +
        '                    <div class="title">\n' +
        '亮点' + num + '：'+ title + '\n' +
        '                    </div>\n' +
        '                    <!--                介绍-->\n' +
        '                    <div class="else">\n' +
        '                        <p>\n' + description +
        '                        </p>\n' +
        '                    </div>\n' +
        '                    <div><button type="button" onclick="del_from_LS1(this)">删除</button></div>' +
        '                </div>\n' +
        '                <!--                图片-->\n' +
        '                <div class="pic" style="background-image: url('+ img_url +');"></div>\n' +
        '            </div>');
}




/*@TODO:----------------------增删改查日期------------------------*/
if (window.localStorage.timeArr) { //存在
    var time_array = JSON.parse(window.localStorage.timeArr);
    render_time(time_array);
}
else { //不存在
    time_array = [];
    $.ajax({
        url: "./data/1.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data.time, function(i, item) {
                let obj = {start_date:item.start_date, end_date:item.end_date};
                time_array.push(obj);
            });
            window.localStorage.timeArr = JSON.stringify(time_array);
            render_time(time_array);
        }
    });
}
function render_time(my_array) {
    for (let i = 0; i < my_array.length; i++) {
        $('.timetable').append(
            '<div>' +
                '<div class="old">'+
                    '<span class="day1_old">'+ my_array[i].start_date + '</span>' +
                    '→' +
                    '<span class="day2_old">'+ my_array[i].end_date + '</span>' +
                '</div>' +
                '<button type="button" onclick="del_route(this)">删除</button>' +
                '<button type="button" onclick="show_edit(this)">编辑</button>' +
            '</div>'
        )
    }
}
function search_date(day1, day2){
    for (let i = 0; i < time_array.length; i++) {
        if (time_array[i].start_date === day1 && time_array[i].end_date === day2) {
            return i; //相同的位置idx
        }
    }
    return  -1; //不存在相同的
}
function del_route(selected){
    let start_date = $(selected).parent().children('.old').children('.day1_old').html();
    let end_date = $(selected).parent().children('.old').children('.day2_old').html();
    console.log(start_date, end_date);
    if (search_date(start_date, end_date) !== -1) {
        let idx = search_date(start_date, end_date);
        time_array.splice(idx, 1);
    }
    window.localStorage.timeArr = JSON.stringify(time_array);
    $(selected).parent().remove();
}
function show_edit(selected_date){
    $(selected_date).parent().append(
        '<input type="date" class="day1" value="2022-06-01">→<input type="date" class="day2" value="2022-06-06">' +
        '<button type="button" onclick="edit_date(this)">修改路线</button>'
    )
}
function edit_date(selected_bnt){
    let start_date_new = $(selected_bnt).parent().children(".day1").val();
    let end_date_new = $(selected_bnt).parent().children(".day2").val() ;
    let start_date = $(selected_bnt).parent().children(".old").children('.day1_old').html();
    let end_date = $(selected_bnt).parent().children(".old").children(".day2_old").html();
    if (search_date(start_date_new, end_date_new) !== -1) {
        alert('该日期已经存在');
        return;
    }
    if (search_date(start_date, end_date) !== -1) {
        let idx = search_date(start_date, end_date);
        time_array[idx].start_date = start_date_new;
        time_array[idx].end_date = end_date_new;
    }
    window.localStorage.timeArr = JSON.stringify(time_array);
    $(selected_bnt).parent().html(
        '<div class="old">'+
            '<span class="day1_old">'+ start_date_new +'</span>' +
            '→' +
            '<span class="day2_old">' + end_date_new + '</span>' +
        '</div>' +
        '<button type="button" onclick="del_route(this)">删除</button>' +
        '<button type="button" onclick="show_edit(this)">编辑</button>'
    );
}
function add_date(){
    let start_date = $('#start_date').val();
    let end_date = $('#end_date').val();
    let timetable = $('.timetable');
    if (search_date(start_date, end_date) !== -1) {
        alert('该日期已经存在');
        return;
    }
    timetable.append(
        '<div>' +
            start_date + '→' + end_date +
            '<button type="button" onclick="del_route(this)">删除</button>' +
            '<button type="button" onclick="show_edit(this)">编辑</button>' +
        '</div>'
    );
    let obj = {start_date:start_date, end_date:end_date};
    time_array.push(obj);
    window.localStorage.timeArr = JSON.stringify(time_array);
}



/*@TODO-------------------渲染、修改活动价格、费用包含-----------------------*/
if (window.localStorage.priceDict) { //存在，从localstorage里读数据并渲染
    var price_dict = JSON.parse(window.localStorage.priceDict);
    render_price(price_dict);
}
else { //不存在，从jsonfile中读文件并渲染
    price_dict = {};
    $.ajax({
        url: "../data/1.json",//json文件位置
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function(data) {//请求成功完成后要执行的方法
            //each循环 使用$.each方法遍历返回的数据date
            $.each(data.prices, function(i, item) {
                price_dict = {price:item.price, accommodation_days:item.accommodation_days,
                    tickets:item.tickets, cars:item.cars, leaders:item.leaders}
                // 创建localstorage对象
                window.localStorage.priceDict = JSON.stringify(price_dict);
                // 渲染
                render_price(price_dict);

            })
        }
    })
}
function render_price(my_price_dict) {
    if (my_price_dict.price && my_price_dict.accommodation_days
        && my_price_dict.tickets && my_price_dict.cars && my_price_dict.leaders) {
        $('.detail1 p').html(my_price_dict.price + '元起/除司机外四人一车');
        $('#acc_days').html('全程' + my_price_dict.accommodation_days + '晚住宿');
        $('#tickets_type').html(my_price_dict.tickets);
        for (let i = 0; i < my_price_dict.cars.length; i++) {
            $('#cars').after('<div class="cars_options">' + price_dict.cars[i] + '</div>');
        }
        for (let i = 0; i < my_price_dict.leaders.length; i++) {
            $('#leaders').after('<div class="leaders_options">' + price_dict.leaders[i] + '</div>');
        }
    }
}
function show_edit1(selected) {
    $(selected).parent().append(
        '<div>' +
            '<input type="number" value="66666">' +
            '<button type="button" onclick="edit1(this)">确认修改</button>' +
        '</div>'
    )
}
function edit1(selected) {
    let price = $(selected).parent().children('input').val();
    $(selected).parent().parent().children('p').html(
        price + '元起/除司机外四人一车');
    price_dict.price = price;
    window.localStorage.priceDict = JSON.stringify(price_dict);
    $(selected).parent().remove();
}
function edit2(selected){
    let num = $('.detail2 .line:nth-of-type(1) input');
    $(selected).parent().parent().children("div:nth-of-type(3)").html(
        '全程' + num.val() + '晚住宿'
    );
    price_dict.accommodation_days = num.val();
    window.localStorage.priceDict = JSON.stringify(price_dict);
    $(selected).parent().remove();
}
function show_edit2(selected){
    $(selected).parent().append(
        '<div>' +
        '<input type="number" value="13">' +
        '<button type="button" onclick="edit2(this)">确认修改</button>' +
        '</div>'
    )
}
function show_edit3(selected){
    $(selected).parent().append(
        '<div>' +
            '&nbsp<input type="radio" name="tickets" value="部分" id="part"><label for="part">部分景点门票</label>' +
            '&nbsp<input type="radio" name="tickets"  value="全部"  id="all" checked> <label for="all">全部景点门票</label>' +
            '<button type="button" onclick="edit3(this)">确认修改</button>' +
        '</div>'
    )
}
function edit3(selected) {
    let str = $('input[name="tickets"]:checked');
    $(selected).parent().parent().children("div:nth-of-type(3)").html(
        str.val() + '景点门票'
    );
    price_dict.tickets = str.val() + '景点门票';
    window.localStorage.priceDict = JSON.stringify(price_dict);
    $(selected).parent().remove();
}
function show_edit4(selected) {
    $(selected).parent().append(
        '<div>' +
            '&nbsp<input type="checkbox" name="cars" id="cars_option1" value="80万旅行保险"><label for="part">80万旅行保险</label>' +
            '&nbsp<input type="checkbox" name="cars" id="cars_options2" value="全程越野车油路费" checked> <label for="all">全程越野车油路费</label>' +
            '<button type="button" onclick="edit4(this)">确认修改</button>' +
        '</div>'
    );
}
function edit4(selected) {
    $(selected).parent().parent().children('.cars_options').remove();
    let options = $('input[name="cars"]');
    let cars = [];
    for (let i = 0; i < options.length; i++){
        if (options[i].checked) {
            cars.push(options[i].value);
            $('#cars').after('<div class="cars_options">' + options[i].value + '</div>');
        }
    }
    $(selected).parent().remove();
    price_dict.cars = cars;
    window.localStorage.priceDict = JSON.stringify(price_dict);
}
function show_edit5(selected) {
    $(selected).parent().append(
        '<div>' +
        '&nbsp<input type="checkbox" name="leaders" id="leaders_option1" value="司机劳务费"><label for="part">司机劳务费</label>' +
        '&nbsp<input type="checkbox" name="leaders" id="leaders_options2" value="领队摄影" checked> <label for="all">领队摄影</label>' +
        '<button type="button" onclick="edit5(this)">确认修改</button>' +
        '</div>'
    );
}
function edit5(selected) {
    $(selected).parent().parent().children('.leaders_options').remove();
    let options = $('input[name="leaders"]');
    let leaders = [];
    for (let i = 0; i < options.length; i++){
        if (options[i].checked) {
            leaders.push(options[i].value);
            $('#leaders').after('<div class="leaders_options">' + options[i].value + '</div>');
        }
    }
    $(selected).parent().remove();
    price_dict.leaders = leaders;
    window.localStorage.priceDict = JSON.stringify(price_dict);
}



/*@TODO----------------添加删除形成速览--------------------*/
if (window.localStorage.plansArr) {  //存在
    var plans_array = JSON.parse(window.localStorage.plansArr);
    render_plans2();
}
else { //不存在
    plans_array = [];
    render_plans1();
}
function add_glance(){
    let tbl = document.querySelector('.plan_cards table')
    let new_route = $('#glance1')
    let new_mileage = $('#glance2')
    let new_hour = $('#glance3')
    let new_accommodation = $('#glance4')
    let new_row = tbl.insertRow(plans_array.length + 1)
    new_row.innerHTML =
        '<td><p><h2>Day' + (plans_array.length + 1).toString() + '</h2></p></td>' +
        '<td><p>' + new_route.val() + '</p></td>' +
        '<td><p>里程：' + new_mileage.val() + '/' + new_hour.val() + 'h' + '</p></td>' +
        '<td><p>' + '住宿：' + new_accommodation.val() +'</p></td>';
    let num = (plans_array.length + 1).toString();
    let route = new_route.val()
    let miles = '里程' + new_mileage.val() + '/' + new_hour.val() + 'h';
    let accommodation = '住宿：' + new_accommodation.val();
    let obj = {num:num, route:route, miles:miles, accommodation:accommodation};
    plans_array.push(obj);
    window.localStorage.plansArr = JSON.stringify(plans_array);
}
function remove_glance(selected_row){
    if (plans_array.length >= 1){
        $(selected_row).parent().parent().parent().children('tr:nth-last-of-type(2)').remove()
        plans_array.splice(plans_array.length - 1 , 1);
        window.localStorage.plansArr = JSON.stringify(plans_array);
    }
    else if (plans_array.length < 1){
        alert('已经删除到底了');
    }
}
// 从jsonfile中渲染
function render_plans1() {
    $.ajax({
        url: "../data/1.json",//json文件位置
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function(data) {//请求成功完成后要执行的方法
            //each循环 使用$.each方法遍历返回的数据date
            $.each(data.plan_glance, function(i, item) {
                let obj = {num:item.num, route:item.route, miles:item.miles, accommodation:item.accommodation};
                // console.log(obj);
                add_glance2(obj);
                // 创建localstorage对象
                plans_array.push(obj);
                window.localStorage.plansArr = JSON.stringify(plans_array);
            })

        }
    })
}
function add_glance2(obj){
    let tbl = document.querySelector('.plan_cards table')
    let new_row = tbl.insertRow(tbl.rows.length - 1);
    new_row.innerHTML =
        '<td><p><h2>Day' + obj.num + '</h2></p></td>' +
        '<td><p>' + obj.route + '</p></td>' +
        '<td><p>' + obj.miles + '</p></td>' +
        '<td><p>' + obj.accommodation + '</p></td>';
}
// 从localstorage中渲染
function render_plans2() {
    for (let i = 0; i < plans_array.length; i++) {
        let num = plans_array[i].num;
        let route = plans_array[i].route;
        let miles = plans_array[i].miles;
        let accommodation = plans_array[i].accommodation;
        let obj = {num:num, route:route, miles:miles, accommodation:accommodation};
        add_glance2(obj);
    }
}




/*@TODO：-------------修改费用不含-------------*/
if (window.localStorage.excludedDict){
    var excluded_dict = JSON.parse(window.localStorage.excludedDict);
    render_excluded(excluded_dict);
}
else {
    excluded_dict = {};
    $.ajax({
        url: "./data/1.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $.each(data.excluded, function (i, item){
                // @TODO: 这里-----------------------------
                excluded_dict = {traffic:item.traffic, personal:item.personal, others:item.others};
                window.localStorage.excludedDict = JSON.stringify(excluded_dict);
                render_excluded(excluded_dict);
            })
        }
    })
}
function render_excluded(my_dict) {
    if(my_dict.traffic) {
        $('#e_traffic').html('往返' + my_dict.traffic + '的大交通费');
    }
    if (my_dict.personal) {
        $('#e_personal').html('个人消费，如' + my_dict.personal);
    }
    if (my_dict.others) {
        $('#e_others').html(my_dict.others);
    }
}
function show_edit6(selected) {
    $(selected).parent().append(
        '<div>' +
            '<input type="text" value="曼彻斯特、巴塞罗那">' +
            '<button type="button" onclick="edit6(this)">确认修改</button>' +
        '</div>'
    )
}
function edit6(selected) {
    let locs = $(selected).parent().children('input').val();
    $('#e_traffic').html('往返' + locs + '的大交通费');
    excluded_dict.traffic = locs;
    window.localStorage.excludedDict = JSON.stringify(excluded_dict);
    $(selected).parent().remove();
}
function show_edit7(selected) {
    $(selected).parent().append(
        '<div>' +
            '<input type="text" value="干饭、看球">' +
            '<button type="button" onclick="edit7(this)">确认修改</button>' +
        '</div>'
    )
}
function edit7(selected) {
    let pers = $(selected).parent().children('input').val();
    $('#e_personal').html('个人消费，如' + pers);
    excluded_dict.personal = pers;
    window.localStorage.excludedDict = JSON.stringify(excluded_dict);
    $(selected).parent().remove();
}
function show_edit8(selected) {
    $(selected).parent().append(
        '<div>' +
            '<input type="text" value="标间or双人床的差价">' +
            '<button type="button" onclick="edit8(this)">确认修改</button>' +
        '</div>'
    )
}
function edit8(selected) {
    let oh = $(selected).parent().children('input').val();
    $('#e_others').html(oh);
    excluded_dict.others = oh;
    window.localStorage.excludedDict = JSON.stringify(excluded_dict);
    $(selected).parent().remove();
}


/*@TODO:----------------------增删评论、喜欢------------------------*/
if (window.localStorage.likeArr) { //存在
    var like_array = JSON.parse(window.localStorage.likeArr);
    var like_num = like_array.like;
    var dislike_num = like_array.dislike;
    $('.number').html(like_array.like);
}
else { //不存在
    like_num = 0;
    dislike_num = 0;
    like_array = {like:like_num, dislike:dislike_num};
    window.localStorage.likeArr = JSON.stringify(like_array);
}
if (window.localStorage.commentsArr) { //存在
    var comments_array = JSON.parse(window.localStorage.commentsArr);
    render_comments(comments_array);
}
else { //不存在
    comments_array = [];
}
function render_comments(my_array) {
    for (let i = 0; i < my_array.length; i++) {
        $(".comments .contents").append(
            '<div>'+
                '<div style="line-height: 35px">'+ my_array[i].content+ '</div>'+
                '<div style="display: flex; flex-direction: row; align-items: center">'+
                    '<pre>' + my_array[i].user + '  ' + my_array[i].date + '</pre>' +
                    '<button class="del" onclick="del_comment(this, ' + i.toString() + ')">delete</button>'+
                '</div>' +
            '</div>'
        );
    }
}
$(document).ready(function (){
    let user = '游客';
    if (window.localStorage.curUsr) {
        let usr = JSON.parse(window.localStorage.curUsr);
        console.log(usr.state);
        if (usr.state === 1)
            user = usr.username;
    }
    let my_date = new Date();
    my_date = my_date.toLocaleDateString().toString();
    $("#post_comment").click(function (){
        if ($("#ccc").val()!== ""){
            $(".comments .contents").append(
                '<div>'+
                    '<div style="line-height: 35px">'+ $('#ccc').val()+ '</div>'+
                    '<div style="display: flex; flex-direction: row; align-items: center">'+
                        '<pre>' + user + '  ' + my_date+ '</pre>' +
                        '<button class="del" onclick="del_comment(this,' + comments_array.length.toString() + ')">delete</button>'+
                    '</div>' +
                '</div>'
            );
            let obj = {content:$('#ccc').val(), user:user, date:my_date};
            comments_array.push(obj);
            window.localStorage.commentsArr = JSON.stringify(comments_array);
            $("#ccc").val("");
        }
        document.querySelector('#ccc').value = '去旅行吧 ！'
    })
})
function del_comment(now_comment, index){
    $(now_comment).parent().parent().remove();
    comments_array.splice(index, 1);
    window.localStorage.commentsArr = JSON.stringify(comments_array);
}
function add_like(){
    like_num = like_num + 1;
    like_array.like = like_num;
    window.localStorage.likeArr = JSON.stringify(like_array);
    $('.number').html(like_num.toString());
}
function add_dislike() {
    dislike_num += 1;
    console.log('收到' + dislike_num + '次不喜欢');
    like_array.dislike = dislike_num;
    window.localStorage.likeArr = JSON.stringify(like_array);
}
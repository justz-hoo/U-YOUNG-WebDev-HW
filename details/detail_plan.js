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
    console.log(hight_lights_array);
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

function add_date(){
    let start_date = $('#start_date');
    let end_date = $('#end_date');
    let timetable = $('.timetable');
    timetable.append(
        '<div>' +
            start_date.val() + '→' + end_date.val() +
            '<button type="button" onclick="del_route(this)">删除</button>' +
            '<button type="button" onclick="show_edit(this)">编辑</button>' +
        '</div>'
    );
}


function del_route(selected_date){
    $(selected_date).parent().remove()
}

function edit_date(selected_bnt){
    let start_date_new = $(selected_bnt).parent().children(".day1")
    let end_date_new = $(selected_bnt).parent().children(".day2")
    $(selected_bnt).parent().html('       ' +
        '<div>\n' +
             start_date_new.val() + '→' + end_date_new.val() +
        '<button type="button" onclick="del_route(this)">删除</button>' +
        '<button type="button" onclick="show_edit(this)">编辑</button>' +
        '</div>')
    console.log(start_date_new)
}

function edit2(selected){
    let num = $('.detail2 .line:nth-of-type(1) input');
    $(selected).parent().parent().children("div:nth-of-type(3)").html(
        '全程' + num.val() + '晚住宿'
    );
    $(selected).parent().remove();
}

function show_edit(selected_date){
    $(selected_date).parent().append(
        '<input type="date" class="day1" value="2022-06-01">-<input type="date" class="day2" value="2022-06-06">' +
        '<button type="button" onclick="edit_date(this)">修改路线</button>'
    )
}

function show_edit2(selected){
    $(selected).parent().append(
        '<div>' +
        '<input type="number" value="6">' +
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
    console.log(str);
    $(selected).parent().remove();
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
                console.log(item);
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

if (window.localStorage.plansArr) {  //存在
    var plans_array = JSON.parse(window.localStorage.plansArr);
    render_plans2();
}
else { //不存在
    plans_array = [];
    render_plans1();
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

// 从jsonfile中渲染
function render_plans1() {
    $.ajax({
        url: "../data/1.json",//json文件位置
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function(data) {//请求成功完成后要执行的方法
            //each循环 使用$.each方法遍历返回的数据date
            $.each(data.plan_glance, function(i, item) {
                console.log(item.num);
                let obj = {num:item.num, route:item.route, miles:item.miles, accommodation:item.accommodation};
                console.log(obj);
                add_glance2(obj);
                // 创建localstorage对象
                plans_array.push(obj);
                window.localStorage.plansArr = JSON.stringify(plans_array);
            })

        }
    })
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

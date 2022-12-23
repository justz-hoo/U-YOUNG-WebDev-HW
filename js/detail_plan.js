var detail_num = location.search.slice(4);
var detail_id = "detail" + location.search.slice(4); // 获取当前详情页的id，并进行相应的渲染
var detail = $('.detail_list');
if (localStorage.hasOwnProperty(detail_id)){  //存在
    var detail_obj = JSON.parse(localStorage.getItem(detail_id));
    // 设置title标签
    $('title').html(detail_obj.title);
    render_all(detail_obj);
}
else {
    // 如果LocalStorage不存在，则从获取json中使用.ajax的GET方法读取数据
    $.ajax({
        url: "./data/detail.json",//json文件位置
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: getData //请求成功完成后要执行的方法
    })

}
function getData(data) {
    if (data[detail_id]) detail_obj = data[detail_id];  // 如果是JSONfile中存在的，直接读jsonfile
    else{  //JSONfile中不存在，则用第一个，之后动态增删改再修改内容，名称和背景从LS读取
        detail_obj = data["detail1"];
        let title =  JSON.parse(localStorage.getItem("detail_list"))[Number(detail_num)].name;
        console.log(title);
        let background_url = JSON.parse(localStorage.getItem("detail_list"))[Number(detail_num)].img_url;
        detail_obj.title = title;
        detail_obj.background_url = background_url;
    }
    // 设置title标签
    $('title').html(detail_obj.title);
    /**
     * LocalStorage中不存在，将JSON数据存在LS中
     */
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    render_all(detail_obj);
}
function render_all(objList) {
    var obj1 = _.pick(objList, ['title', 'background_url']);
    var obj2 = _.pick(objList, ['high_lights']);
    var obj3 = _.pick(objList, ['plan_glance']);
    var obj4 = _.pick(objList, ['prices', 'excluded']);
    var obj5 = _.pick(objList, ['time']);
    var obj6 = _.pick(objList, ['comments']);
    render("./tpl/title.ejs", $('#travel_name'), obj1, "is");
    render('./tpl/high_lights.ejs', $('#travel_highlight .cards'), obj2, "is");
    render('./tpl/travel_plans.ejs', $('#travel_plans .plan_cards'), obj3, "is");
    render('./tpl/prices.ejs', $('#travel_price .details'), obj4, "is");
    render('./tpl/travel_times.ejs', $('#travel_time .timetable'), obj5, "is");
    render('./tpl/comments.ejs', $('.travel_communicate'), obj6, "is");
}
function render(tpl_url, base, obj, type) {
    $.get(tpl_url, function (result){
        var html = ejs.compile(result)(obj);
        if (type === "append") base.append(html);
        else if (type === "prepend") base.prepend(html);
        else if (type === "is") base.html(html);
    })
}

var img_str = './images/highlight/1.jpg';
function select_pic(selected) {
    img_str = $(selected).val();
    $(".add_new_light .new_pic").attr("src", img_str);
}

function add_new_light(){
    let tmp = {
        num: detail_obj['high_lights'].length + 1,
        title: $('.add_new_light input').val(),
        description:$('.add_new_light textarea').val(),
        img_url: img_str
    };
    console.log(img_str);
    detail_obj['high_lights'].push(tmp);
    let tmp_obj = _.pick(detail_obj, ['high_lights']);
    render('./tpl/high_lights.ejs', $('#travel_highlight .cards'), tmp_obj, "is");
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
}

function del_new_light() {
    let num = detail_obj['high_lights'].length - 1;
    detail_obj['high_lights'].splice(num, 1);
    let tmp_obj = _.pick(detail_obj, ['high_lights']);
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    render('./tpl/high_lights.ejs', $('#travel_highlight .cards'), tmp_obj, "is");
}

function add_glance() {
    let tmp = {
        num: detail_obj['plan_glance'].length + 1,
        route: $('#glance1').val(),
        miles: $('#glance2').val() + 'km/' + $('#glance3').val() +'h',
        accommodation: $('#glance4').val()
    }
    detail_obj['plan_glance'].push(tmp);
    let tmp_obj = _.pick(detail_obj, ['plan_glance']);
    render('./tpl/travel_plans.ejs', $('#travel_plans .plan_cards'), tmp_obj, "is");
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
}

function remove_glance() {
    let num = detail_obj['plan_glance'].length - 1;
    detail_obj['plan_glance'].splice(num, 1);
    let tmp_obj = _.pick(detail_obj, ['plan_glance']);
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    render('./tpl/travel_plans.ejs', $('#travel_plans .plan_cards'), tmp_obj, "is");
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
    detail_obj['prices']['price'] = price;
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
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

function edit2(selected){
    let num = $('.detail2 .line:nth-of-type(1) input').val();
    $(selected).parent().parent().children("div:nth-of-type(3)").html(
        '全程' + num + '晚住宿'
    );
    detail_obj['prices']['accommodation_days'] = num;
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    $(selected).parent().remove();
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
    detail_obj['prices']['tickets'] = str.val() + '景点门票';
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    let tmp_obj = _.pick(detail_obj, ['prices', 'excluded']);
    render('./tpl/prices.ejs', $('#travel_price .details'), tmp_obj, "is");
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
    let options = $('input[name="cars"]');
    let cars = [];
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            cars.push(options[i].value);
        }
    }
    detail_obj['prices']['cars'] = cars;
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    let tmp_obj = _.pick(detail_obj, ['prices', 'excluded']);
    render('./tpl/prices.ejs', $('#travel_price .details'), tmp_obj, "is");
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
    let options = $('input[name="leaders"]');
    let leaders = [];
    for (let i = 0; i < options.length; i++){
        if (options[i].checked) {
            leaders.push(options[i].value);
        }
    }
    detail_obj['prices']['leaders'] = leaders;
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    let tmp_obj = _.pick(detail_obj, ['prices', 'excluded']);
    render('./tpl/prices.ejs', $('#travel_price .details'), tmp_obj, "is");
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
    detail_obj['excluded']['traffic'] = locs;
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    let tmp_obj = _.pick(detail_obj, ['prices', 'excluded']);
    render('./tpl/prices.ejs', $('#travel_price .details'), tmp_obj, "is");
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
    detail_obj['excluded']['personal'] = pers;
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    let tmp_obj = _.pick(detail_obj, ['prices', 'excluded']);
    render('./tpl/prices.ejs', $('#travel_price .details'), tmp_obj, "is");
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
    detail_obj['excluded']['others'] = oh;
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    let tmp_obj = _.pick(detail_obj, ['prices', 'excluded']);
    render('./tpl/prices.ejs', $('#travel_price .details'), tmp_obj, "is");
}

function search_date(day1, day2){
    let time_array = detail_obj['time'];
    for (let i = 0; i < time_array.length; i++) {
        if (time_array[i].start_date === day1 && time_array[i].end_date === day2) {
            return i;  //相同的位置idx
        }
    }
    return  -1;  //不存在相同的
}

function del_route(selected){
    let start_date = $(selected).parent().children('.old').children('.day1_old').html();
    let end_date = $(selected).parent().children('.old').children('.day2_old').html();
    if (search_date(start_date, end_date) !== -1) {
        let idx = search_date(start_date, end_date);
        detail_obj['time'].splice(idx, 1);
        localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    }
    let tmp_obj = _.pick(detail_obj, ['time']);
    render('./tpl/travel_times.ejs', $('#travel_time .timetable'), tmp_obj, "is");
}

function show_edit(selected){
    $(selected).parent().append(
        '<input type="date" class="day1" value="2022-06-01">→<input type="date" class="day2" value="2022-06-06">' +
        '<button type="button" onclick="edit_date(this)">修改路线</button>'
    )
}

function edit_date(selected_bnt) {
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
        detail_obj['time'][idx].start_date = start_date_new;
        detail_obj['time'][idx].end_date = end_date_new;
        localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    }
    let tmp_obj = _.pick(detail_obj, ['time']);
    render('./tpl/travel_times.ejs', $('#travel_time .timetable'), tmp_obj, "is");
}

function add_date() {
    let start_date = $('#start_date').val();
    let end_date = $('#end_date').val();
    if (search_date(start_date, end_date) !== -1) {
        alert('该日期已经存在');
        return;
    }
    let tmp = {start_date: start_date, end_date:end_date};
    detail_obj['time'].push(tmp);
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    let tmp_obj = _.pick(detail_obj, ['time']);
    render('./tpl/travel_times.ejs', $('#travel_time .timetable'), tmp_obj, "is");
}


function add_comment(selected) {
    let user = '游客';
    if (localStorage.curUsr) {
        let usr = JSON.parse(localStorage.curUsr);
        if (usr.state === 1)
            user = usr.username;
    }
    let my_date = new Date();
    my_date = my_date.toLocaleDateString().toString();
    let tmp = {content: $('#ccc').val(), user:user, date:my_date};
    detail_obj['comments']['comments_list'].push(tmp);
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    let tmp_obj = _.pick(detail_obj, ['comments']);
    render('./tpl/comments.ejs', $('.travel_communicate'), tmp_obj, "is");
}

function del_comment(selected, index) {
    detail_obj['comments']['comments_list'].splice(Number(index), 1);
    console.log(detail_obj['comments']['comments_list']);
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    let tmp_obj = _.pick(detail_obj, ['comments']);
    render('./tpl/comments.ejs', $('.travel_communicate'), tmp_obj, "is");
}
function add_like() {
    let like_num = Number(detail_obj['comments']['likes']);
    detail_obj['comments']['likes'] = (like_num + 1).toString();
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    let tmp_obj = _.pick(detail_obj, ['comments']);
    render('./tpl/comments.ejs', $('.travel_communicate'), tmp_obj, "is");
}

function add_dislike() {
    let dislike_num = Number(detail_obj['comments']['dislikes']);
    detail_obj['comments']['dislikes'] = (dislike_num + 1).toString();
    localStorage.setItem(detail_id, JSON.stringify(detail_obj));
    console.log('收到' + (dislike_num + 1).toString() + '次不喜欢');
}
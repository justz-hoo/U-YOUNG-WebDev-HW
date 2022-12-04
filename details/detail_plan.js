var main=document.querySelector(".add_new_light select");
var img=document.querySelector(".add_new_light .new_pic");
let img_str = '../images/highlight/1.jpg'
main.onchange=function(){
    img_str = this.value
    img.setAttribute("src",this.value);
}
let num_high = 3
function add_new_light(){
    let name = $('.add_new_light input');
    let description = $('.add_new_light textarea');
    let details = $('.cards');
    details.append('<div class="highlight_card">\n' +
        '                <!--                文字-->\n' +
        '                <div class="words">\n' +
        '                    <!--                标题-->\n' +
        '                    <div class="title">\n' +
        '                        亮点' + num_high + '：'+ name.val() + '\n' +
        '                    </div>\n' +
        '                    <!--                介绍-->\n' +
        '                    <div class="else">\n' +
        '                        <p>\n' + description.val() +
        '                        </p>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '                <!--                图片-->\n' +
        '                <div class="pic" style="background-image: url('+ img_str +');"></div>\n' +
        '            </div>');
    num_high += 1;
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

function show_edit(selected_date){
    $(selected_date).parent().append(
        '<input type="date" class="day1" value="2022-06-01">-<input type="date" class="day2" value="2022-06-06">' +
        '<button type="button" onclick="edit_date(this)">修改路线</button>'
    )
}

let num_days = 8
function add_glance(){
    let tbl = document.querySelector('.plan_cards table')
    let new_route = $('#glance1')
    let new_mileage = $('#glance2')
    let new_hour = $('#glance3')
    let new_accommodation = $('#glance4')
    console.log(new_route.val(), typeof(new_hour.val()), new_mileage.val())
    let new_row = tbl.insertRow(num_days)
    new_row.innerHTML =
        '<td><p><h2>Day' + num_days.toString() + '</h2></p></td>' +
        '<td><p>' + new_route.val() + '</p></td>' +
        '<td><p>里程：' + new_mileage.val() + '/' + new_hour.val() + 'h' + '</p></td>' +
        '<td><p>' + '住宿：' + new_accommodation.val() +'</p></td>';
    num_days += 1
}

function remove_glance(selecred_row){
    if (num_days > 1){
        $(selecred_row).parent().parent().parent().children('tr:nth-last-of-type(2)').remove()
        num_days -= 1
    }
    else if (num_days <= 1){
        alert('已经删除到底了')
    }
}

let text_des = document.querySelector('.add_new_light textarea')
text_des.value = '一半巴厘风情<br>一半加州气息<br>日月湾并不适合所有人<br>但是是嬉皮士和浪人的天堂'
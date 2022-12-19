<!--sidebar-->
<section id = "sidebar">
    <div class="sidebar">
        <nav>
            <ul>
                <li><a href="#travel_highlight">行程亮点</a></li>
                <li><a href="#travel_plans">计划速览</a></li>
                <li><a href="#travel_price">费用价格</a></li>
                <li><a href="#travel_time">报名时间</a></li>
                <li><a href="#travel_communicate">交流讨论</a></li>
            </ul>
        </nav>
    </div>
</section>
<!--行程名称-->
<section id="travel_name">
    <div class="travel_name" style="background-image: url(images/1.1.jpg);">
        <h1><%= title%></h1>
    </div>
</section>

<!--行程亮点-->
<section id="travel_highlight">
    <div class="travel_highlight">
        <h1>行程亮点</h1>
        <div class="cards">
        </div>
    </div>
    <div class="add_new_light">
        <div>
            <div>亮点名称</div>
            <input type="text" value="在日落时分看海">
        </div>
        <div>
            <div>亮点详情描述</div>
            <textarea> 一半巴厘风情<br>一半加州气息<br>日月湾并不适合所有人<br>但是是嬉皮士和浪人的天堂 </textarea>
        </div>
        <div>
            <p>选择亮点风景图</p>
            <select onchange="select_pic(this)">
                <option value="./images/highlight/1.jpg">图片1</option>
                <option value="./images/highlight/2.jpg">图片2</option>
                <option value="./images/highlight/3.jpg">图片3</option>
                <option value="./images/highlight/4.jpg">图片4</option>
                <option value="./images/highlight/5.jpg">图片5</option>
                <option value="./images/highlight/6.jpg">图片6</option>
                <option value="./images/highlight/7.jpg">图片7</option>
            </select>
            <img class="new_pic" src="images/highlight/1.jpg">
        </div>
        <button type="button" onclick="add_new_light()">添加新亮点</button>
    </div>
</section>

<section id="travel_plans">
    <div class="travel_plans">
        <h1>计划速览</h1>
        <div class="details">
            <div class="plan_cards">
                <table>
                    <tr>
                        <td><h2>天数</h2></td>
                        <td><p>路线</p></td>
                        <td><p>里程</p></td>
                        <td><p>住宿</p></td>
                    </tr>
                    <tr>
                        <td><button type="button" onclick="remove_glance(this)">删除</button></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <div class="add_glance">
        <h3>添加计划速览</h3>
        <div>
            <div>
                <label>路线: </label>
                <input type="text" id="glance1" value="**机场 集合">
            </div>
            <div>
                <label>里程: </label><input type="number" id="glance2" value="166">km<input type="number" id="glance3" value="2">h
            </div>
            <div>
                <label for="glance4">住宿: </label><input type="text" id="glance4" value="**酒店">
            </div>
            <button type="button" onclick="add_glance()">添加</button>
        </div>
    </div>
</section>

<section id="travel_price">
    <div class="travel_price">
        <h1>费用价格</h1>
        <div class="details">

            <div class="detail1">
                <h3>活动价格</h3>
                <div>
<!--                    在p添加价格说明-->
                    <p></p>
                    <button type="button" onclick="show_edit1(this)">编辑</button>
                </div>
            </div>

            <div class="detail2">
                <h3>费用包含</h3>
                <div>
                    <div class="line">
<!--                        图片-->
                        <div style="background-image: url(images/住宿.png);"></div>
                        <div>住宿</div>
                        <div id="acc_days">全程6晚住宿</div>
                        <button type="button" onclick="show_edit2(this)">编辑</button>
                    </div>
                    <div class="line">
                        <div style="background-image: url(images/门票.png);"></div>
                        <div>门票</div>
                        <div id="tickets_type">所列景点门票</div>
                        <button type="button" onclick="show_edit3(this)">编辑</button>
                    </div>
                    <div class="line">
                        <div style="background-image: url(images/汽车.png);"></div>
                        <div id="cars">用车</div>
<!--                        <div>全程越野车油路费</div>-->
<!--                        <div>80万旅行保险</div>-->
                        <button type="button" onclick="show_edit4(this)">编辑</button>
                    </div>
                    <div class="line">
                        <div style="background-image: url(images/申请导游-01.png);"></div>
                        <div id="leaders">领队</div>
<!--                        <div>领队摄影</div>-->
<!--                        <div>司机劳务费</div>-->
                        <button type="button" onclick="show_edit5(this)">编辑</button>
                    </div>
                </div>
            </div>

            <div class="detail3">
                <h3>费用不含</h3>
                <div>
                    <div class="line">
                        <!--                        图片-->
                        <div style="background-image: url(images/飞机.png);"></div>
                        <div>交通</div>
                        <div id="e_traffic"></div>
                        <button type="button" onclick="show_edit6(this)">编辑</button>
                    </div>
                    <div class="line">
                        <div style="background-image: url(images/个人.png);"></div>
                        <div>个人</div>
                        <div id="e_personal"></div>
                        <button type="button" onclick="show_edit7(this)">编辑</button>
                    </div>
                    <div class="line">
                        <div style="background-image: url(images/其他.png);"></div>
                        <div>其他</div>
                        <div id="e_others"></div>
                        <button type="button" onclick="show_edit8(this)">编辑</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<section id="travel_time">
    <div class="travel_time">
        <h1>报名时间</h1>
        <div class="timetable">
        </div>
    </div>
    <div class="add_date">
        <h3>添加报名时间</h3>
        <div>
            <input type="date" id="start_date" value="2022-12-25">-<input type="date" id="end_date" value="2022-12-28">
            <button type="button" onclick="add_date()">添加路线</button>
        </div>
    </div>
</section>

<section id="travel_communicate">
    <div class="travel_communicate">
        <h1>交流讨论</h1>
        <div>
            <div class="comments">
                <div class="likes">
                    本条旅行线路共收到<span class="number">0</span>次喜欢
                </div>
                <h2>评论区</h2>
                <div class="contents">
<!--                    在这里插入评论-->
                </div>
            </div>
            <div class="add_comment">
                <h3>我的短评</h3>
                <div>
                    <input type="text" id='ccc' value="去旅行吧 ！">
                    <button type="button" id='post_comment'>发布评论</button>
                </div>
                <div>
                    <button type="button" id='like' onclick=add_like()>喜欢</button>
                    <button type="button" id='dislike' onclick="add_dislike()">不喜欢</button>
                </div>
            </div>
        </div>
    </div>
</section>
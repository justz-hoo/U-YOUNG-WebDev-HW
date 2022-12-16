let num1 = 0
let highlight_table = document.querySelector(".highlight_tbl")
let num2 = 0
let plans_table = document.querySelector(".plans_tbl")
let num3 = 0
let time_table = document.querySelector(".time_tbl")
    function add1() {
        let new_tr = document.createElement("tr")
        num1 ++;
        let new_td1 = document.createElement("td")
        let td1_input = document.createElement("h3")
        td1_input.innerHTML = "亮点" + num1.toString()
        new_td1.appendChild(td1_input)
        let new_td2 = document.createElement("td")
        let td2_input = document.createElement("input")
        td2_input.setAttribute("type", "text")
        new_td2.appendChild(td2_input)
        let new_td3 = document.createElement("td")
        let td3_input = document.createElement("textarea")
        td3_input.setAttribute("cols", "30")
        td3_input.setAttribute("rows", "3")
        td3_input.setAttribute("name", "state")
        new_td3.appendChild(td3_input)
        let new_td4 = document.createElement("td")
        let td4_input = document.createElement("input")
        td4_input.setAttribute("type", "file")
        td4_input.setAttribute("src", "")
        new_td4.appendChild(td4_input)
        new_tr.appendChild(new_td1)
        new_tr.appendChild(new_td2)
        new_tr.appendChild(new_td3)
        new_tr.appendChild(new_td4)
        highlight_table.appendChild(new_tr)
    }

    function remove1() {
        if (highlight_table.rows.length !== 1) {
            let tr = highlight_table.lastChild
            tr.remove()
            num1--;
        }
    }

    function add2() {
        let new_tr = document.createElement("tr")
        num2 ++;
        let new_td1 = document.createElement("td")
        let td1_input = document.createElement("h3")
        td1_input.innerHTML = "Day" + num2.toString()
        new_td1.appendChild(td1_input)
        let new_td2 = document.createElement("td")
        let td2_input = document.createElement("input")
        td2_input.setAttribute("type", "text")
        new_td2.appendChild(td2_input)
        let new_td3 = document.createElement("td")
        let td3_input = document.createElement("input")
        td3_input.setAttribute("type", "number")
        let td3_input2 = document.createElement("span")
        td3_input2.innerHTML = "km"
        new_td3.appendChild(td3_input)
        new_td3.appendChild(td3_input2)
        let new_td4 = document.createElement("td")
        let td4_input = document.createElement("input")
        td4_input.setAttribute("type", "text")
        new_td4.appendChild(td4_input)
        new_tr.appendChild(new_td1)
        new_tr.appendChild(new_td2)
        new_tr.appendChild(new_td3)
        new_tr.appendChild(new_td4)
        plans_table.appendChild(new_tr)
    }
    function remove2() {
        if (plans_table.rows.length > 1) {
            let tr = plans_table.lastChild
            tr.remove()
            num2--;
        }
    }

    function add3(){
        let new_tr = document.createElement("tr")
        num3++
        let  new_td1 = document.createElement("td")
        let td1_input = document.createElement("input")
        td1_input.setAttribute("type", "date")
        new_td1.appendChild(td1_input)
        let new_td2 = document.createElement("td")
        let td2_input = document.createElement("input")
        td2_input.setAttribute("type", "date")
        new_td2.appendChild(td2_input)

        new_tr.appendChild(new_td1)
        new_tr.appendChild(new_td2)
        time_table.appendChild(new_tr)
    }

    function remove3(){
        if (time_table.rows.length > 1){
            let tr = time_table.lastChild
            tr.remove()
            num3--
        }
    }
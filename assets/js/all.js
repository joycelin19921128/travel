
// xhr 需解決cors問題 通常local端幾乎無法使用open data
//可以試試用開個server 或是把data 傳送至github

function getData(e) {
    var content = e.result.records;
    //console.log(content); 資料是放在result.records

    //要被觸發的選擇器
    var areaSelect = document.querySelector('.areaSelect'); //行政區選擇
    var hotArea = document.querySelector('.hotArea'); //熱門行政區
    var hotSpot = document.querySelector('.hotSpot'); //熱門景點

    //行政區選擇部分//

    //取資料跑迴圈
    var areaArray = [];
    for (var i = 0; i < content.length; i++) {
        areaArray.push(content[i].Zone);
    }
    areaArray[0] = '--請選擇行政區域--';
    //console.log(areaArray);
    var result = Array.from(new Set(areaArray));
    var areaSelect = document.querySelector('.areaSelect'); //行政區選擇

    //跑迴圈存取行政區  載入行政區選擇部分
    str = "";
    for (var i = 0; i < result.length; i++) {
        str += '<option>' + result[i] + '</option>';
    } //select html項目架構為option
    //console.log(str);  確認載入資料為行政區
    areaSelect.innerHTML = str; //show空值原因找不到class name->注意權重


    //景點顯示//
    //從選單點選//
    function selectClick(e) {
        var areaTitle = document.querySelector('.areaTitle');
        str = "";
        for (var i = 0; i < content.length; i++) {
            if (e.target.value == content[i].Zone) {

                str += '<div class="col-xs-12 col-sm-6 card-deck "><div class="card"><div class="pic"><img src="' +
                    content[i].Picture1 + '" alt="' + content[i].Name + '" class="img-responsive center-block"></div><div class="img-intro"><h3>' +
                    content[i].Name + '</h3><h4>' + content[i].Zone + '</h4></div><div class="caption"><p><time>' +
                    content[i].Opentime + '</time></p><p>' + content[i].Add +
                    '</p><p><span itemprop="telephone"><a href="tel:' + content[i].Tel + '">' + content[i].Tel +
                    '</a></span></p><p class="Ticke_tinfo">' + content[i].Ticketinfo + '</p></div></div></div>'

                areaTitle.textContent = content[i].Zone;
            }
        }
        console.log(str);
        hotSpot.innerHTML = str;

    }

    //從熱門行政區點選//
    //在這段遇到點選li str 卻跑不出來：debug 由上往下印出東西排除嫌疑
    function liClick(e) {
        e.preventDefault();
        var areaTitle = document.querySelector('.areaTitle');
        str = "";
        console.log(e.target.nodeName);
        if (e.target.nodeName !== 'A' ) {
            //1.console.log(e.target.nodeName)->可印出
            return;   
        }
        for (var i = 0; i < content.length; i++) {
            //2.console.log(content.length)->可印出
            
            if (e.target.textContent.trim() == content[i].Zone) {
                //3.console.log(content.length)->無法印出->問題可能在這
                // console.log('textContent: ' + e.target.textContent);
                // console.log('Zone: ' + content[i].Zone);
                //空白問題
                str += '<div class="col-xs-12 col-sm-6 card-deck "><div class="card"><div class="pic"><img src="' +
                    content[i].Picture1 + '" alt="' + content[i].Name + '" class="img-responsive center-block"></div><div class="img-intro"><h3>' +
                    content[i].Name + '</h3><h4>' + content[i].Zone + '</h4></div><div class="caption"><p><time>' +
                    content[i].Opentime + '</time></p><p>' + content[i].Add +
                    '</p><p><span itemprop="telephone"><a href="tel:' + content[i].Tel + '">' + content[i].Tel +
                    '</a></span></p><p class="Ticke_tinfo">' + content[i].Ticketinfo + '</p></div></div></div>'

                areaTitle.textContent = content[i].Zone;            
            }
        }
        hotSpot.innerHTML = str;      
    };




    areaSelect.addEventListener('change', selectClick, false)
    hotArea.addEventListener('click',liClick,false)
    // 選單change後觸發area功能
    // 熱門行政區被點擊後觸發area2功能
}
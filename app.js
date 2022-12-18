/*-----
Spanizer
- Wraps letters with spans, for css animations
-----*/
(function ($) {
    var s,
        spanizeLetters = {
            settings: {
                letters: $(".js-spanize"),
            },
            init: function () {
                s = this.settings;
                this.bindEvents();
            },
            bindEvents: function () {
                s.letters.html(function (i, el) {
                    //spanizeLetters.joinChars();
                    var spanizer = $.trim(el).split("");
                    return "<span>" + spanizer.join("</span><span>") + "</span>";
                });
            },
        };
    spanizeLetters.init();
})(jQuery);






// getting the quistion list from the json file

function getQs(){

  let myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function(){

    if(this.readyState === 4 && this.status === 200){

        let qsObject = JSON.parse(this.responseText);
        let qsCount = qsObject.length;
        
        
        console.log(qsObject , qsCount);
    }
    
  }

  myReq.open('GET' , "qs.json" , true);
  myReq.send();
}

getQs();



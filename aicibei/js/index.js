var key;
var osc = {};
var display = new Vue({
    el: "#display",
    data: {
        wordlist: {
            word: "sublime",
            chinese: "升华, 轻量型编辑器"
        },
        putKey: ''
    },
    methods: {},
    computed: {

    }
});


$(window).on("load", function () {
    TextCut($(".engli"));
})

function TextCut($) {
    var target = $;
    var targetTxt = target.contents();
    targetTxt.each(function () {
        var texts = targetTxt;
        if (this.nodeType == 3) {
            texts.replaceWith(texts.text().replace(/(\S)/g, '<span>$1</span>'));
            console.log("单词切割完成");
        }
    })
};

function keyprassJudge(word, key) {
    for (var i = 0; i < word.length; i++) {
        if ((word.eq(i).prop("sta") != 1) && (word.eq(i).prop("sta") != 2)) {
            var inputKey = word.eq(i).prop("textContent");
            if (key == inputKey) {
                $(".engli span").eq(i).css("color", "#CE6D39");
                $(".engli span").eq(i).prop("sta", 1);
                if (i == word.length - 1) {
                    $(".engli span").eq(i).prop("sta", 2);
                    $(".chin").eq(0).css("color", "#F17F42");
                    for(var i = 0; i < word.length; i++){
                        $(".engli span").eq(i).css("color", "#F2ECE4");
                    }
                    break;
                }
                else return 1;
            } else {
                $(".display_i").addClass("shake");
                setTimeout(function () {
                    $(".display_i").removeClass("shake");
                }, 150);
                console.log("cuowu");
                break;
            }
        } else {
            if(word.eq(i).prop("sta") == 2){
                if (key == "SPACE"){
                    $(".chin").eq(0).css("color", "#F2ECE4");
                    return 2;
                }
                else {
                    $(".display_i").addClass("shake");
                    setTimeout(function () {
                        $(".display_i").removeClass("shake");
                    }, 150);
                }
            }
            else {
                console.log("步过");
            }
        }
    }
    return 0;
}
$(window).keydown(function (event) {

    var code = (event.keyCode ? event.keyCode : event.which);
    if (osc[code])
        return;

    $("li[data-code='" + code + "']").addClass("active")
    var key = $("li[data-code='" + code + "']").data("key");
    var code = $("li[data-code='" + code + "']").data("code");
    console.log("按住:" + key);

    display.putKey = key;

    var word = $('.engli span');
    if ((keyprassJudge(word, key) == 2)) {
        $(".engli").children().remove();
        let index = Math.floor(Math.random() * wordList.length);
        $(".engli").text(wordList[index].word);
        display.wordlist.chinese = wordList[index].chinese;
        TextCut($(".engli"));
    }

});

$(window).keyup(function (event) {
    var code = (event.keyCode ? event.keyCode : event.which);
    $("li[data-code='" + code + "']").removeClass("active")
    var key = $("li[data-code='" + code + "']").data("key");
    var code = $("li[data-code='" + code + "']").data("code");
    if (!osc[code])
        return;
});

array(2) { 
	[0]=> array(2) 
	{ 
		["english"]=> string(10) "structures" ["chinese"]=> string(18) "基本数据结构" 
	} 
	[1]=> array(2) 
	{ ["english"]=> string(12) "dictionaries" ["chinese"]=> string(6) "字典" } 
}
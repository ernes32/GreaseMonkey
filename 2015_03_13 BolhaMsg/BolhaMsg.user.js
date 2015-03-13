// ==UserScript==
// @name           BolhaMsg
// @namespace      BolhaMsgNameSpace
// @description    BolhaMsg
// @include        http://www.bolha.com/*
// ==/UserScript==

var EkiEntered = false;	//a flag so that it is run only once
function EkiScript()	//function workaround for IE6/7
{	if (EkiEntered)	return;
	EkiEntered = true;
}

javascript:(function(){	
	
var txt= document.location.href

var removeType = "delete";

if ( txt.indexOf("/TRASH") > -1)
	removeType = "purge";

      var re1='.*?';	// Non-greedy match on filler
      var re2='(\\d+)';	// Integer Number 1

var p = new RegExp(re1+re2,["i"]);
var m = p.exec(txt);

      if (m != null)
      {
          var int1=m[1];
          //alert(int1.replace(/</,"&lt;"));        

			$.ajax({
        url: 	"https://moja.bolha.com/messaging/ajaxDeleteConversations",
        type: 'POST',
        data: { data : [int1], removetype : removeType},
        dataType: 'json',
				success: function(data){
					if(data.status == "OK"){						
						setTimeout("document.location.href = 'https:\/\/moja.bolha.com\/sporocila\/" + (removeType == "delete" ? "INBOX/sporocila" : "TRASH/all")+ "'", 2000);
					}
				},
				error: function(data){

				}
			});
      }	
})()

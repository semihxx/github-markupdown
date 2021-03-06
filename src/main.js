chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    //sayfa yüklendiğinde tab tetikleniyor. 
$.fn.selectRange = function(start, end) {
    // https://gist.github.com/beiyuu/2029907 adresinden alınmıştır.
    var e = document.getElementById($(this).attr('id')); // I don't know why... but $(this) don't want to work today :-/
    if (!e) return;
    else if (e.setSelectionRange) { e.focus(); e.setSelectionRange(start, end); } /* WebKit */ 
    else if (e.createTextRange) { var range = e.createTextRange(); range.collapse(true); range.moveEnd('character', end); range.moveStart('character', start); range.select(); } /* IE */
    else if (e.selectionStart) { e.selectionStart = start; e.selectionEnd = end; }
};

var dataa = '<div class="markupdown">' +
  '<div class="btn-group">' +
  '<button class="btn btn-sm" data-set="link" type="button"><span class="octicon octicon-link"></span></button>' +
  '<button class="btn btn-sm" data-set="bold" type="button"><b>b</b></button>' +
  '<button class="btn btn-sm" data-set="italic" type="button"><em>i</em></button>' +
  '<button class="btn btn-sm" data-set="ins" type="button"><del>del</del></button>' +
  '<button class="btn btn-sm" data-set="code" type="button"><span class="octicon octicon-code"></span></button>' +
  '<button class="btn btn-sm" data-set="quote" type="button"><span class="octicon octicon-quote"></span></button>' +
  '</div>' +
  '<div class="btn-group">' +
  '<button class="btn btn-sm" data-set="ul" type="button"><span class="octicon octicon-list-unordered"></span></button>' +
  '<button class="btn btn-sm" data-set="ol" type="button"><span class="octicon octicon-list-ordered"></span></button>' +
  '</div>' +
  '<div class="btn-group">' +
  '<button class="btn btn-sm" data-set="check" type="button">[ ]</button>' +
  '<button class="btn btn-sm" data-set="checked" type="button">[x]</button>' +
  '</div>' +
  '</div>';

$('.previewable-comment-form .write-content').prepend(dataa);
var txtComment = $("#new_commit_comment_field")[0] || $("#new_comment_field")[0];

$(".markupdown").on('click', '.btn', function(e) {
  
  var buttonName = $(this).data('set');

  if (typeof(txtComment.selectionStart) != "undefined") {

    var tagBegin = "";
    var tagEnd = "";
    
    var selection = txtComment.value.substr(txtComment.selectionStart, txtComment.selectionEnd - txtComment.selectionStart);
  
    switch (buttonName) {
      case 'link':
        var testt = prompt("Please enter your link", "");
        tagBegin = "[";
        tagEnd = "](" + testt + ")";
        break;
      case 'bold':
        
        var patt = new RegExp(/(^\*\*)|(\*\*$)/gm);
        selection = patt.test(selection) ? selection.replace(patt,""): selection.replace(/(^)|($)/gm,"**");
        
        break;
      case 'italic':
        
        var patt = new RegExp(/(^\*)|(\*$)/gm);
        selection = patt.test(selection) ? selection.replace(patt,""): selection.replace(/(^)|($)/gm,"*");
        
        break;
      case 'ins':
        tagBegin = "~~";
        tagEnd = tagBegin;
        break;
      case 'code':
        tagBegin = "`";
        tagEnd = tagBegin;
        break;
      case 'quote':
        tagBegin = "\n> ";
        tagEnd = "\n";
        break;
      case 'ul':
        var patt = new RegExp(/(^- )/gm);
        selection = patt.test(selection) ? selection.replace(patt,""): selection.replace(/(^)/gm,"- ");
        break;
      case 'ol':
        tagBegin = "\n1. ";
        break;
      case 'check':
        tagBegin = "\n- [ ] ";
        break;
      case 'checked':
        tagBegin = "\n- [x] ";
        break;
    }

    var begin = txtComment.value.substr(0, txtComment.selectionStart);
    var end = txtComment.value.substr(txtComment.selectionEnd);
  
    var range_start = txtComment.selectionStart; 
    var range_end = range_start + (tagBegin + selection + tagEnd).length ;

    txtComment.value = begin + tagBegin + selection + tagEnd + end;

    $(txtComment).selectRange(range_start, range_end); // alanı tekrar seçili hale getirmek için.

  }
});
});

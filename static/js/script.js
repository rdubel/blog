$(document).ready(function() {
    $.ajax({
        url: 'Http://silently.github.io/fake-api/posts/list.json',
        type: 'GET',
        dataType: 'json',
        success: function(objects, status) {
            objects.sort(function(a, b) {
                var dateA = new Date(a.created_at.split(" ")[0]);
                var dateB = new Date(b.created_at.split(" ")[0]);
                if (dateA.getTime() > dateB.getTime()) {
                    return -1;
                }
                if (dateA.getTime() < dateB.getTime()) {
                    return 1;
                }

                return 0;
            })
            for (var key in objects) {
                var article = objects[key];
                var cont = $("<div class='panel panel-success'></div>");
                var title = $("<h3 class='panel-title'></h3>").html(article.title).css({
                    'textTransform': 'capitalize'
                });
                var aunbr = $("<span></span>");
                var prgrph = $("<p></p>").html(article.abstract);
                var img = $("<img>").attr({
                    src: article.picture
                });
                var gdate = article.created_at.split(" ");
                var udate = "Posted on : " + new Date(gdate[0]).toDateString() + ".";
                var date = $("<span></span>").html(udate);
                var author = " By : "
                var nbrauth = 1;
                for (var i = 0; i < article.authors.length; i++) {
                        author += article.authors[i].name;
                        author += " (" + article.authors[i].company + ")";
                        if (i < article.authors.length -1) {
                            author += ", ";
                            nbrauth++
                        }
                }
                aunbr = "(" + nbrauth + " Author(s))";
                author += "."
                var autCont = $("<span></span>").html(author);
                var tag = "Tags : "
                for (var i = 0; i < article.tags.length; i++) {
                    tag += article.tags[i];
                    if (i < article.tags.length -1) {
                        tag += " | "
                    }
                }
                tag += "."
                var tags = $("<p></p>").html(tag)
                var info = $("<div class='panel-footer'></div>").append(date, autCont, tags);
                var post = $("<div class='panel-body'></div>").append(img, prgrph);
                var titleCont = $("<div class='panel-heading'></div>").append(title, aunbr);
                cont.append(titleCont, post, info);
                if (article.published) {
                    $(".published").append(cont);
                } else {
                    $(".unpublished").append(cont);
                }
            }
        }
    });


});

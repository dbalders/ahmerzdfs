//This is set to 2 since the posts already loaded should be page 1
var nextPage = 2;
//Set this to match the pagination used in your blog
var pagination = 4;

var postInfo = '';

$('.load-more').click(function() {
	postInfo = '';

    $.ajax({
        //go grab the pagination number of posts on the next page and include the tags
        url: ghost.url.api("posts") + '&include=tags&filter=tag:past-lineups&limit=' + pagination + '&page=' + nextPage,
        type: 'get'
    }).done(function(data) {
        postInfo = '<div class="flex flex-wrap flex-one">'
        //for each post returned
        $.each(data.posts, function(i, post) {
            insertPost(post);
        });
    }).done(function(data) {
        postInfo += '</div>'
    	//Append the html to the content of the blog
	    $('.past-lineups-container').append(postInfo);

	    //Incriment to next page if you haven't hit the end
	    if (nextPage == data.meta.pagination.pages) {
            $('.load-more').hide();
        } else {
        	nextPage += 1;
        }

        fluidBoxInit();
    }).fail(function(err) {
        console.log(err);
    });
});

function insertPost(postData) {
    //start the inserting of the html
    postInfo += '<div class="flex-vertical home-lineup-item flex-one">\
        <a class="lineup-img-container" href="' + postData.image + '">\
            <picture><img alt="Post Cover Image" class="home-lineup-img lineup-img" src="' + postData.image + '?w=250">\
        	<div class="home-button"></div></picture>\
        </a>\
        <div class="lineup-date">\
            <span>' + moment(postData.published_at).format('MMMM Do') + ' - </span>'

    for (var i = 0; i < postData.tags.length; i++) {
    	if (postData.tags[i].name === 'cashed') {
    		postInfo += '<span class="lineup-cashed">';
    		break;
    	} else if (postData.tags[i].name === 'busted') {
    		postInfo += '<span class="lineup-busted">';
    		break;
    	}else {
	        postInfo += '<span>';
	    }
    }

    postInfo += postData.title + '</span></div></div>'
}

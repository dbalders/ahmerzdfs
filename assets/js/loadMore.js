//This is set to 2 since the posts already loaded should be page 1
var nextPage = 2;
//Set this to match the pagination used in your blog
var pagination = 4;

var postInfo = '';

$('.load-more').click(function() {
    $.ajax({
        //go grab the pagination number of posts on the next page and include the tags
        url: ghost.url.api("posts") + '&include=tags&filter=tag:past-lineups&limit=' + pagination + '&page=' + nextPage,
        type: 'get'
    }).done(function(data) {
    	postInfo = '<div class="flex">'
        //for each post returned
        $.each(data.posts, function(i, post) {
            insertPost(post);
        });
    }).done(function(data) {
    	postInfo += '</div>'
    	//Append the html to the content of the blog
	    $('.past-lineups-container').append(postInfo);
	    //incriment next page so it will get the next page of posts if hit again.
	    nextPage += 1;
	    
        //If you are on the last post, hide the load more button
        if (nextPage == data.meta.pagination.total) {
            $('.load-more').hide();
        }
    }).fail(function(err) {
        console.log(err);
    });
});

function insertPost(postData) {
    //start the inserting of the html
    postInfo += '<div class="flex-vertical home-lineup-item flex-one">\
        <a class="lineup-img-container" href="' + postData.iamge + '">\
            <img alt="Post Cover Image" class="home-lineup-img lineup-img" src="' + postData.image + '?w=200">\
        	<div class="home-button"></div>\
        </a>\
        <div class="lineup-date">\
            <span>' + moment(postData.published_at).format('MMMM Do') + ' - </span>'

    if (postData.tags.indexOf("cashed") > 1) {
        postInfo += '<span class="lineup-cashed">';
    } else if (postData.tags.indexOf("busted") > 1) {
        postInfo += '<span class="lineup-busted">';
    } else {
        postInfo += '<span>';
    }

    postInfo += postData.title + '</span></div></div>'
}

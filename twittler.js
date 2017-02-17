/**
 * Created by Trykezo on 1/25/17.
 */
$(document).ready(function() {

  var $feed = $('.feed');
  // must clear the feed before showing tweets (otherwise reloading Tweets will copy and paste previous feeds)
  $feed.text('');
  var reloadTweets = setInterval(showTweets, 1000);

  // this shows new tweets (which are automatically uploaded via data_generator's scheduleNextTweet function
  showTweets();

  function showTweets(streamType) {
    // clear the feed
    $('.feed').text('');
    var index;
    var tweet;
    if (arguments.length === 0) {
      index = streams.home.length - 1
    } else {
      index = streamType.length - 1;
    }

    while (index >= 0) {
      if (arguments.length === 0) {
        tweet = streams.home[index]
      } else {
        tweet = streamType[index];
      }
      // divide the tweets into three parts in order to do better CSS
      var $username = $('<a href="#" class="username"></a>');
      var $tweet = $('<span class="tweet"></span></br>');
      var $date = $('</br><span class="date"></span></br>');

      $tweet.text(': ' + tweet.message);
      $tweet.appendTo($feed);

      $username.text('@' + tweet.user);
      // this is added for the clickUser function
      $username.attr('data-user', tweet.user);
      $username.prependTo($tweet);

      // use the moment library to create a variable that signifies the time since the tweet was created at
      var momentTime = moment(tweet.created_at).fromNow();
      $date.text(momentTime);
      $date.appendTo($tweet);
      index -= 1;
    }

    // if this is placed outside the function, it doesn't work because of
    // $('.feed').text('');
    $('.username').on('click', function clickUser(event) {
      event.preventDefault();

      // we find the specific user, which is on the attribute of the 'username' class
      var specificUser = $(this).data('user');
      // e.g. specificUser = shawndrost =>
      // index = streams.users.shawndrost.length - 1, tweet = streams.users.shawndrost[index]
      showTweets(streams.users[specificUser]);

      // show and enable button
      var $button = $('nav').find('button');

      $button.prop('disabled', false);
      $button.css('opacity', "1");

      // stops the tweets from reloading
      clearInterval(reloadTweets);
    });

  }

  $('.tweet-form').submit(function(event){
    debugger;
    event.preventDefault();
    var $tweetBox = $(this).find('#tweet-text');
    writeTweet($tweetBox.val(), 'alexanderzou');
    showTweets();
    $tweetBox.val('');
  });

  var $button = $('nav').find('button');

  $button.on('click', function clickButton(event) {
    showTweets();
    // hide and disable the button
    $button.prop('disabled', true);
    $button.css('opacity', "0");
    // reset the tweets by reloading the setInterval
    reloadTweets = setInterval(showTweets, 1000);
  });

});
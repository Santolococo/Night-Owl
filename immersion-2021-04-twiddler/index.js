$(document).ready(() => {
  const $body = $('body');
  $body.html('');

  //make a header that shows the name of the website that doubles as a button to return to the home page.
  const $header1 = $('<header><h1>Night Owl</h1></header>');
 
  $header1.appendTo($body)

  $('h1').click(function(){
    location.reload();
  });

  //main
  //makes a main section and adds it to the body
  const $main = $('<main class ="main"></main');
  $main.appendTo($body);

  //add another header that will show the page we are currently on
  //we will leave it blank and fill in the name based on the page we are on currently.
  const $homePage = $('<h2>Home</h2>');
  $homePage.appendTo($main);

  //make a sidebar for functionality.
  const $sideBar = $('<div id="sidebar" class="sidebar">');
  $sideBar.prependTo($main)

  //add a button to add the new hoots.
  const $loadHootsButton = $('<button></button>');
  $loadHootsButton.appendTo($main);
  

  //make a section inside of main that holds all the hoots
  const $hoots = $('<ul id ="hoots"></ul>');
  $hoots.appendTo($main);

  //
  const $newHoot = $(`<form id="new-hoot"></form>`);

  const $guestName = $(`<div><label for="guest-name">Username:</label>\n<input type="text" id="guest-name"></div>`)

  const $guestHoot =  $('<div><label for="guest-hoot">Hoot Hoot:</label>\n<input type="text" id="guest-hoot"></div>');
//makes a submition section to input new tweets
  const $submitHoot = $('<div><input type="submit"></div>');

  $newHoot.append($guestName, $guestHoot, $submitHoot);
  $newHoot.appendTo($sideBar);  

  //function that is given that generates hoots.
  const $hootGenerator = streams.home.map((hoot) => {
    const $hoot = $('<li id ="hoot"><div id ="hoot" class="hoot"></div></li>');
    const text = `@${hoot.user}: ${hoot.message}...${moment(hoot.created_at).fromNow()}<br/>${moment(hoot.created_at).format('MMM DD, YYY, h:mm:ss a')}`;
    $hoot.click(function(){
      clickHoots(hoot.user);
    })
    $hoot.html(text);
    $hoot.attr("class", hoot.user);

    return $hoot;
  });
  $hoots.append($hootGenerator)
   //loadhoots

   //make the hoots show up 
   $('#new-hoot').submit(function(event){
     //not quite sure what this does but i found it online.
     event.preventDefault();
     const newUser = $('#guest-name').val();
     const userHoot = $('#guest-hoot').val();
     const $hoot = $('<li id="hoot"><div id ="hoot" class ="hoot"></div></li>');
     if(streams.users.hasOwnProperty(newUser)){
       streams.users[newUser].push({user: newUser, message: userHoot, created_at: new Date()});
       streams.home.push({user: newUser, message: userHoot, created_at: new Date()});
     }
     else{
       streams.users[newUser] = [{user: newUser, message: userHoot, created_at: new Date()}];
       streams.home.push({user: newUser, message: userHoot, created_at: new Date()});
     }
     const text = `@${newUser}: ${userHoot}...${moment(newUser.created_at).fromNow()} <br/>${moment(newUser.created_at).format('MMM DD, YYY, h:mm:ss a')}`;
     $hoot.click(function(){
       clickHoots(newUser);
     })
     $hoot.html(text);
     $hoot.attr("class", newUser.user);
     $hoot.append('<br')
     $hoots.prepend($hoot);
     document.getElementById("newHoot").reset();
     return $hoot;
   });

   const feed = window.setInterval(function(){
     const $hoot = $('<li id ="hoot"> <div id ="hoot" class ="hoot"></div>');
     const text = `@${streams.home[streams.home.length -1].user}: ${streams.home[streams.home.length -1].message}...${moment(streams.home[streams.home.length -1]. created_at).fromNow()} <br/>${moment(streams.home[streams.home.length -1].created_at).format('MMM DD, YYY, h:mm:ss a')}`;
     $hoot.attr("class", streams.home[streams.home.length -1].user);

     const mostRecent = streams.home[streams.home.length -1].user;
     $hoot.click(function(){
       clickHoots(mostRecent);
     });
     $hoot.html(text);
     $hoot.append('<br>');
     $hoots.prepend($hoot);

   }, (Math.random() *10000) + 7500);

   $loadHootsButton.onclick = function() {
     location.reload(true);
   }

   window.setInterval(function(){
     $('ul#hoots li:gt(25)').remove();
   })



const clickHoots = function(user){
  $('ul#hoots').filter(function(){
    $homePage.text(`${user}'s Page`);
    $loadHootsButton.innerHTML = 'Night Owl';
    $main.prepend($loadHootsButton);
    $('li#hoot').remove();
    return streams.users[user].map(function(hoot){
      const $hoot = $('<li id ="hoot"><div id ="hoot" class ="hoot"></div></li>');
      const text = `@${hoot.user}: ${hoot.message}...${moment(hoot.created_at).fromNow()}<br/>${moment(hoot.created_at).format('MMM DD, YYY, h:mm:ss a')} `;
      $hoot.click(function(){
        clickHoots(hoot.user);
      });
      $hoot.html(text);
      $hoot.attr("class", hoot.user);
      $hoot.append(`<br>`);
      $hoots.prepend($hoot);
      stopStream();
    })
  })
}
 
function stopStream(){
  clearInterval(feed);
}

//closing bracket for document.ready
});





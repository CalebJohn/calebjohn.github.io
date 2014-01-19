started = false;
childRun = false;

function parent()
  {
    alert("Alert:\n\nUploading Virus.png to host webservers\n\n\nPlease Confirm Upload:");
    alert("\n\n\nUpload Successful\n\n");
    
    started = true;
  }

function child()
  {
    phrases = ['Hello! My name is Popup but you can call me junior..', '..You may have met my father already..', '..I\'m sorry if he was a little rude, ever since he started drinking..', '..Nevemind, I\'ll make sure he doesn\'t bug you anymore'];
    for (i in phrases)
    {
      alert(phrases[i]);
    }
    
    childRun = true;
  }

function popup()
  {
    if (childRun)
    {
      console.log(document.URL.substr(-10));
      // Must navigate to the index page first
      if (document.URL.substr(-10) == "index.html")
      {
        window.location.replace("Riddler/riddler.html");
      }
    }
    else if (started)
    {
      child();
    }
    else
    {
      parent();
    }
  }
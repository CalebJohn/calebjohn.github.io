started = false;

function parent()
{
  alert("Alert:\n\nUploading Virus.png to host webservers\n\n\nPlease Confirm Upload:");
  alert("\n\n\nUpload Successful\n\n");
  
  started = true;
}

function popup()
{
  if (started)
  {
    console.log(document.URL.substr(-10));
    // Must navigate to the index page first
    if (document.URL.substr(-10) == "index.html")
    {
      window.location.replace("Riddler/riddler.html");
    }
  }
  else
  {
    parent();
  }
}
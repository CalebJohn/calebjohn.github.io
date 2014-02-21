started = false;

function virus()
{
  alert("Alert:\n\nUploading Virus.png to host webservers\n\n\nPlease Confirm Upload:");
  
  // Taken from an external source
  //////////////////////////////////
  var downloadLink = document.createElement("a");
  downloadLink.download = "virus.png";
  var filenameBlob = new Blob(["http://www.calebjohn.ca/javascripts/virus.png"], {type:'text/plain'})
  if (window.webkitURL != null)
  {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      downloadLink.href = window.webkitURL.createObjectURL(filenameBlob);
  }
  else
  {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(filenameBlob);
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
  }
  downloadLink.click();
  //////////////////////////////////
  
  alert("\n\n\nUpload Successful\n\n");
  
  started = true;
}

function popup()
{
  if (started)
  {
    // Must navigate to the index page first
    // index will not show if it is the first accessed page
    if (document.URL.substr(-10) == "index.html")
    {
      window.location.replace("Riddler/riddler.html");
    }
  }
  else
  {
    virus();
  }
}
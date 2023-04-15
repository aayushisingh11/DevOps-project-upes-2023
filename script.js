function shortenUrl() {
    var urlInput = document.getElementById("url");
    var resultDiv = document.getElementById("result");
  
    if (urlInput.checkValidity()) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          resultDiv.innerHTML = "<a href='" + this.responseText + "' target='_blank'>" + this.responseText + "</a>";
        }
      };
      xhr.open("POST", "shorten.php", true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhr.send("url=" + encodeURIComponent(urlInput.value));
    } else {
      resultDiv.innerHTML = "Please enter a valid URL.";
    }
  }
  
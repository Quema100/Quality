function hideMessage() {
    var errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }

setTimeout(hideMessage, 5000);
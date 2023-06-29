function hideMessage() {
    var errorMessage = document.getElementById('errorMessage');
    var successMessage = document.getElementById('successMessage');
    if (errorMessage) {
            errorMessage.style.display = 'none';
        }else if (successMessage){
            errorMessage.style.display = 'none';
        }
    }

setTimeout(hideMessage, 5000);
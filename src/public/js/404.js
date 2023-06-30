const error = () => {
  let error = document.getElementById("error");
  let img = document.getElementById("image");
  let Not = document.getElementById("Not");
  // 마우스가 요소 위에 올라갈 때 이미지 보이기
  error.addEventListener('mouseover', () => {
    img.style.display = "block";
    error.style.display = "none";  
    Not.style.display = "none";
  });

  // 마우스가 요소에서 벗어날 때 이미지 감추기
  error.addEventListener('mouseout', () => {
      img.style.display = "none";
      Not.style.display = "block"
      error.style.display = "block";  
  });
}

window.onload = error;
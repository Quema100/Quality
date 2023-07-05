let load = ()=>{
    const githublink = document.getElementById('githublink')
    githublink.addEventListener('click', (event) => {
        event.preventDefault();
        api.openExternalLink('https://github.com/Quema100/Quality.git');
      });
}
window.onload = load
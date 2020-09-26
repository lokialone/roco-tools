const {ipcRenderer} = require('electron')
const {clipboard} = require('electron')
function onClick(text) {
    clipboard.write(text);
}
function render(data) {
    let template = data.map((text, index) => {
        return `<div id=text-${index}>${text}</div>`
    }).join('\n')
    return template; 
}
let clipboardContainer = document.getElementById('clipboard')
ipcRenderer.on('render', (event,val) => {
    clipboardContainer.innerHTML = render(val)
})

clipboardContainer.addEventListener('click', (event) => {

})

const {ipcRenderer} = require('electron')
const {clipboard} = require('electron')
let clipInfo = [];
function render(data) {
    let template = data.map((text, index) => {
        return `<div style="cursor:pointer;border:1px solid lightblue;" id=text-${index}>${text}</div>`
    }).join('\n')
    return template 
}
let clipboardContainer = document.getElementById('clipboard')
ipcRenderer.on('render', (event,val) => {
    clipInfo = val
    clipboardContainer.innerHTML = render(val)
})

clipboardContainer.addEventListener('click', (event) => {
    let val = event.target.innerText
    console.log(val)
    clipboard.writeText(val)
})

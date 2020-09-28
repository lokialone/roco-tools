const {clipboard, ipcRenderer} = require('electron')
const Mousetrap = require('mousetrap');
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

Mousetrap.bind('command+1', function() { 
    clipboard.writeText(clipInfo[0]|| '')
    console.log('command 1');
});
Mousetrap.bind('command+2', function() { 
    clipboard.writeText(clipInfo[1] || '')
    console.log('command 2'); 
});
Mousetrap.bind('command+3', function() { 
    clipboard.writeText(clipInfo[2] || '')
    console.log('command 3'); 
});
clipboardContainer.addEventListener('click', (event) => {
    let val = event.target.innerText
    console.log(val)
    clipboard.writeText(val)
})

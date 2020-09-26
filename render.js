function render(data) {
    let template = data.map((text) => {
        `<div>${text}</div>`
    }).join('\n')
    return template; 
}

module.exports = render;
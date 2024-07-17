function splitTextIntoSpans(target) {
    let elements = document.querySelectorAll(target)
    elements.forEach((element) => {
        element.classList.add('split-text')
        let text = element.innerText
        let splitText = text
            .split(" ")
            .map(function (word) {
                let char = word.split('').map(char => {
                    return `<p class="split-char">${char}</p>`
                }).join('')
                return `<p class="split-word">${char}&nbsp</p>`
            }).join('')

        element.innerHTML = splitText
    })
}

splitTextIntoSpans('.bubble-text')
class AniomaliaSpecimen {
    constructor() {

        const specimenData = {
            "title": [
                "Title number 1",
                "Another title here",
                "Here another one"
            ]
        }

        document.addEventListener('DOMContentLoaded', () => {

            function randomFromRange(min, max) {
                min = Math.ceil(min)
                max = Math.floor(max)
                return Math.floor(Math.random() * (max - min + 1)) + min
            }

            // let promise = new Promise()

            function processPieces() {
                let pieces = document.querySelectorAll('piece')
                let piecesSrcs = []

                pieces.forEach(piece => {
                    let src = piece.getAttribute('src')
                    piecesSrcs.push(src);
                })
                Promise.all(piecesSrcs.map(url =>
                    fetch(url)
                        .then(response => response.text())
                        .then(template => {
                            console.log(template)
                            document.querySelectorAll(`piece[src="${url}"]`).forEach(piece => {
                                piece.innerHTML = template
                            })
                        })
                ))
                .then(data => {
                    processRepeats()
                    processDatas()
                })
            }
            function processRepeats() {
                let repeats = document.querySelectorAll('repeat')
                repeats.forEach(item => {
                    const template = item.innerHTML
                    let times = item.getAttribute('times')
                    if (times.includes('-')) {
                        let from = times.split('-')[0]
                        let to = times.split('-')[1]
                        times = randomFromRange(from, to)
                    }
                    item.innerHTML = template.repeat(times)
                })
            }
            function processDatas() {
                let datas = document.querySelectorAll('data')
                datas.forEach(instance => {
                    let type = instance.textContent
                    let random = Math.floor(Math.random() * specimenData[type].length)
                    instance.textContent = specimenData[type][random]
                })
            }
            processPieces();
        })
    }
}
new AniomaliaSpecimen()
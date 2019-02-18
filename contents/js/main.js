let goBtn = document.querySelector('.go-btn')
let textarea = document.querySelector('textarea')
let tableBox = document.querySelector('.table-box')

let tableHeader = []

if (localStorage.int) {
    textarea.value = localStorage.int
}

goBtn.addEventListener('click', function () {
    // cache data
    localStorage.int = textarea.value

    let projects = textarea.value.split(/\n{2,}/)
    let projectArr = []

    tableHeader = [
        '项目',
        '状态',
        '进度'
    ]

    projects.forEach((item, index) => {
        let arr = item.split(/\n/)
        let obj = {}

        arr.forEach(val => {
            if (/:|：/.test(val)) {
                val = val.trim()
                let _tem = val.trim().split(/:|：/)
                let _label = _tem[0].trim()
                let _val = _tem[1].trim()
                
                switch (_label) {
                    case '前端':
                        obj.f2e = [];

                        if (/,|，|\s/.test(_val)) {
                            _val.split(/,|，|\s/).forEach(name => {
                                if (!tableHeader.includes(name)) {
                                    tableHeader.push(name)
                                }
                                obj.f2e.push(name)
                            })
                        } else {
                            if (!tableHeader.includes(_val)) {
                                tableHeader.push(_val)
                            }
                            obj.f2e.push(_val)
                        }
                        break;
                    
                    case '项目进度':
                    case '进度':
                        obj['进度'] = _val;
                        break;
                    case '前端时间':
                        let _time = new Date(_val).getTime()
                        obj['状态'] = Date.now() > _time ? '<b style="color: red">异常</b>' : '正常'
                        break
                    case '项目名称':
                        console.log(_val)
                        obj['项目'] = `<b>${_val}</b>`
                }
            }
        })

        projectArr.push( obj )
    })

    let thead = generateThead()
    let tbody = generateTbody(projectArr)

    tableBox.innerHTML = `<table>${thead + tbody}</table>`
}, false)


function generateTbody (arr) {
    let html = ''

    arr.forEach(item => {
        html += '<tr>'
        tableHeader.forEach(name => {
            switch (name) {
                case '项目':
                case '进度':
                case '状态':
                    html += `<td>${item[name]}</td>`
                    break
                default:
                    html += `<td>${item.f2e.includes(name) ? '●' : ''}</td>`
            }
        })
        html += '</tr>'
    })

    return `<tbody>${html}</tbody>`
}

function generateThead () {
    let html = tableHeader.reduce((a, b) => {
        return `${a}</th><th>${b}`
    })

    return `<thead><tr><th>${html}</th></tr></thead>`
}
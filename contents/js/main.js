const goBtn = document.querySelector('#js-go-btn')
const copyBtn = document.getElementById('js-copy-btn')
let textarea = document.querySelector('textarea')
let tableBox = document.querySelector('.table-box')

if (localStorage.int) {
    textarea.value = localStorage.int
}

goBtn.addEventListener('click', function () {
    // cache data
    localStorage.int = textarea.value

    let projects = textarea.value.split(/\n{2,}/)
    let projectObj = {}
    let tableHeader = new Set(['项目名称', '状态', '项目进度'])

    projects.forEach(pro => {
        let lines = pro.split(/\r?\n/)
        let key = ''
        let obj = {}

        lines.forEach(line => {
            let [title, ...inner] = line.split(/:|：/)

            inner = inner.join(':').trim()
            title = title.trim()

            if (title === '项目名称') key = inner
            
            if(title) obj[title] = inner
        })

        if (!Reflect.has(projectObj, key)) {
            projectObj[key] = obj
        }
    })

    let getHeadforKey = getHead('前端', projectObj)
    // 合并表头
    tableHeader = new Set([...tableHeader, ...getHeadforKey])

    let theadHTML = generateThead( tableHeader )
    let tbodyHTML = generateTbody(projectObj, tableHeader)

    tableBox.innerHTML = `<table>${theadHTML + tbodyHTML}</table>`
}, false)

/**
 * 生成表格内容
 * @param {Object} projects 项目对象
 * @param {Set} heads 表头数组
 */
function generateTbody (projects, heads) {
    let html = ''

    Object.values(projects).forEach(pro => {
        if (!Object.keys(pro).length) return html += ''
        
        html += '<tr>'
        heads.forEach(key => {
            if (Reflect.has(pro, key)) {
                html += `<td>${pro[key]}</td>`
            } else {
                if (key === '状态') {
                    let endDate = new Date(pro['上线时间'])
                    let FEDDate = new Date(pro['前端时间'])

                    if (endDate >= FEDDate) {
                        html += '<td>正常</td>'
                    } else {
                        html += '<td>异常</td>'
                    }
                } 
                else if (key === '项目进度') {
                    let val = pro[key] || pro['进度']
                    html += `<td>${val}</td>`
                }
                else {
                    let isWork = pro['前端'].includes(key) ? '●':''
                    html += `<td>${isWork}</td>`
                }
            }
        })
        html += '</tr>'
    })

    return `<tbody>${html}</tbody>`
}

/**
 * 生成表头
 * @param {Array} arr 表头数据
 */
function generateThead (arr) {
    let html = [...arr].reduce((a, b) => {
        return `${a}</th><th>${b}`
    })

    return `<thead><tr><th>${html}</th></tr></thead>`
}

/**
 * 生成表头对象
 * @param {String} key 指定生成表头内容
 * @param {Object} obj 项目对象
 */
function getHead (key, obj) {
    let data = new Set()

    Object.values(obj).forEach(item => {
        if (Reflect.has(item, key)) {
            let inner = item[key]

            // 如果有空格 分隔成多个
            if (/\s+/.test(inner)) {
                let _arr = inner.split(/\s+/)

                _arr.forEach(val => data.add(val))
            } else {
                data.add(inner)
            }
        }
    })

    return data
}

// 复制生成的内容
copyBtn.addEventListener('click', function () {
    let str = tableBox.innerHTML

    function copyEvt (e) {
        e.clipboardData.setData('text/html', str)
        e.clipboardData.setData('text/plain', str)
        e.preventDefault()
    }
    
    document.addEventListener('copy', copyEvt)
    document.execCommand('copy')
    document.removeEventListener('copy', copyEvt)
}, false)
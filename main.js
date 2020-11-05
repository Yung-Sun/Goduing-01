const $siteList = $('.siteList')
const $addButton = $siteList.find('li#addButton')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: '#icon-bilibili', url: 'https://bilibili.com' },
    { logo: '#icon-google', url: 'https://google.com' },
]

//用于简化用户输入的网址，防止过长出现布局混乱
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //正则表达式，删除‘/’开头的内容
}

const render = () => {
    $siteList.find('li:not(#addButton)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class="logo">
                <svg class="icon">
                    <use xlink:href="${node.logo}"></use>
                </svg>
            </div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="deleteSite">
                <svg class="icon" >
                    <use xlink:href="#icon-delete"></use>
                </svg>
            </div>
        </div>
    </li>`).insertBefore($addButton)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.deleteSite', (e) => {
            console.log('删除了哟')
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })

}

//生成起始默认页面
render()


$addButton
    .on('click', () => {
        let url = window.prompt('要输入添加的网址哈~')
        let siteIcon = simplifyUrl(url).replace(/\..*/, '')//正则去除‘.’之后的内容,siteIcon用于表示收藏网址的域名，方便匹配logo
        let siteIconList = ['baidu', 'bilibili', 'google', 'acfun', 'taobao', 'github', 'qq', 'yuque']
        if (siteIconList.indexOf(siteIcon) !== -1) {
            siteIcon = '#icon-' + simplifyUrl(url).replace(/\..*/, '')
        } else {
            siteIcon = '#icon-web'
        }
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        console.log(url)
        console.log(siteIcon)
        hashMap.push({ logo: siteIcon, url: url })
        render()
    }
    )
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

// 监听键盘事件
$(document).on('keypress', (e) => {
    const { key } = e //这个写法等价于 key=e.key
    for (let i = 0; i < hashMap.length; i++) {
        if (simplifyUrl(hashMap[i].url).substr(0, 1) === key) {
            window.open(hashMap[i].url)
        }
    }
})
$('input').on('keypress', (e) => {
    e.stopPropagation()
})
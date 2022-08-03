/* eslint-disable func-names */
export function createComment() {
    let appid = 'cyvqozoQM'
    let conf = 'prod_b8a841ab812afc17cc095d4a5069d703'
    let width = window.innerWidth || document.documentElement.clientWidth
    if (width < 960) {
        let head = document.getElementsByTagName('head')[0] || document.head || document.documentElement
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.charset = 'utf-8'
        script.id = 'changyan_mobile_js'
        script.src = 'https://cy-cdn.kuaizhan.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf
        head.appendChild(script)

        // 代码
    } else {
        let loadJs = function (d, a) {
            let c = document.getElementsByTagName('head')[0] || document.head || document.documentElement
            let b = document.createElement('script')
            b.setAttribute('type', 'text/javascript')
            b.setAttribute('charset', 'UTF-8')
            b.setAttribute('src', d)
            if (typeof a === 'function') {
                if (window.attachEvent) {
                    b.onreadystatechange = function () {
                        let e = b.readyState
                        if (e === 'loaded' || e === 'complete') {
                            b.onreadystatechange = null
                            a()
                        }
                    }
                } else {
                    b.onload = a
                }
            }
            c.appendChild(b)
        }
        loadJs('https://cy-cdn.kuaizhan.com/upload/changyan.js',
            () => {
                window.changyan.api.config({
                    appid,
                    conf,
                })
            })
    }
}
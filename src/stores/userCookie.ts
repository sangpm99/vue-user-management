const setToken = (name: string, value: string, days: number) => {
    let expires: string = ''
    if (days) {
        const date: Date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

const setCookie = (name: string, value: Object, days: number) => {
    let expires: string = ''
    if (days) {
        const date: Date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (JSON.stringify(value) || '') + expires + '; path=/'
}

const getCookie = (name: string) => {
    name += '='
    const cookies = document.cookie.split(';')
    for (let i: number = 0; i < cookies.length; i++) {
        while (cookies[i].charAt(0) === ' ') {
            cookies[i] = cookies[i].substring(1)
        }

        if (cookies[i].indexOf(name) === 0) {
            return cookies[i].substring(name.length, cookies[i].length)
        }
    }
    return null
}

const delCookie = (name: string) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    window.location.href = '/authorize/signin'
}

export { setToken, setCookie, getCookie, delCookie }

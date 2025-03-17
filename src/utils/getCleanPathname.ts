import { routing } from '../i18n/routing'
const LOCALES = routing.locales as readonly string[]

const getCleanPathname = (pathname: string) => {
    const segments = pathname.split('/').filter(Boolean)
    if (LOCALES.includes(segments[0])) {
        segments.shift() // Remove language prefix
    }

    return '/' + segments.join('/')
}

export default getCleanPathname

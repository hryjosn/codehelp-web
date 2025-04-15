import { useRouter } from '~/i18n/routing'

export interface LoginHandler {
    data: { email: string; password: string }
    router: ReturnType<typeof useRouter>
}

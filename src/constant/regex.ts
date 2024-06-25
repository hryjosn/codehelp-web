export const rule = {
    email: /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    password: /^[A-Za-z0-9]{8,64}$/,
    emailVerifyCode: /^\d{6}$/,
    phone: /^(9\d{8}|09\d{8})$/,
}

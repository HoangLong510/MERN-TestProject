const regex = {
    name: {
        rx: /^(?! )[a-zA-Z\s\u{0080}-\u{FFFF}]{2,50}(?<! )$/u,
        message: {
            vi: 'Tên phải từ 2 đến 50 ký tự. Không bao gồm số và ký tự đặc biệt.',
            en: 'The name must be from 2 to 50 characters long. Numbers and special characters are not allowed.'
        }
    },
    password: {
        rx: /^(?!\s)[\S\s]{6,30}$/,
        message: {
            vi: "Mật khẩu phải từ 6 đến 30 ký tự.",
            en: "The password must be from 6 to 30 characters long."
        }
    },
    email: {
        rx: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: {
            vi: 'Email không hợp lệ.',
            en: 'Email is invalid.'
        }
    },
    phone: {
        rx: /^0[9|8|1|7|3|5]([-. ]?[0-9]{7,9})$/,
        message: {
            vi: 'Số điện thoại không hợp lệ.',
            en: 'Phone number is invalid.'
        }
    }
}

export default regex
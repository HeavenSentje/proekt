const { Router, request } = require('express')
const User = require('../models/User')
const config = require('config')
const jwt = require ('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const router = Router()
const bcrypt = require('bcryptjs')

router.post('/register',
    [
        check('email', 'E-mail введен некорректно').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min:6 })
    ], async (req, res) => {
        try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: erros.array(),
                message: 'Данные при регистрации введены некорректно'
            })
        }

        const { email, password } = req.body
        const candidate = await User.findOne({ email })

        if (candidate) {
           return res.status(400).json({ message: 'Такой пользователь уже существует' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({ message: 'Пользователь успешно создан' })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова' })
    }
})

router.post('/login',
    [
        check('email', 'Введите Email корректно').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ], async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: erros.array(),
                message: 'Данные при авторизации введены некорректно'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }
        const isPass = await bcrypt.compare(password, user.password)

        if (!isPass) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.status(100).json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова' })
    }
})

module.exports = router
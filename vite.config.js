import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/my-test-app/',  // ← Добавьте эту строку (замените на точное имя вашего репозитория)
})
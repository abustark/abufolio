/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.html', './js/**/*.js'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    accent: '#34d399',
                    strong: '#10b981',
                    cool: '#6ee7b7'
                }
            },
            fontFamily: {
                display: ['Space Grotesk', 'sans-serif'],
                body: ['Geist Sans', 'sans-serif'],
                mono: ['Geist Mono', 'monospace']
            }
        },
    },
    plugins: [],
};


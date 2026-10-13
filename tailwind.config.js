/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.html', './js/**/*.js'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    accent: '#10b981',
                    strong: '#059669',
                    cool: '#34d399'
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


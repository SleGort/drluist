/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1E40AF",
                secondary: "#3B82F6",
                "background-light": "#F8FAFC",
                "background-dark": "#0F172A",
            },
            fontFamily: {
                display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
                sans: ["Inter", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.5rem",
                lg: "1rem",
                xl: "1.5rem",
                "2xl": "1.25rem",
                "3xl": "1.75rem",
                full: "9999px",
            },
        },
    },
    plugins: [],
}

import tailwindcssElevation from 'tailwindcss-elevation'
import tailwindcssAnimate from "tailwindcss-animate"
import scrollbarHide from 'tailwind-scrollbar-hide'
import fluidType from 'tailwindcss-fluid-type'
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'donate-section-pattern': "url('./(public)/(home)/_components/_images/donate-background.svg')",
      },
      spacing: {
        'custom': '7.3vw', // Define your custom padding
      },
      fontFamily: {
        Heading: ["var(--font-heading)", "sans-serif"],
        Normal: ['var(--font-normal)', "sans-serif"],
        Hero: ['var(--font-hero)', "serif"]
      },
      colors: {

        "primary": generateColorClass('primary'),
        "on-primary": generateColorClass('on-primary'),
        "background": generateColorClass('background'),
        "on-background": generateColorClass('on-background'),
        "surface": generateColorClass('surface'),
        "on-surface": generateColorClass('on-surface'),
        "outline": generateColorClass('outline'),
        "sub-text": generateColorClass('sub-text'),

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: generateColorClass('primary'),

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },



        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },

      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme) => ({
        DEFAULT: {
          /**
           * This is making sure that any elements that are defined in the typography plugin
           * have their color set to the current color (inherit) so that they don't get colored
           * by the tailwind text color classes.
           */
          css: {
            [
              [
                // Elements that are defined in the typography plugin
                '[class~="lead"]',
                'strong',
                'ol > li::before',
                'blockquote',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'figure figcaption',
                'code',
                'a code',
                'thead',
              ].join(', ')
            ]: {
              color: 'inherit'
            },

            /**
             * This is making sure that any links have the primary color
             */
            'a': {
              color: "rgba(var(--primary))"
            },

            /**
             * This is making sure that any unordered list bullets have the current color
             */
            'ul > li::before': {
              backgroundColor: 'currentColor'
            },

            /**
             * This is making sure that any horizontal rules, blockquotes, table heads, and table rows
             * have the current color as their border color
             */
            [
              [
                'hr',
                'blockquote',
                'thead',
                'tbody tr'
              ].join(', ')
            ]: {
              borderColor: 'currentColor'
            }
          },
        },
      })
    },
  },
  plugins: [
    aspectRatio,
    tailwindcssElevation,
    tailwindcssAnimate,
    scrollbarHide,
    typography,
    fluidType({
      // your fluid type settings
      // works only with unitless numbers
      // This numbers are the defaults settings
      settings: {
        fontSizeMin: 0.95, // 1.125rem === 18px
        fontSizeMax: 1, // 1.25rem === 20px
        ratioMin: 1.125, // Multiplicator Min
        ratioMax: 1.2, // Multiplicator Max
        screenMin: 20, // 20rem === 320px
        screenMax: 96, // 96rem === 1536px
        unit: 'rem', // default is rem but it's also possible to use 'px'
        prefix: '', // set a prefix to use it alongside the default font sizes
        extendValues: true, // When you set extendValues to true it will extend the default values. Set it to false to overwrite the values.
      },
      // Creates the text-xx classes
      // This are the default settings and analog to the tailwindcss defaults
      // Each `lineHeight` is set unitless and we think that's the way to go especially in context with fluid type.
      values: {
        'xs': [-2, 1.6],
        'sm': [-1, 1.6],
        'base': [0, 1.6],
        'lg': [1, 1.6],
        'xl': [2, 1.2],
        '2xl': [3, 1.2],
        '3xl': [4, 1.2],
        '4xl': [5, 1.1],
        '5xl': [6, 1.1],
        '6xl': [7, 1.1],
        '7xl': [8, 1],
        '8xl': [9, 1],
        '9xl': [10, 1],
      },
    }),
  ],
}
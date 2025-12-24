# 💱 Currency Converter

Real-time currency conversion app using[Open Exchange Rates API](https://openexchangerates.org/).

## ✨ Features

- Select source and target currencies
- Automatic exchange rate conversion
- Support for a limited list of currencies (`allowedCurrencies`)
- UI built on React + TailwindCSS
- Deployment to GitHub Pages via CI/CD

---

## 🛡️ Data Validation with Zod

The [Zod](https://github.com/colinhacks/zod) library has been added to the project for checking data structures and generating types.

### Why is this necessary?

- API Response Validation: Ensures that data from OpenExchangeRates matches the expected schema.
- **Type safety**: The scheme automatically generates TypeScript types via `z.infer`.
- **Reliability**: The application will not crash if the API returns invalid JSON.
- **Convenient errors**: you can display clear messages to the user when an incorrect input is made.

---

## 🛠️ Tools

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [gh-pages](https://github.com/tschaub/gh-pages)
- [Open Exchange Rates API](https://openexchangerates.org/)
  [Zod](https://github.com/colinhacks/zod)

---

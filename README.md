# Bazar Monitoring (বাজার মনিটরিং)

A modern, full-stack web application designed to monitor real-time essential commodity prices across different divisions and markets in Bangladesh. Built with Next.js, Better Auth, and HeroUI, this platform provides users with seamless access to daily market rates, price trends, and regional price comparisons.

---

## 🚀 Features

* **Live Market Ticker**: Real-time marquee highlighting essential product price fluctuations and trends.
* **Category-Based Browsing**: Explore commodities categorized systematically (e.g., Rice, Lentils, Oil, Vegetables, Meat, etc.).
* **Detailed Product Analytics**: View comprehensive price metrics including today's average rate, yesterday's price, weekly/monthly comparisons, and percentage changes.
* **Regional Market Comparison**: Compare minimum and maximum product prices across various markets and divisions (e.g., Dhaka, Chattogram, Rajshahi, etc.).
* **Secure Authentication**: Protected routes and user authentication powered by **Better Auth** with strict session verification.
* **Responsive & Modern UI**: Built with **Tailwind CSS** and **HeroUI** components tailored for both mobile and desktop screens.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Library**: [HeroUI](https://heroui.com/)
* **Authentication**: Better Auth
* **Icons**: Lucide React
* **Data Source**: External Bazar Dor Worker API (`https://api.api-store.workers.dev/api/bazardor`)

---

## 📁 Project Structure

```text
bazar-monitoring/
├── src/
│   ├── app/                  # Next.js App Router pages (Home, Category, Product Details, Auth)
│   ├── components/           # Reusable UI components (Navbar, Hero, Footer, ProductCard, etc.)
│   ├── lib/                  # Authentication client and server configuration
│   └── types/                # TypeScript interface and type definitions
├── public/                   # Static assets and images
├── .env                      # Environment variables configuration
└── package.json              # Project dependencies and scripts
```

---

## ⚙️ Getting Started & Installation

Follow these steps to set up the project locally on your machine:

### 1. Clone the Repository
```bash
git clone <repository-url>
cd bazar-monitoring
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory of your project and add your API endpoint and authentication secrets:

```env
NEXT_PUBLIC_API_URL=https://api.api-store.workers.dev/api/bazardor
BETTER_AUTH_SECRET=your_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

---

## 🔒 Security & Access Control

* Product detail pages (`/product/[slug]`) and market comparisons are securely protected. Unauthenticated users attempting to access product details are automatically redirected to the sign-in page.

---

## 📄 License

This project is developed for assignment and demonstration purposes. All rights reserved.
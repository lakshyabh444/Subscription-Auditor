# 🕵️ Subscription Auditor

**A Privacy-First Subscription Tracker running entirely in your browser.**


## 🚀 Overview
Subscription Auditor is a modern web application designed to help you identify recurring subscription payments from your bank statements. Built with **Next.js 15** and **Tailwind CSS v4**, it offers a premium, dark-mode interface that processes your financial data securely on your device—**no data is ever sent to a server.**

## ✨ Features

-   **🔒 100% Client-Side Privacy**: Your bank statements are parsed locally using `PapaParse`. Zero data retention.
-   **🇮🇳 Indian Context Ready**: Tuned regex patterns to detect Indian services like **Hotstar, Zomato, Swiggy, Jio, Cred, and more**.
-   **⚡ Drag & Drop Interface**: Simply drop your CSV bank statement to instantly audit your spend.
-   **🎮 Demo Mode**: Don't have a CSV handy? Click "Try Demo Data" to see the app in action with realistic sample data.
-   **🎨 Premium UI**: Features glassmorphism, gradient text, staggered animations (`framer-motion`), and a sleek dark theme.
-   **📈 Visual Analytics**: Interactive Pie Chart showing spend distribution by category (Entertainment, Food, etc.).
-   **📄 PDF Reports**: Generate and download professional PDF audit reports with a single click.
-   **📊 Smart Analytics**:
    -   Monthly Spend Calculation (in **₹**)
    -   Active Subscription Count
    -   Yearly Cost Projection

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Data Parsing**: [PapaParse](https://www.papaparse.com/)
-   **Language**: TypeScript

## 🏁 Getting Started

### Prerequisites

-   Node.js installed

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/sub-auditor.git
    cd sub-auditor
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [Launch Subscription Auditor](https://subscription-auditor.vercel.app/) in your browser.

## 💡 How It Works

1.  **Upload**: You drag a `.csv` file into the drop zone.
2.  **Parse**: The app reads the file row-by-row in the browser using JavaScript.
3.  **Detect**: It matches description text against a configuration of known subscription keywords (Netflix, Spotify, etc.).
4.  **Display**: Matches are shown in a clean table with totals calculated automatically.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request



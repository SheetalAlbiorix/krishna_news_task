# 📰 News App

A modern **React Native (Expo)** application that displays categorized news articles with smooth UI, offline caching, and a dark/light mode toggle.  
Built for both **Android** and **iOS** using Expo and modular React architecture.

---

## 📸 Screenshots

| Technology Screen                                          | Business Screen                                          | Health Screen                                          | Sports Screen                                          | Article Details                                         | Settings                                                |
| ---------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------- |
| <img src="assets/screenshots/Technology.png" width="200"/> | <img src="assets/screenshots/Business.png" width="200"/> | <img src="assets/screenshots/Health.png" width="200"/> | <img src="assets/screenshots/Sports.png" width="200"/> | <img src="assets/screenshots/Details.png" width="200"/> | <img src="assets/screenshots/Setting.png" width="200"/> |

---

## 🎥 Demo Video

[▶️ Watch Demo](https://drive.google.com/file/d/18ijK89p6OttdJaHOi9-49truBiUxKaci/view?usp=sharing)

> Upload your app walkthrough video to YouTube, Loom, or Google Drive, then replace the link above.

---

## 🧱 Architecture Overview

The project follows a **scalable and modular architecture**, designed for easy maintenance and future growth.

src/
├── api/ # Handles API calls (Axios or Fetch)
├── components/ # Reusable UI components (Card, SearchBar, etc.)
├── hooks/ # Custom hooks (useFetch, useTheme, etc.)
├── navigation/ # All navigation setup (stack, tabs)
├── screens/ # Application screens (Home, Details, Settings)
├── store/ # State management
├── themes/ # Theme configuration (light & dark)
└── utils/ # Helper and utility functions

**Key principles:**

- 🔹 Separation of concerns
- 🔹 Reusable components
- 🔹 Centralized state management
- 🔹 Configurable themes

🧩 Features

✅ Fetches dynamic news articles from an API
✅ Category-based tab navigation (Technology, Sports, Health, etc.)
✅ Offline caching for performance
✅ Smooth transitions and animations
✅ Light/Dark theme toggle
✅ Responsive UI for Android and iOS
✅ Modular architecture for scalability

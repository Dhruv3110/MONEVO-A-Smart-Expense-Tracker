# 💰 MONEVO – Smart Expense Tracker

MONEVO is a full-stack, AI-powered expense tracking application that helps users track, analyze, and manage their expenses effortlessly. It combines modern UI/UX with a premium dark theme, secure authentication, and intelligent receipt processing to deliver meaningful financial insights.

## 🚀 Key Features

### 🔐 Authentication & Security
* Firebase Authentication (Login / Register)
* Secure access control with Firebase rules
* Protected routes for authenticated users

### 📸 Expense Input
* Upload receipts via image
* Drag & drop upload
* Camera-based receipt capture
* Manual expense entry

### 🧠 Smart Processing
* OCR-based receipt text extraction
* Rule-based + LLM-powered parsing
* Automatic expense categorization

### 📊 Dashboard & Analytics
* Category-wise expense breakdown (Pie Chart)
* 7-day spending trend analysis (Line Chart)
* Budget utilization tracking
* Visual indicators for overspending

### 💸 Budget Management
* Monthly & weekly budgets per category
* Real-time budget usage
* Progress bars with color-coded alerts
* Overspending notifications

### 🎨 UI / UX
* **Premium dark gradient theme** (Slate-900 → Slate-800)
* **Cyan, Blue & Indigo accent colors**
* Glassmorphism cards with glow effects
* Fully responsive (mobile → desktop)
* Smooth animations and hover effects
* Ambient orb effects in background

## 🛠️ Tech Stack

### Frontend
* **React.js** (Vite)
* **Tailwind CSS** (Dark theme customization)
* **Chart.js** (react-chartjs-2)
* **Lucide Icons**
* **Framer Motion** (Animations)

### Backend
* **FastAPI**
* **Python**
* OCR Engine
* LLM-based Parsing Services

### Database & Auth
* **Firebase Authentication**
* **Firebase Realtime Database**

### Tools & Platforms
* Git & GitHub
* Firebase Hosting
* ESLint
* Vite

## 📂 Project Structure

```
monevo-expense-tracker/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NotificationsPanel.jsx
│   │   │   ├── AnimatedOrb.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── UploadPage.jsx
│   │   │   ├── BudgetPage.jsx
│   │   │   ├── ExpenseListPage.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   ├── firebaseConfig.js
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── styles.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── server/
│   ├── config/
│   ├── routes/
│   ├── services/
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Dhruv3110/monevo-expense-tracker.git
cd monevo-expense-tracker
```

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

### 3️⃣ Backend Setup

```bash
cd server
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:
```
http://127.0.0.1:8000
```

## 🔐 Environment Variables

Create a `.env` file in `frontend/`:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_DATABASE_URL=your_db_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

⚠️ **Never commit `.env` files to GitHub.**



## 🔒 Firebase Realtime Database Rules

Example security rules for production:

```json
{
  "rules": {
    ".read": "auth != null && auth.uid === 'ADMIN_UID'",
    ".write": "auth != null && auth.uid === 'ADMIN_UID'"
  }
}
```

## 📱 Features Breakdown

### Dashboard
- Interactive pie chart showing expense distribution by category
- Line chart displaying 7-day spending trends
- Budget overview cards with progress indicators
- Color-coded alerts for budget limits (green < 70%, yellow < 90%, red > 90%)

### Upload Page
- Drag & drop receipt upload with visual feedback
- Mobile camera integration for instant captures
- Manual entry form with category selection
- Real-time processing with loading animations

### Budget Management
- Set monthly and weekly budgets per category
- Visual progress bars with gradient fills
- Auto-save functionality
- Reset to default budgets option

### Expense List
- Searchable and filterable expense records
- Category and date filters
- Edit and delete functionality with confirmation modals
- Color-coded category indicators

### Notifications
- Real-time budget alerts
- Success/warning/error notifications
- Auto-dismissing panel with manual controls
- Persistent notification storage in Firebase

## 🚀 Deployment

### Frontend (Firebase Hosting)

```bash
npm run build
firebase deploy
```

### Backend (Railway / Render / AWS)

Deploy the FastAPI backend to your preferred platform. Update the API endpoint in the frontend configuration.


## 👨‍💻 Author

**Dhruv Gupta**

* 🌐 Portfolio: [https://dhruvgupta31.web.app](https://dhruvgupta31.web.app)
* 💼 LinkedIn: [https://www.linkedin.com/in/dhruv-gupta-794968244/](https://www.linkedin.com/in/dhruv-gupta-794968244/)
* 🐙 GitHub: [https://github.com/Dhruv3110](https://github.com/Dhruv3110)


## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

Made with ❤️ and ☕ by Dhruv Gupta

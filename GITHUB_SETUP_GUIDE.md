# GitHub Connection & 1-Click Auto-Update Guide
### Project: FryNation Pakistan

This guide shows you how to connect your project to GitHub and set up **instant auto-updating** so that every time you edit prices, images, or menu items, your GitHub repository and live website update automatically.

---

## 🌟 Method 1: The 1-Click "Sync to GitHub" Script (Recommended)

I have created an automated script [`sync-to-github.bat`](file:///C:/Users/Imran%20Malik/.gemini/antigravity/scratch/frynation-food-ordering/sync-to-github.bat) inside your project folder.

### Step 1: Install Git (If not already installed)
1. Download Git for Windows (64-bit): **[git-scm.com/download/win](https://git-scm.com/download/win)**
2. Run the installer and click **Next -> Next -> Install** (keep default settings).

### Step 2: Create a New Empty Repository on GitHub
1. Log into your account at **[github.com](https://github.com)**.
2. Click the **`+`** icon in the top right -> **New repository**.
3. Name it: `frynation-food-ordering` (or any name you like).
4. Set it to **Public**.
5. **Important:** Leave "Add a README file" **unchecked** (empty repo).
6. Click **Create repository**.
7. Copy your repository HTTPS URL (e.g. `https://github.com/your-username/frynation-food-ordering.git`).

### Step 3: Run the 1-Click Sync Script
1. Go to your folder:
   `C:\Users\Imran Malik\.gemini\antigravity\scratch\frynation-food-ordering`
2. Double-click **[`sync-to-github.bat`](file:///C:/Users/Imran%20Malik/.gemini/antigravity/scratch/frynation-food-ordering/sync-to-github.bat)**.
3. On the first run, it will ask you to paste your GitHub repository URL. Paste it and press **Enter**.
4. It will automatically stage all files, create a commit, and push everything to GitHub!

### Step 4: Auto-Updating Future Changes
From now on, whenever you change anything in the website:
- Simply double-click **`sync-to-github.bat`**!
- In 3 seconds, all changes are pushed and live on GitHub automatically.

---

## 🖥️ Method 2: GitHub Desktop (Graphical Visual App)

If you prefer a visual button without using any black terminal window:

1. Download **GitHub Desktop**: **[desktop.github.com](https://desktop.github.com)**
2. Install and sign in with your GitHub username & password.
3. Click **File** -> **Add local repository...**
4. Browse to:
   `C:\Users\Imran Malik\.gemini\antigravity\scratch\frynation-food-ordering`
5. Click **Add repository** (or "Create repository here").
6. Click the blue button: **"Publish repository to GitHub"**.
7. Whenever you edit any code, open GitHub Desktop and click **"Commit to main"** -> **"Push origin"**!

---

## ⚡ Bonus: Auto-Deploy to Vercel/Netlify from GitHub
Once your code is on GitHub:
1. Connect your GitHub repository to **[Vercel](https://vercel.com)** or **[Netlify](https://netlify.com)** once.
2. Every time `sync-to-github.bat` pushes changes to GitHub, Vercel/Netlify will **automatically redeploy your live website** in 15 seconds!

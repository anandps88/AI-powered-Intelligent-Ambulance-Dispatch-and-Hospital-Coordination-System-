# Quick Start Guide

## 🚀 Getting Started (First Time Setup)

### Step 1: Install Node.js
1. Visit: https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer
4. Restart your computer if prompted

### Step 2: Verify Installation
Open PowerShell and run:
```powershell
node --version
npm --version
```

### Step 3: Install Project Dependencies
```powershell
cd "C:\Users\anand\OneDrive\Desktop\Main Project\web"
npm install
```

### Step 4: Start Development Server
```powershell
npm run dev
```

### Step 5: Open in Browser
Visit: http://localhost:3000

---

## 📝 Common Commands

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for errors
npm run lint
```

---

## 🎯 Project Features

### ✅ Completed Components
1. **Sidebar Navigation** - Fixed left sidebar with smooth animations
2. **Live Map Panel** - Interactive map with emergency markers
3. **Statistics Card** - Real-time metrics display
4. **AI Alerts** - Predictive warnings and insights
5. **Quick Actions** - Command buttons with glow effects
6. **Incident Table** - Sortable incident management

### 🎨 Design Highlights
- Dark mode with navy gradient background
- Glowing accents (red, green, blue)
- Framer Motion animations
- Responsive grid layout
- Professional emergency operations theme

---

## 📂 File Structure Quick Reference

```
app/
  ├── layout.jsx       → Root layout
  ├── page.jsx         → Main dashboard
  └── globals.css      → Global styles

components/
  ├── Sidebar.jsx      → Navigation
  ├── TopHeader.jsx    → Page header
  ├── LiveStatsCard.jsx → Statistics
  ├── AIAlertsCard.jsx → AI alerts
  ├── QuickActions.jsx → Action buttons
  ├── IncidentTable.jsx → Incident list
  └── MapPanel.jsx     → Map view

lib/
  ├── data.js          → Mock data
  └── utils.js         → Helper functions
```

---

## 🔧 Customization Tips

### Change Mock Data
Edit: `lib/data.js`

### Modify Styles
Edit: `app/globals.css` or use Tailwind classes

### Add New Component
1. Create file in `components/`
2. Import in `app/page.jsx`
3. Add to grid layout

### Change Colors
Edit: `tailwind.config.js` → extend → colors

---

## 🐛 Troubleshooting

### Problem: "npx is not recognized"
**Solution:** Install Node.js first

### Problem: Port 3000 already in use
**Solution:** 
```powershell
npm run dev -- -p 3001
```

### Problem: Dependencies not installing
**Solution:**
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 📞 Next Steps

1. ✅ Project structure created
2. ✅ All components built
3. ✅ Mock data added
4. ⏳ Install Node.js (if needed)
5. ⏳ Run `npm install`
6. ⏳ Run `npm run dev`
7. 🎉 Start customizing!

---

**Happy Coding! 🚀**

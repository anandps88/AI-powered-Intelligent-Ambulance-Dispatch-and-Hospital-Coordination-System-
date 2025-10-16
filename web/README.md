# AI-Powered Intelligent Ambulance Dispatch and Hospital Coordination System

A production-grade **Next.js 14 (App Router)** web dashboard for emergency ambulance dispatch and hospital coordination with AI-powered features.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)

## 🎨 Design Features

### Theme
- **Dark Mode Interface** with professional emergency-operations aesthetic
- Navy background with subtle gradients
- Glowing accent highlights in red, green, and blue
- Rounded cards (rounded-2xl) with subtle shadows

### Layout Components
- ✅ **Persistent Left Sidebar Navigation** - Fixed sidebar with smooth hover effects
- ✅ **Live Map Panel** - Interactive map area with emergency, hospital, and ambulance markers
- ✅ **Live Statistics Card** - Real-time metrics display
- ✅ **AI Alerts Card** - Predictive insights and warnings
- ✅ **Quick Actions** - Command-center style action buttons
- ✅ **Incident Management Table** - Comprehensive incident tracking

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **Animations:** Framer Motion
- **Map Integration:** Ready for Leaflet.js / Mapbox
- **Language:** JavaScript (ES6+)

## 📁 Project Structure

```
web/
├── app/
│   ├── layout.jsx          # Root layout with Inter font
│   ├── page.jsx            # Main dashboard page
│   └── globals.css         # Global styles and Tailwind config
├── components/
│   ├── Sidebar.jsx         # Navigation sidebar
│   ├── TopHeader.jsx       # Page header
│   ├── LiveStatsCard.jsx   # Live statistics display
│   ├── AIAlertsCard.jsx    # AI-powered alerts
│   ├── QuickActions.jsx    # Quick action buttons
│   ├── IncidentTable.jsx   # Incident management table
│   └── MapPanel.jsx        # Interactive map view
├── lib/
│   ├── data.js             # Mock data for dashboard
│   └── utils.js            # Utility functions
├── .github/
│   └── copilot-instructions.md
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites

Before you begin, ensure you have **Node.js** installed on your system:

1. **Download Node.js:**
   - Visit [https://nodejs.org/](https://nodejs.org/)
   - Download the **LTS (Long Term Support)** version
   - Run the installer and follow the setup wizard
   - Verify installation by opening PowerShell and running:
     ```powershell
     node --version
     npm --version
     ```

### Installation

1. **Navigate to the project directory:**
   ```powershell
   cd "C:\Users\anand\OneDrive\Desktop\Main Project\web"
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

   This will install all required packages:
   - next (14.2.0+)
   - react & react-dom (18.3.1+)
   - lucide-react (0.400.0+)
   - framer-motion (11.2.0+)
   - tailwindcss (3.4.3+)
   - And other dev dependencies

3. **Run the development server:**
   ```powershell
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the AI-Powered Ambulance Dispatch Dashboard

## 📊 Dashboard Features

### 1. **Sidebar Navigation**
- Dashboard (Active)
- Incidents
- Ambulances
- Hospitals
- Analytics
- Notifications
- Settings
- System status indicator at bottom

### 2. **Live Map View**
- Real-time visualization of:
  - 🔴 **Red markers** - Active emergencies
  - 🟢 **Green markers** - Hospital locations
  - 🔵 **Blue markers** - Ambulance units
- Interactive tooltips on hover
- Ready for Leaflet.js/Mapbox integration

### 3. **Live Statistics**
- **13** Ongoing Emergencies
- **6 min** Average Response Time
- **22** Available Ambulances
- **82%** Hospital Bed Utilization

### 4. **AI Alerts**
- High-Demand Zone Detection
- Predicted Ambulance Shortages
- Route Congestion Warnings
- Real-time severity indicators

### 5. **Quick Actions**
- **Dispatch Ambulance** - Manual dispatch control
- **Add Incident Manually** - Create new emergency
- **Override AI Decision** - Manual intervention

### 6. **Incident Management Table**
- Case ID tracking
- Real-time status updates
- Severity badges (High/Medium/Low)
- Location information
- Assigned ambulance details
- ETA tracking

## 🎯 Available Scripts

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🔧 Configuration

### Tailwind CSS
The project uses a custom dark theme configured in `tailwind.config.js` with:
- Extended color palette
- Custom animations
- Responsive breakpoints

### Next.js
Configured in `next.config.js` with:
- React Strict Mode enabled
- Optimized for production builds

## 🎨 Customization

### Adding New Components
1. Create component in `/components` directory
2. Import and use in `/app/page.jsx`
3. Follow existing patterns for consistency

### Modifying Mock Data
Edit `/lib/data.js` to customize:
- Live statistics
- AI alerts
- Incident data
- Map markers

### Styling
- Global styles: `/app/globals.css`
- Component-specific: Use Tailwind utility classes
- Custom utilities: Add to `@layer utilities` in globals.css

## 🔮 Future Enhancements

- [ ] Integrate real map API (Leaflet.js/Mapbox)
- [ ] Connect to backend API
- [ ] Add real-time WebSocket updates
- [ ] Implement authentication
- [ ] Add data visualization charts (Recharts)
- [ ] Mobile responsive sidebar
- [ ] Advanced filtering and search
- [ ] Export reports functionality

## 📝 Notes

- All data is currently **mock data** for demonstration
- Map integration is **placeholder-ready** for Leaflet.js or Mapbox
- Components use **client-side rendering** ('use client' directive)
- Fully **responsive design** (desktop-first approach)
- **Framer Motion** animations for smooth transitions
- **Accessibility** features included (ARIA labels, semantic HTML)

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```powershell
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Node Modules Issues
If you encounter dependency issues:
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Build Errors
Ensure you have the latest LTS version of Node.js:
```powershell
node --version  # Should be v18.x or higher
```

## 📄 License

This project is for demonstration and educational purposes.

## 👨‍💻 Development

Built with ❤️ using Next.js 14 and modern web technologies.

---

**Need Help?** Check the [Next.js Documentation](https://nextjs.org/docs) or [Tailwind CSS Documentation](https://tailwindcss.com/docs)

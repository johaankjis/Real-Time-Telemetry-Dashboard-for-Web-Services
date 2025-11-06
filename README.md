# Real-Time Telemetry Dashboard for Web Services

A modern, real-time telemetry and monitoring dashboard built with Next.js 16, React 19, and TypeScript. This dashboard provides comprehensive insights into web service performance, health metrics, and system analytics with a beautiful, responsive UI.

## ✨ Features

### Real-Time Monitoring
- **Live Metrics**: Track active users, requests per minute, response times, and error rates in real-time
- **System Status**: Monitor overall system health with operational, degraded, and down states
- **Auto-Refresh**: Configurable automatic data refresh intervals (default: 5 seconds)

### Comprehensive Visualizations
- **Performance Charts**: Multi-metric charts displaying CPU, memory, and network utilization
- **System Timeline**: 24-hour performance timeline with response time, throughput, and resource metrics
- **Activity Feed**: Real-time feed of system events, warnings, and errors
- **Metric Cards**: At-a-glance view of key performance indicators with trend indicators

### Alert Management
- **Configurable Alerts**: Set up custom alert rules with thresholds
- **Multiple Severity Levels**: Critical, warning, and info severity classifications
- **Alert Dashboard**: Dedicated page for managing and monitoring alerts
- **Enable/Disable Controls**: Quick toggle for individual alert rules

### Modern UI/UX
- **Responsive Design**: Fully responsive layout optimized for desktop and mobile devices
- **Dark Mode Ready**: Built with theme support using next-themes
- **Accessibility**: ARIA-compliant components using Radix UI primitives
- **Beautiful Animations**: Smooth transitions and loading states

## 🚀 Technology Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)**: React framework with App Router
- **[React 19.2](https://react.dev/)**: Latest React with enhanced features
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe development
- **[Tailwind CSS 4.1](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Recharts](https://recharts.org/)**: Composable charting library

### UI Components
- **[Radix UI](https://www.radix-ui.com/)**: Accessible component primitives
- **[Lucide React](https://lucide.dev/)**: Beautiful icon library
- **[shadcn/ui](https://ui.shadcn.com/)**: Re-usable component collection
- **[Sonner](https://sonner.emilkowal.ski/)**: Toast notifications
- **[Vaul](https://vaul.emilkowal.ski/)**: Drawer component

### Development Tools
- **[pnpm](https://pnpm.io/)**: Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)**: Code linting and quality checks
- **[PostCSS](https://postcss.org/)**: CSS transformations

### Analytics
- **[Vercel Analytics](https://vercel.com/analytics)**: Real-time analytics and insights

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/johaankjis/Real-Time-Telemetry-Dashboard-for-Web-Services.git
cd Real-Time-Telemetry-Dashboard-for-Web-Services
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Run the development server**
```bash
pnpm dev
# or
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
Real-Time-Telemetry-Dashboard-for-Web-Services/
├── app/                        # Next.js app directory
│   ├── alerts/                 # Alert management page
│   ├── api/                    # API routes
│   │   ├── alerts/            # Alert endpoints
│   │   ├── services/          # Service endpoints
│   │   └── telemetry/         # Telemetry endpoints
│   ├── layout.tsx             # Root layout component
│   ├── page.tsx               # Main dashboard page
│   └── globals.css            # Global styles
├── components/                 # React components
│   ├── ui/                    # shadcn/ui components
│   ├── activity-feed.tsx      # Activity feed component
│   ├── alert-indicator.tsx    # Alert status indicator
│   ├── alert-panel.tsx        # Alert configuration panel
│   ├── error-chart.tsx        # Error visualization chart
│   ├── latency-chart.tsx      # Latency metrics chart
│   ├── metric-card.tsx        # Metric display card
│   ├── performance-chart.tsx  # Performance metrics chart
│   ├── request-chart.tsx      # Request visualization chart
│   ├── service-status.tsx     # Service health status
│   ├── stat-card.tsx          # Statistics card
│   ├── status-indicator.tsx   # System status indicator
│   ├── system-performance-timeline.tsx  # Timeline chart
│   └── theme-provider.tsx     # Theme context provider
├── hooks/                      # Custom React hooks
│   ├── use-mobile.ts          # Mobile detection hook
│   ├── use-telemetry-data.ts  # Telemetry data management hook
│   └── use-toast.ts           # Toast notification hook
├── lib/                        # Utility functions and types
│   ├── mock-data.ts           # Mock data generators
│   ├── types.ts               # TypeScript type definitions
│   └── utils.ts               # Utility functions
├── public/                     # Static assets
├── styles/                     # Additional styles
├── components.json             # shadcn/ui configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Project dependencies
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🎯 Key Components

### useTelemetryData Hook
A custom React hook that manages real-time telemetry data:
- Generates realistic simulated metrics
- Auto-updates at configurable intervals
- Provides loading states and data freshness indicators

### Dashboard Page
The main dashboard displays:
- System health status indicator
- Four key metric cards (Active Users, Requests/min, Response Time, Error Rate)
- 24-hour system performance timeline
- Multi-metric performance charts
- Real-time activity feed

### Alert System
Configurable alert management with:
- Custom threshold settings
- Severity levels (critical, warning, info)
- Enable/disable functionality
- Alert trigger history

## 🎨 Customization

### Updating Refresh Interval
Modify the update interval in `app/page.tsx`:
```typescript
const { data, isUpdating } = useTelemetryData(5000) // 5000ms = 5 seconds
```

### Adding New Metrics
1. Update the `TelemetryData` interface in `hooks/use-telemetry-data.ts`
2. Add metric generation logic in the `updateData` function
3. Create or update components to display the new metrics

### Theming
The dashboard uses Tailwind CSS for styling. Customize colors and themes in:
- `tailwind.config.ts` - Main theme configuration
- `app/globals.css` - CSS variables and base styles

## 🔌 API Integration

The dashboard is designed to work with mock data by default. To integrate with real telemetry data:

1. **Update API Routes**: Modify files in `app/api/` to connect to your backend services
2. **Update Hook**: Replace mock data generation in `hooks/use-telemetry-data.ts` with API calls
3. **Configure Endpoints**: Set up environment variables for API endpoints

Example API integration:
```typescript
const fetchTelemetryData = async () => {
  const response = await fetch('/api/telemetry')
  return await response.json()
}
```

## 📊 Data Types

Key TypeScript interfaces:

```typescript
interface TelemetryData {
  metrics: {
    activeUsers: number
    requestsPerMin: number
    avgResponseTime: number
    errorRate: number
  }
  systemStatus: "operational" | "degraded" | "down"
  activities: Activity[]
  performanceData: PerformanceDataPoint[]
  timelineData: TimelineDataPoint[]
  lastUpdated: Date
}
```

See `lib/types.ts` for complete type definitions.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Update documentation for new features
- Ensure TypeScript types are properly defined
- Test your changes thoroughly

## 📝 License

This project is available for use under standard open-source practices. Please check the repository for specific license information.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation

## 🚧 Roadmap

Future enhancements planned:
- [ ] Historical data storage and analysis
- [ ] User authentication and role-based access
- [ ] Export data to CSV/PDF
- [ ] Custom dashboard layouts
- [ ] Multi-service monitoring
- [ ] Integration with popular monitoring tools (Prometheus, Grafana, etc.)
- [ ] Email/SMS alert notifications
- [ ] Advanced filtering and search capabilities

---

**Built with ❤️ using Next.js and React**

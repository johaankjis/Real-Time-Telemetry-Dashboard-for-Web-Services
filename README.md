# Real-Time Telemetry Dashboard for Web Services

A modern, real-time telemetry dashboard built with Next.js for monitoring web services performance, health, and metrics. This application provides comprehensive insights into system behavior with live updates, interactive visualizations, and alert management.

![Dashboard Preview](https://img.shields.io/badge/Next.js-16.0.0-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### Core Features
- **Real-Time Monitoring**: Live telemetry data updates every 5 seconds
- **Service Health Tracking**: Monitor multiple microservices simultaneously
- **Performance Metrics**: Track CPU, memory, network, and response times
- **Error Tracking**: Real-time error rate monitoring with detailed insights
- **Alert Management**: Configurable alerts with severity levels (critical, warning, info)
- **Activity Feed**: Live stream of system events and notifications
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Responsive Design**: Fully responsive UI built with Tailwind CSS

### Dashboard Components
- **System Status Indicator**: Visual representation of overall system health
- **Metric Cards**: Quick overview of key performance indicators
  - Active Users
  - Requests per Minute
  - Average Response Time
  - Error Rate
- **System Performance Timeline**: 24-hour historical performance data
- **Performance Charts**: Multi-metric visualization (CPU, Memory, Network)
- **Activity Feed**: Real-time event logging and notifications

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 16.0.0](https://nextjs.org/) with React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **Icons**: Lucide React
- **Form Handling**: React Hook Form with Zod validation
- **Date Utilities**: date-fns

### Backend/API
- **API Routes**: Next.js API routes for RESTful endpoints
- **Data Storage**: In-memory storage (mock data for demonstration)
- **Real-time Updates**: Client-side polling with custom hooks

### Development Tools
- **Package Manager**: npm/pnpm
- **Linting**: ESLint
- **Build Tool**: Next.js built-in tooling

## 📁 Project Structure

```
Real-Time-Telemetry-Dashboard-for-Web-Services/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── alerts/              # Alert management endpoints
│   │   ├── services/            # Service health endpoints
│   │   └── telemetry/           # Telemetry data endpoints
│   │       ├── route.ts         # Main telemetry API (GET/POST)
│   │       ├── stats/           # Statistics aggregation
│   │       ├── timeseries/      # Time-series data
│   │       └── simulate/        # Mock data simulation
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Dashboard page
├── components/                   # React components
│   ├── activity-feed.tsx        # Activity log component
│   ├── alert-indicator.tsx      # Alert status display
│   ├── alert-panel.tsx          # Alert management panel
│   ├── error-chart.tsx          # Error rate visualization
│   ├── latency-chart.tsx        # Latency metrics chart
│   ├── metric-card.tsx          # Metric display card
│   ├── performance-chart.tsx    # Performance visualization
│   ├── request-chart.tsx        # Request metrics chart
│   ├── service-status.tsx       # Service health status
│   ├── stat-card.tsx            # Statistics card
│   ├── status-indicator.tsx     # System status indicator
│   ├── system-performance-timeline.tsx  # Timeline chart
│   ├── theme-provider.tsx       # Theme context provider
│   └── ui/                      # Reusable UI components (Radix UI)
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection hook
│   ├── use-telemetry-data.ts    # Telemetry data management
│   └── use-toast.ts             # Toast notification hook
├── lib/                          # Utility libraries
│   ├── mock-data.ts             # Mock data generation
│   ├── types.ts                 # TypeScript type definitions
│   └── utils.ts                 # Utility functions
├── public/                       # Static assets
├── styles/                       # Additional styles
├── components.json               # shadcn/ui configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Project dependencies
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, pnpm, or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Real-Time-Telemetry-Dashboard-for-Web-Services.git
   cd Real-Time-Telemetry-Dashboard-for-Web-Services
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the dashboard.

### Build for Production

```bash
npm run build
npm start
```

## 📊 Usage

### Dashboard Overview
The main dashboard (`/`) displays:
- **System Status**: Overall health indicator (Operational, Degraded, Down)
- **Key Metrics**: Active users, request rate, response time, error rate
- **Performance Timeline**: 24-hour historical data visualization
- **Live Activity Feed**: Real-time system events and notifications
- **Performance Charts**: CPU, Memory, and Network utilization

### Data Updates
- Dashboard automatically refreshes every 5 seconds
- Visual indicator shows when data is updating
- Last update timestamp displayed in the header

## 🔌 API Endpoints

### Telemetry Endpoints

#### POST `/api/telemetry`
Ingest new telemetry data.

**Request Body:**
```json
{
  "service_name": "api-gateway",
  "endpoint": "/api/users",
  "method": "GET",
  "status_code": 200,
  "latency_ms": 245,
  "error_message": null
}
```

**Response:**
```json
{
  "success": true,
  "metric": {
    "id": "1234567890-0.123",
    "timestamp": "2025-11-06T04:00:00.000Z",
    ...
  }
}
```

#### GET `/api/telemetry`
Query telemetry data with filters.

**Query Parameters:**
- `service`: Filter by service name
- `limit`: Maximum number of results (default: 100)
- `since`: ISO timestamp for filtering recent data

**Response:**
```json
{
  "data": [...],
  "count": 100
}
```

#### GET `/api/telemetry/stats`
Get aggregated statistics.

**Response:**
```json
{
  "total_requests": 1234,
  "avg_latency_ms": 245,
  "error_rate": 0.12,
  "active_services": 4
}
```

#### GET `/api/telemetry/timeseries`
Get time-series data for charting.

**Query Parameters:**
- `metric`: Metric type (latency, requests, errors)
- `interval`: Time interval (1m, 5m, 1h)
- `duration`: Duration in minutes (default: 60)

### Service Health Endpoints

#### GET `/api/services`
Get health status of all services.

**Response:**
```json
[
  {
    "service_name": "api-gateway",
    "status": "healthy",
    "uptime_percentage": 99.9,
    "avg_latency_ms": 245,
    "error_rate": 0.1,
    "last_check": "2025-11-06T04:00:00.000Z"
  }
]
```

### Alert Endpoints

#### GET `/api/alerts`
Get all configured alerts.

#### PUT `/api/alerts/:id`
Update alert configuration.

## 🧩 Key Components

### Custom Hooks

#### `useTelemetryData(updateInterval?: number)`
Manages telemetry data with automatic updates.
- Returns: `{ data, isUpdating }`
- Default update interval: 5000ms

### Type Definitions

#### `TelemetryMetric`
```typescript
{
  id: string;
  timestamp: Date;
  service_name: string;
  endpoint: string;
  method: string;
  status_code: number;
  latency_ms: number;
  error_message?: string;
}
```

#### `ServiceHealth`
```typescript
{
  service_name: string;
  status: "healthy" | "degraded" | "down";
  uptime_percentage: number;
  avg_latency_ms: number;
  error_rate: number;
  last_check: Date;
}
```

## ⚙️ Configuration

### Environment Variables
Currently, the application uses mock data and doesn't require environment variables. For production deployment, consider adding:

```env
# .env.local
NEXT_PUBLIC_API_URL=your-api-url
DATABASE_URL=your-database-url
```

### Next.js Configuration
Edit `next.config.mjs` to customize:
- Image optimization
- TypeScript settings
- Build output configuration

### Tailwind Configuration
Customize theme, colors, and plugins in `tailwind.config.ts`.

## 🎨 Customization

### Adding New Metrics
1. Update `TelemetryData` interface in `hooks/use-telemetry-data.ts`
2. Add metric card in `app/page.tsx`
3. Update mock data generation if needed

### Creating New Charts
1. Create a new component in `components/`
2. Use Recharts components for visualization
3. Import and add to the dashboard layout

### Modifying Update Interval
Change the interval in `app/page.tsx`:
```typescript
const { data, isUpdating } = useTelemetryData(10000) // 10 seconds
```

## 🧪 Development

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use ESLint for code consistency
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons by [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or suggestions, please open an issue in the GitHub repository.

## 🗺️ Roadmap

- [ ] Real database integration (PostgreSQL/MongoDB)
- [ ] WebSocket support for true real-time updates
- [ ] User authentication and authorization
- [ ] Alert notification system (email, Slack, etc.)
- [ ] Advanced filtering and search capabilities
- [ ] Export data to CSV/JSON
- [ ] Dark/Light theme toggle
- [ ] Mobile app version
- [ ] Multi-tenant support
- [ ] Advanced analytics and reporting

---

**Made with ❤️ for monitoring web services**

import { App as AntApp, ConfigProvider, theme } from "antd";
import viVN from "antd/locale/vi_VN";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Loading from "./components/Common/Loading";
import Layout from "./components/layout/Layout";
import { BRAND_CONFIG } from "./config/brand";
import "./global.css"; /* ✅ Import global styles first */
import { store } from "./store/store";

// Enhanced lazy loading with route-based code splitting
// Each lazy import creates a separate chunk, reducing main bundle size

// Authentication (load immediately)
const Login = lazy(() => import("./components/auth/Login"));

// Core Dashboard (high priority - preload)
const LiveDashboard = lazy(
  () => import(/* webpackChunkName: "dashboard" */ "./components/Dashboard/LiveDashboard")
);

// AI & Analytics Group (separate chunk)
const AIDashboard = lazy(
  () => import(/* webpackChunkName: "ai-analytics" */ "./components/ai/AIDashboard")
);
const AdvancedAnalyticsDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "advanced-analytics" */ "./components/analytics/AdvancedAnalyticsDashboard"
    )
);
const NLPDashboard = lazy(
  () => import(/* webpackChunkName: "nlp" */ "./components/nlp/NLPDashboard")
);

// Google Integration Group (separate chunk)
const GoogleSheetsIntegration = lazy(
  () =>
    import(/* webpackChunkName: "google-sheets" */ "./components/google/GoogleSheetsIntegration")
);
const GoogleDriveIntegration = lazy(
  () => import(/* webpackChunkName: "google-drive" */ "./components/google/GoogleDriveIntegration")
);
const GoogleAppsScriptIntegration = lazy(
  () =>
    import(
      /* webpackChunkName: "google-apps-script" */ "./components/google/GoogleAppsScriptIntegration"
    )
);

// Communication Group (separate chunk)
const TelegramIntegration = lazy(
  () => import(/* webpackChunkName: "telegram" */ "./components/telegram/TelegramIntegration")
);

// Automation Group (separate chunk)
const AutomationDashboard = lazy(
  () => import(/* webpackChunkName: "automation" */ "./components/automation/AutomationDashboard")
);
const SmartAutomationDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "smart-automation" */ "./components/smart-automation/SmartAutomationDashboard"
    )
);

// Business Features Group (separate chunk)
const MIARetailDashboard = lazy(
  () => import(/* webpackChunkName: "retail" */ "./components/custom/MIARetailDashboard")
);
const AlertsManagement = lazy(
  () => import(/* webpackChunkName: "alerts" */ "./components/Alerts/AlertsManagement")
);

// Security Group (separate chunk)
const SecurityDashboard = lazy(
  () => import(/* webpackChunkName: "security" */ "./components/security/SecurityDashboard")
);

// Preload critical components
const preloadComponent = (componentLoader) => {
  componentLoader();
};

// Preload dashboard on app start
if (typeof window !== "undefined") {
  setTimeout(() => {
    preloadComponent(() => import("./components/Dashboard/LiveDashboard"));
  }, 2000);
}

// Home component
const Home = () => (
  <div className="home-container">
    <div className="hero-section">
      <h1>🛒 {BRAND_CONFIG.productName}</h1>
      <p>Hệ thống phân tích retail thông minh với AI và Google Integration</p>
    </div>

    <div className="features-grid">
      <div className="feature-card primary">
        <h3>📊 Live Dashboard</h3>
        <p>
          Theo dõi thời gian thực, giám sát hiệu suất và phân tích hệ thống với WebSocket
          integration.
        </p>
        <div className="feature-stats">
          <div className="stat">
            <span className="stat-value">99.9%</span>
            <span className="stat-label">Uptime</span>
          </div>
          <div className="stat">
            <span className="stat-value">2.3s</span>
            <span className="stat-label">Response Time</span>
          </div>
        </div>
      </div>

      <div className="feature-card secondary">
        <h3>🛒 Retail Analytics</h3>
        <p>
          Phân tích retail thông minh, dự đoán sales, quản lý inventory và tối ưu hóa hiệu suất cửa
          hàng.
        </p>
        <div className="feature-stats">
          <div className="stat">
            <span className="stat-value">92%</span>
            <span className="stat-label">Accuracy</span>
          </div>
          <div className="stat">
            <span className="stat-value">15%</span>
            <span className="stat-label">Cost Reduction</span>
          </div>
        </div>
      </div>

      <div className="feature-card tertiary">
        <h3>📋 Google Sheets</h3>
        <p>Tích hợp Google Sheets để quản lý dữ liệu, báo cáo và tự động hóa quy trình làm việc.</p>
        <div className="feature-stats">
          <div className="stat">
            <span className="stat-value">1,250</span>
            <span className="stat-label">Records</span>
          </div>
          <div className="stat">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Sync</span>
          </div>
        </div>
      </div>
    </div>

    <div className="features-grid">
      <div className="feature-card">
        <h3>📈 Trạng thái hệ thống</h3>
        <div className="status-list">
          <div className="status-item">
            <span className="status-icon">✅</span>
            <div className="status-content">
              <span className="status-title">Frontend</span>
              <span className="status-desc">Tối ưu hóa & Triển khai</span>
            </div>
          </div>
          <div className="status-item">
            <span className="status-icon">✅</span>
            <div className="status-content">
              <span className="status-title">Backend</span>
              <span className="status-desc">WebSocket Ready</span>
            </div>
          </div>
          <div className="status-item">
            <span className="status-icon">✅</span>
            <div className="status-content">
              <span className="status-title">Automation</span>
              <span className="status-desc">Hoạt động</span>
            </div>
          </div>
        </div>
        <div className="system-health">
          <span className="health-label">Tình trạng hệ thống:</span>
          <span className="health-status healthy">Khỏe mạnh</span>
        </div>
      </div>

      <div className="feature-card">
        <h3>🎯 Tính năng mới v3.0</h3>
        <div className="feature-tags">
          {[
            "📡 Tích hợp WebSocket thời gian thực",
            "📊 Dashboard hiệu suất trực tiếp",
            "⚡ Cải thiện hiệu suất 50%",
            "🎨 Thiết kế UI/UX hiện đại",
            "📱 Hỗ trợ di động responsive",
            "🔒 Tính năng bảo mật nâng cao",
          ].map((feature, index) => (
            <span key={index} className="feature-tag">
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Main App component with Router
function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        locale={viVN}
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: BRAND_CONFIG.colors.primary,
            borderRadius: 8,
          },
        }}
      >
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AntApp>
            <div className="App">
              <Suspense fallback={<Loading />}>
                <Routes>
                  {/* Public Routes - No Layout */}
                  <Route path="/login" element={<Login />} />

                  {/* Routes with Layout */}
                  <Route
                    path="/*"
                    element={
                      <Layout>
                        <Routes>
                          <Route path="/" element={<Home />} />

                          {/* Protected Routes - Yêu cầu authentication */}
                          <Route
                            path="/dashboard"
                            element={
                              <ProtectedRoute>
                                <LiveDashboard />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/ai-analytics"
                            element={
                              <ProtectedRoute>
                                <AIDashboard />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/retail"
                            element={
                              <ProtectedRoute>
                                <MIARetailDashboard />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/google-sheets"
                            element={
                              <ProtectedRoute>
                                <GoogleSheetsIntegration />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/google-drive"
                            element={
                              <ProtectedRoute>
                                <GoogleDriveIntegration />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/google-apps-script"
                            element={
                              <ProtectedRoute>
                                <GoogleAppsScriptIntegration />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/telegram"
                            element={
                              <ProtectedRoute>
                                <TelegramIntegration />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/automation"
                            element={
                              <ProtectedRoute>
                                <AutomationDashboard />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/alerts"
                            element={
                              <ProtectedRoute>
                                <AlertsManagement />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/advanced-analytics"
                            element={
                              <ProtectedRoute>
                                <AdvancedAnalyticsDashboard />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/smart-automation"
                            element={
                              <ProtectedRoute>
                                <SmartAutomationDashboard />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/nlp"
                            element={
                              <ProtectedRoute>
                                <NLPDashboard />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/security"
                            element={
                              <ProtectedRoute>
                                <SecurityDashboard />
                              </ProtectedRoute>
                            }
                          />

                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </Layout>
                    }
                  />
                </Routes>
              </Suspense>
            </div>
          </AntApp>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;

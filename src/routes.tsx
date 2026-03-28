import { createBrowserRouter, Outlet } from "react-router";

// Common Screens
import SplashScreen from "./screens/common/SplashScreen";
import WelcomeScreen from "./screens/common/WelcomeScreen";
import LoginScreen from "./screens/common/LoginScreen";
import LoginErrorScreen from "./screens/common/LoginErrorScreen";
import ForgotPasswordScreen from "./screens/common/ForgotPasswordScreen";
import PasswordResetConfirmationScreen from "./screens/common/PasswordResetConfirmationScreen";
import SessionTimeoutScreen from "./screens/common/SessionTimeoutScreen";

// Technician Screens
import TechnicianDashboard from "./screens/technician/TechnicianDashboard";
import TechnicianProfile from "./screens/technician/TechnicianProfile";
import TechnicianSettings from "./screens/technician/TechnicianSettings";
import CreateTechnicianAccount from "./screens/technician/CreateTechnicianAccount";
import PatientRegistration from "./screens/technician/PatientRegistration";
import PatientRegistrationConfirmation from "./screens/technician/PatientRegistrationConfirmation";
import ScannerPreparation from "./screens/technician/ScannerPreparation";
import ScannerScreen from "./screens/technician/ScannerScreen";
import ScannerRetakeConfirmation from "./screens/technician/ScannerRetakeConfirmation";
import ScanQualityValidation from "./screens/technician/ScanQualityValidation";
import UploadToAI from "./screens/technician/UploadToAI";
import UploadProgress from "./screens/technician/UploadProgress";
import UploadSuccess from "./screens/technician/UploadSuccess";
import ScanHistoryList from "./screens/technician/ScanHistoryList";
import ScanHistoryDetail from "./screens/technician/ScanHistoryDetail";

// Doctor Screens
import DoctorDashboard from "./screens/doctor/DoctorDashboard";
import DoctorProfile from "./screens/doctor/DoctorProfile";
import DoctorSettings from "./screens/doctor/DoctorSettings";
import CreateDoctorAccount from "./screens/doctor/CreateDoctorAccount";
import NewCaseQueue from "./screens/doctor/NewCaseQueue";
import CaseDetail from "./screens/doctor/CaseDetail";
import CriticalAlerts from "./screens/doctor/CriticalAlerts";
import AIResultAnalysis from "./screens/doctor/AIResultAnalysis";
import AIHeatmapVisualization from "./screens/doctor/AIHeatmapVisualization";
import DiagnosisConfirmation from "./screens/doctor/DiagnosisConfirmation";
import DiagnosisModification from "./screens/doctor/DiagnosisModification";
import ReportGeneration from "./screens/doctor/ReportGeneration";
import ReportPreview from "./screens/doctor/ReportPreview";
import ReportDownloadShare from "./screens/doctor/ReportDownloadShare";
import PatientHistoryList from "./screens/doctor/PatientHistoryList";
import PatientHistoryDetail from "./screens/doctor/PatientHistoryDetail";
import FinalCaseClosure from "./screens/doctor/FinalCaseClosure";

// Root layout — simply renders the matched child route
function RootLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: SplashScreen },
      { path: "welcome", Component: WelcomeScreen },
      { path: "login", Component: LoginScreen },
      { path: "login-error", Component: LoginErrorScreen },
      { path: "forgot-password", Component: ForgotPasswordScreen },
      { path: "password-reset-confirmation", Component: PasswordResetConfirmationScreen },
      { path: "session-timeout", Component: SessionTimeoutScreen },

      // Technician Routes
      { path: "technician/dashboard", Component: TechnicianDashboard },
      { path: "technician/profile", Component: TechnicianProfile },
      { path: "technician/settings", Component: TechnicianSettings },
      { path: "technician/create-account", Component: CreateTechnicianAccount },
      { path: "technician/patient-registration", Component: PatientRegistration },
      { path: "technician/patient-registration-confirmation", Component: PatientRegistrationConfirmation },
      { path: "technician/scanner-preparation", Component: ScannerPreparation },
      { path: "technician/scanner", Component: ScannerScreen },
      { path: "technician/scanner-retake", Component: ScannerRetakeConfirmation },
      { path: "technician/scan-quality", Component: ScanQualityValidation },
      { path: "technician/upload-to-ai", Component: UploadToAI },
      { path: "technician/upload-progress", Component: UploadProgress },
      { path: "technician/upload-success", Component: UploadSuccess },
      { path: "technician/scan-history", Component: ScanHistoryList },
      { path: "technician/scan-history/:id", Component: ScanHistoryDetail },

      // Doctor Routes
      { path: "doctor/dashboard", Component: DoctorDashboard },
      { path: "doctor/profile", Component: DoctorProfile },
      { path: "doctor/settings", Component: DoctorSettings },
      { path: "doctor/create-account", Component: CreateDoctorAccount },
      { path: "doctor/new-cases", Component: NewCaseQueue },
      { path: "doctor/case/:id", Component: CaseDetail },
      { path: "doctor/critical-alerts", Component: CriticalAlerts },
      { path: "doctor/ai-analysis/:id", Component: AIResultAnalysis },
      { path: "doctor/ai-heatmap/:id", Component: AIHeatmapVisualization },
      { path: "doctor/diagnosis-confirmation/:id", Component: DiagnosisConfirmation },
      { path: "doctor/diagnosis-modification/:id", Component: DiagnosisModification },
      { path: "doctor/report-generation/:id", Component: ReportGeneration },
      { path: "doctor/report-preview/:id", Component: ReportPreview },
      { path: "doctor/report-download/:id", Component: ReportDownloadShare },
      { path: "doctor/patient-history", Component: PatientHistoryList },
      { path: "doctor/patient-history/:id", Component: PatientHistoryDetail },
      { path: "doctor/case-closure/:id", Component: FinalCaseClosure },

      { path: "*", Component: LoginScreen },
    ],
  },
]);

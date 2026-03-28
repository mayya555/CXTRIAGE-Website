# CXRT AI - AI-Assisted Chest X-Ray Triage System

A complete high-fidelity Android mobile application for managing chest X-ray diagnostics with AI assistance, featuring separate workflows for Technicians and Doctors.

## 🎯 Overview

CXRT AI is a hospital-grade mobile application built with React, TypeScript, and Tailwind CSS, designed for Android devices. It provides role-based access control with comprehensive workflows for both X-ray technicians and radiologists.

## 📱 Screen Navigation (All 50 Screens)

### Common Screens (1-7)
1. **Splash Screen** - `/` - App initialization with CXRT AI branding
2. **Welcome Screen** - `/welcome` - Feature overview and app introduction
3. **Login Screen** - `/login` - Role selection (Doctor/Technician) with credentials
4. **Login Error Screen** - `/login-error` - Error handling and validation messages
5. **Forgot Password Screen** - `/forgot-password` - Password recovery flow
6. **Password Reset Confirmation** - `/password-reset-confirmation` - Reset link sent confirmation
7. **Session Timeout Screen** - `/session-timeout` - Auto-logout security notification

### Technician Workflow (23-35)
23. **Technician Dashboard** - `/technician/dashboard` - Overview with quick stats
24. **Technician Profile** - `/technician/profile` - User settings and contact info
25. **Patient Registration** - `/technician/patient-registration` - Register new patient
26. **Patient Registration Confirmation** - `/technician/patient-registration-confirmation` - Registration success
27. **Scanner Preparation** - `/technician/scanner-preparation` - Pre-scan safety checklist
28. **Scanner Screen** - `/technician/scanner` - **Dark mode X-ray preview with immediate display**
29. **Scanner Retake Confirmation** - `/technician/scanner-retake` - Confirm retake decision
30. **Scan Quality Validation** - `/technician/scan-quality` - Automated quality metrics
31. **Upload & Send to AI** - `/technician/upload-to-ai` - Prepare for AI analysis
32. **Upload Progress** - `/technician/upload-progress` - Real-time upload tracking
33. **Upload Success** - `/technician/upload-success` - Confirmation with next steps
34. **Scan History List** - `/technician/scan-history` - View all scans with filters
35. **Scan History Detail** - `/technician/scan-history/:id` - **Processing Timeline feature**

### Doctor Workflow (36-50)
36. **Doctor Dashboard** - `/doctor/dashboard` - Case overview with performance metrics
37. **Doctor Profile** - `/doctor/profile` - Professional credentials and settings
38. **New Case Queue** - `/doctor/new-cases` - Pending cases sorted by priority
39. **Case Detail** - `/doctor/case/:id` - Comprehensive case information
40. **Critical Alerts** - `/doctor/critical-alerts` - High-priority cases requiring immediate attention
41. **AI Result Analysis** - `/doctor/ai-analysis/:id` - Detailed AI findings with confidence scores
42. **AI Heatmap Visualization** - `/doctor/ai-heatmap/:id` - **Dark mode with confidence legend (Red/Yellow/Green)**
43. **Diagnosis Confirmation** - `/doctor/diagnosis-confirmation/:id` - Agree or modify AI diagnosis
44. **Diagnosis Modification** - `/doctor/diagnosis-modification/:id` - Edit AI findings
45. **Report Generation** - `/doctor/report-generation/:id` - Automated report creation
46. **Report Preview** - `/doctor/report-preview/:id` - Full diagnostic report review
47. **Report Download/Share** - `/doctor/report-download/:id` - Export and distribution options
48. **Patient History List** - `/doctor/patient-history` - All patients with scan counts
49. **Patient History Detail** - `/doctor/patient-history/:id` - Complete patient timeline
50. **Final Case Closure** - `/doctor/case-closure/:id` - **Audit trail with closure workflow**

## 🎨 Design System

- **Primary Color**: #2563EB (Blue) - Used consistently across all screens
- **Theme**: Light theme with **dark-mode image viewers** for X-rays
- **Design Style**: Material Design 3, clean and professional
- **Icons**: Lucide React (all properly imported)
- **Typography**: System fonts with Tailwind CSS classes
- **Mobile-First**: Optimized for 428px width (standard Android device)

## 🔑 Key Features

### Advanced UX Enhancements (Mandatory)
1. ✅ **AI Confidence Heatmap Legend** - Red (High 80-100%), Yellow (Moderate 50-79%), Green (Low 0-49%)
2. ✅ **Processing Timeline** - Captured → Uploaded → AI Started → Completed
3. ✅ **Role-Specific Bottom Navigation** - Different nav bars for Technician vs Doctor
4. ✅ **Dark-Mode Image Viewers** - Black background for X-ray viewing (Screens 28, 42)
5. ✅ **Audit Trail Status Badges** - Success/Failed/Critical indicators

### Core Scanner Requirement
- **Screen 28 (Scanner Screen)**: X-ray image displays immediately after capture
- **Purpose**: Visual verification of scan quality, clarity, and alignment
- **NO diagnosis shown** - Technicians never see AI results

### Role-Based Access Control
- **Technicians**: Patient registration, scanning, upload to AI, history tracking
- **Doctors**: AI analysis, diagnosis, report generation, patient history
- **Strict Separation**: Technicians cannot view diagnosis or AI results

## 🚀 Getting Started

1. **Login Flow**:
   - Start at `/` (Splash) → Automatically redirects to `/welcome`
   - Click "Get Started" → Navigate to `/login`
   - Select role (Doctor or Technician)
   - Enter credentials (no real auth required)
   - Redirects to respective dashboard

2. **Technician Workflow**:
   ```
   Dashboard → Patient Registration → Scanner Prep → Scanner → 
   Quality Check → Upload to AI → Success → History
   ```

3. **Doctor Workflow**:
   ```
   Dashboard → New Cases/Critical Alerts → Case Detail → 
   AI Analysis → Heatmap → Diagnosis → Report → Closure
   ```

## 📊 Navigation Structure

### Bottom Navigation (Technician)
- Home (Dashboard)
- History (Scan History)
- Settings
- Profile

### Bottom Navigation (Doctor)
- Home (Dashboard)
- Alerts (Critical Cases)
- Cases (New Case Queue)
- Profile

## 🎯 Technology Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v7 (Data mode)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build**: Vite
- **State**: React Hooks (useState, useEffect)
- **Navigation**: React Router hooks (useNavigate, useParams, useLocation)

## 📱 Mobile Layout

All screens use the `MobileLayout` component which:
- Centers content on larger screens
- Maintains 428px max width
- Provides consistent mobile viewport
- Handles overflow and scrolling

## 🎨 Component Library

### Reusable Components
- `MobileLayout` - Container for all screens
- `MobileHeader` - Top navigation with back button
- `BottomNavTechnician` - Technician navigation bar
- `BottomNavDoctor` - Doctor navigation bar

## 🔒 Security & Compliance

- Session timeout after inactivity
- Audit trail for all actions
- HIPAA-compliant design
- No real authentication (as requested)
- Secure data handling patterns

## 🎭 Mock Data

All screens use realistic mock data including:
- Patient information
- Scan results
- AI confidence scores
- Diagnosis findings
- Processing timelines

## 📝 Screen Index Reference

| # | Screen Name | Route | Role |
|---|-------------|-------|------|
| 1 | Splash Screen | / | All |
| 2 | Welcome Screen | /welcome | All |
| 3 | Login Screen | /login | All |
| 4 | Login Error | /login-error | All |
| 5 | Forgot Password | /forgot-password | All |
| 6 | Password Reset Confirmation | /password-reset-confirmation | All |
| 7 | Session Timeout | /session-timeout | All |
| 23 | Technician Dashboard | /technician/dashboard | Tech |
| 24 | Technician Profile | /technician/profile | Tech |
| 25 | Patient Registration | /technician/patient-registration | Tech |
| 26 | Registration Confirmation | /technician/patient-registration-confirmation | Tech |
| 27 | Scanner Preparation | /technician/scanner-preparation | Tech |
| 28 | Scanner Screen | /technician/scanner | Tech |
| 29 | Retake Confirmation | /technician/scanner-retake | Tech |
| 30 | Quality Validation | /technician/scan-quality | Tech |
| 31 | Upload to AI | /technician/upload-to-ai | Tech |
| 32 | Upload Progress | /technician/upload-progress | Tech |
| 33 | Upload Success | /technician/upload-success | Tech |
| 34 | Scan History List | /technician/scan-history | Tech |
| 35 | Scan History Detail | /technician/scan-history/:id | Tech |
| 36 | Doctor Dashboard | /doctor/dashboard | Doctor |
| 37 | Doctor Profile | /doctor/profile | Doctor |
| 38 | New Case Queue | /doctor/new-cases | Doctor |
| 39 | Case Detail | /doctor/case/:id | Doctor |
| 40 | Critical Alerts | /doctor/critical-alerts | Doctor |
| 41 | AI Analysis | /doctor/ai-analysis/:id | Doctor |
| 42 | AI Heatmap | /doctor/ai-heatmap/:id | Doctor |
| 43 | Diagnosis Confirmation | /doctor/diagnosis-confirmation/:id | Doctor |
| 44 | Diagnosis Modification | /doctor/diagnosis-modification/:id | Doctor |
| 45 | Report Generation | /doctor/report-generation/:id | Doctor |
| 46 | Report Preview | /doctor/report-preview/:id | Doctor |
| 47 | Report Download | /doctor/report-download/:id | Doctor |
| 48 | Patient History List | /doctor/patient-history | Doctor |
| 49 | Patient History Detail | /doctor/patient-history/:id | Doctor |
| 50 | Case Closure | /doctor/case-closure/:id | Doctor |

## 🎯 Special Features Implemented

1. **Immediate X-ray Preview** (Screen 28): Simulated chest X-ray displays immediately after capture
2. **Processing Timeline** (Screen 35): Visual timeline with status indicators
3. **AI Heatmap with Legend** (Screen 42): Color-coded confidence visualization
4. **Audit Trail Badges** (Screen 50): Success/Failed/Critical status indicators
5. **Dark Mode Viewers**: Black background for medical image viewing
6. **Role-Specific Navigation**: Different bottom nav for each user type

## 🏥 Medical Workflow Compliance

- Technicians handle capture and quality, never see diagnosis
- Doctors review AI results but make final diagnosis
- Complete audit trail throughout process
- HIPAA-compliant design patterns
- Secure session management

---

**Built with care for medical professionals** 🏥

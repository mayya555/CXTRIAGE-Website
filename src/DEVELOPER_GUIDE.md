# CXRT AI Web Application - Developer Guide

## Quick Start

### Running the Application
The application is a React-based web app that starts on Screen 1 (Splash Screen).

### Navigation Flow
1. **Splash Screen** (Screen 1) → Click anywhere
2. **Welcome Screen** (Screen 2) → Click "Get Started"
3. **Login Screen** (Screen 3) → Select role and login
4. **Dashboard** → Based on selected role:
   - **Doctor** → Screen 36 (Doctor Dashboard)
   - **Technician** → Screen 23 (Technician Dashboard)  
   - **Admin** → Screen 8 (Admin Dashboard)

## Creating New Web Screens

### Using WebLayout (Recommended for new screens)

```tsx
import { WebLayout } from '../components/layout/WebLayout';

const MyNewScreen = ({ screenId, navigate, setRole }: any) => {
  return (
    <WebLayout
      title="My New Screen"
      role="doctor" // or "technician" or "admin"
      currentScreen={screenId}
      onNavigate={navigate}
      onLogout={() => { setRole(null); navigate(3); }}
      showBack={true} // Optional - adds back button
      onBack={() => navigate(36)} // Optional - back navigation
    >
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Your content here */}
      </div>
    </WebLayout>
  );
};
```

### Using MobileFrame (Legacy - now responsive)

```tsx
import { MobileFrame } from '../components/layout/MobileFrame';

const MyScreen = ({ navigate }: any) => {
  return (
    <MobileFrame 
      title="My Screen"
      showBack={true}
      onBack={() => navigate(previousScreen)}
      role="doctor"
    >
      <div className="p-6">
        {/* Your content here */}
      </div>
    </MobileFrame>
  );
};
```

## Responsive Design Patterns

### Grid Layouts

#### Stats Cards (1→2→4 columns)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
  <div className="bg-white rounded-xl shadow-sm border p-6">
    {/* Card content */}
  </div>
</div>
```

#### Action Cards (2→4 columns)
```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <button className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 h-40">
    {/* Button content */}
  </button>
</div>
```

#### List Items (1→2 columns)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  <div className="bg-white rounded-xl p-5 shadow-sm">
    {/* Item content */}
  </div>
</div>
```

### Spacing Guidelines

```tsx
// Container padding
<div className="p-6 lg:p-8">          // Content padding

// Max width container
<div className="max-w-7xl mx-auto">    // Desktop max width

// Section spacing
<div className="space-y-6">            // Vertical spacing between sections

// Card spacing
<div className="gap-4 lg:gap-6">      // Responsive gap in grids
```

### Color Scheme

```tsx
// Primary Blue (Main brand color)
className="bg-[#2563EB]"              // Background
className="text-[#2563EB]"            // Text
className="border-[#2563EB]"          // Border

// Hover states
className="hover:bg-[#1d4ed8]"        // Darker blue hover

// Gradients
className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8]"

// Status colors
className="bg-red-100 text-red-700"   // Critical
className="bg-orange-100 text-orange-700" // Urgent
className="bg-green-100 text-green-700"   // Success
className="bg-blue-100 text-blue-700"     // Info
```

## Component Library

### Cards
```tsx
// Simple card
<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
  {/* Content */}
</div>

// Hover effect card
<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 
                hover:shadow-md transition-shadow">
  {/* Content */}
</div>

// Gradient card
<div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
  {/* Content */}
</div>
```

### Buttons
```tsx
// Primary button
<button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-xl 
                   font-semibold transition-all hover:scale-105">
  Click Me
</button>

// Secondary button
<button className="bg-white hover:bg-slate-50 text-slate-900 px-6 py-3 rounded-xl 
                   border border-slate-200 font-semibold transition-all">
  Click Me
</button>

// Icon button
<button className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors">
  <Settings className="w-5 h-5" />
</button>
```

### Stats Card Pattern
```tsx
<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 
                hover:shadow-md transition-shadow">
  <div className="flex items-center justify-between mb-3">
    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
      <Activity className="w-6 h-6 text-[#2563EB]" />
    </div>
    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
      LABEL
    </span>
  </div>
  <p className="text-3xl font-bold text-slate-900 mb-1">24</p>
  <p className="text-sm text-slate-600">Description</p>
</div>
```

### Action Card Pattern
```tsx
<button className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-xl p-6 
                   shadow-md hover:shadow-lg transition-all hover:scale-105 group h-40">
  <div className="flex flex-col items-start gap-3 text-white h-full">
    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center 
                    group-hover:scale-110 transition-transform">
      <Brain className="w-7 h-7" />
    </div>
    <div className="mt-auto">
      <div className="font-bold text-lg">Title</div>
      <div className="text-sm text-blue-100">Subtitle</div>
    </div>
  </div>
</button>
```

## Icons
Using `lucide-react` for all icons:

```tsx
import { 
  Activity, Users, Settings, FileText, 
  Brain, Shield, Lock, AlertTriangle, 
  CheckCircle, Clock, Upload, Download 
} from 'lucide-react';

// Usage
<Activity className="w-6 h-6 text-blue-600" />
<Users className="w-5 h-5" />
```

## Screen Registration

### Adding a New Screen

1. **Choose the appropriate file**:
   - `/screens/DoctorScreens.tsx` - For doctor-related screens
   - `/screens/TechnicianScreens.tsx` - For technician screens
   - `/screens/AdminScreens.tsx` - For admin screens
   - `/screens/CommonScreens.tsx` - For shared/auth screens

2. **Add a new case in the switch statement**:
```tsx
case 99: // My New Screen
  return (
    <WebLayout title="My Screen" role="doctor" currentScreen={screenId} 
               onNavigate={navigate} onLogout={() => { setRole(null); navigate(3); }}>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Content */}
      </div>
    </WebLayout>
  );
```

3. **Update App.tsx routing** (if needed):
```tsx
// In App.tsx, update the renderScreen function
if (currentScreen === 99) {
  return <DoctorScreens screenId={currentScreen} navigate={navigate} setRole={setRole} />;
}
```

## Navigation

### Navigate to another screen
```tsx
navigate(36); // Go to Doctor Dashboard
navigate(23); // Go to Technician Dashboard
navigate(3);  // Go to Login
```

### Set user role
```tsx
setRole('doctor');      // Set as doctor
setRole('technician');  // Set as technician
setRole('admin');       // Set as admin
setRole(null);          // Logout
```

## State Management

### Local state for screens
```tsx
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);

// Use state as needed
```

### Global state (via props)
```tsx
export const MyScreen = ({ screenId, navigate, setRole }: any) => {
  // screenId - current screen number
  // navigate - function to change screens
  // setRole - function to set user role
}
```

## Toast Notifications

```tsx
import { toast } from 'sonner@2.0.3';

// Success
toast.success("Operation successful!");

// Error
toast.error("Something went wrong");

// Info
toast.info("Please note...");

// Loading
toast.loading("Processing...");
```

## Best Practices

### 1. Responsive Design
- Always use responsive classes: `md:`, `lg:`, `xl:`
- Mobile-first approach: base styles are mobile, then add larger breakpoints
- Test on multiple screen sizes

### 2. Accessibility
- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation works
- Maintain good color contrast

### 3. Performance
- Use Tailwind's utility classes (no custom CSS when possible)
- Lazy load images if needed
- Minimize re-renders with proper React patterns

### 4. Consistency
- Follow the established color scheme (#2563EB)
- Use standard spacing (p-6, gap-4, etc.)
- Maintain consistent card and button styles

### 5. Code Organization
- Keep components focused and small
- Extract reusable patterns into components
- Comment complex logic
- Use meaningful variable names

## Common Pitfalls

### ❌ Don't
```tsx
// Don't use fixed mobile widths
<div className="w-[400px]">

// Don't use inline styles
<div style={{ color: 'blue' }}>

// Don't forget responsive classes
<div className="grid grid-cols-4">  // Will be 4 cols on mobile!
```

### ✅ Do
```tsx
// Use responsive widths
<div className="w-full max-w-7xl mx-auto">

// Use Tailwind classes
<div className="text-blue-600">

// Use responsive grids
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

## Testing Checklist

- [ ] Screen works on mobile (< 768px)
- [ ] Screen works on tablet (768px - 1024px)
- [ ] Screen works on desktop (> 1024px)
- [ ] Navigation works correctly
- [ ] Back button functions (if applicable)
- [ ] Logout works
- [ ] All icons load correctly
- [ ] Colors match the theme
- [ ] Spacing looks consistent
- [ ] Hover effects work on desktop
- [ ] Touch targets are appropriate on mobile

## Support

For questions or issues, refer to:
- `WEB_TRANSFORMATION_SUMMARY.md` - Overview of the web transformation
- Component files in `/components/layout/` - Layout components
- Screen files in `/screens/` - All screen implementations

---

**Happy Coding! 🚀**

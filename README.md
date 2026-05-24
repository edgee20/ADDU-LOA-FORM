# ADDU-LOA-FORM

Ateneo de Davao University Leave of Absence (LOA) Application

A modern, accessible Leave of Absence management system built with React, featuring a student submission form and a comprehensive admin dashboard for multi-stage approval workflows.

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)
- [Development](#development)

---

## Features

### Student Side
- ✅ Multi-step LOA submission form
- ✅ File upload support for supporting documents
- ✅ Form validation and error handling
- ✅ Responsive mobile-friendly design

### Admin Dashboard
- ✅ View all LOA submissions in a filterable table
- ✅ Advanced filtering: status, department, course, date range
- ✅ Real-time search by name/email
- ✅ Pagination for large datasets
- ✅ Detailed submission review page

### Approval Workflow
- ✅ 4-stage sequential approval process:
  1. Department Chair
  2. Assistant Dean
  3. Dean
  4. Registrar
- ✅ Visual progress bar showing approval stages
- ✅ Current approver identification
- ✅ Approve/Reject actions with confirmation dialogs
- ✅ Department-specific approver assignments

### User Interface
- ✅ Clean, branded design with Ateneo colors
- ✅ Fully accessible (WCAG compliant)
- ✅ Mobile-responsive layout
- ✅ Loading and error states
- ✅ Toast notifications (Sonner)

---

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone repository:
```bash
git clone <repository-url>
cd ADDU-LOA-FORM
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env.local
# Edit .env.local and set VITE_APP_API_URL
```

4. Start development server:
```bash
npm run dev
```

5. Open browser:
```
http://localhost:5173
```

---

## Project Structure

```
ADDU-LOA-FORM/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/             # shadcn UI primitives
│   │   ├── ConfirmationDialog.jsx
│   │   ├── DropDown.jsx
│   │   ├── Inputs.jsx
│   │   └── ...
│   ├── hooks/               # Custom React hooks
│   │   ├── useLoaApi.js     # API integration hooks
│   │   └── use-mobile.js
│   ├── lib/                 # Utility functions
│   │   ├── api.js           # Backend API client
│   │   ├── approvers.js     # Department/approver mapping
│   │   └── utils.js
│   ├── layouts/             # Page layouts
│   ├── pages/               # Full pages/routes
│   │   ├── AdminDashboard.jsx   # Admin submission list
│   │   ├── AdminReview.jsx      # Single submission review
│   │   ├── LoaForms.jsx         # Student submission form
│   │   └── ...
│   ├── App.jsx              # Main app & routes
│   └── index.css            # Global styles
├── BACKEND_INTEGRATION.md   # API contract documentation
├── FRONTEND_SETUP.md        # Frontend setup guide
├── package.json
└── vite.config.js
```

---

## Documentation

### For Developers

- **[FRONTEND_SETUP.md](FRONTEND_SETUP.md)** - Complete frontend setup and usage guide
- **[BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)** - API contract and integration requirements

### Key Files

- **src/lib/api.js** - Backend API functions and endpoints
- **src/hooks/useLoaApi.js** - React hooks for API integration
- **src/lib/approvers.js** - Department and approver management
- **src/pages/AdminDashboard.jsx** - Admin submission list page
- **src/pages/AdminReview.jsx** - Submission review and approval page

---

## Tech Stack

### Frontend Framework
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Accessible component library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Date & Time
- **date-fns** - Date parsing and formatting

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run linter with fix
npm run lint:fix
```

### Environment Variables

Create `.env.local`:

```bash
# Backend API URL
VITE_APP_API_URL=http://localhost:3000/api

# Debug mode (optional)
VITE_DEBUG=false
```

### API Integration

The frontend is fully prepared for backend integration:

1. **API Layer** (`src/lib/api.js`):
   - All API calls centralized
   - Error handling built-in
   - Easy to update endpoints

2. **Custom Hooks** (`src/hooks/useLoaApi.js`):
   - React hooks wrapping API calls
   - Loading and error states included
   - Clean component integration

3. **Backend Contract** (`BACKEND_INTEGRATION.md`):
   - Complete API specification
   - Expected request/response formats
   - Error handling guidelines

### Backend Requirements

See [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) for:
- Required API endpoints
- Data structures and field mappings
- Validation rules
- Workflow logic
- Error responses

---

## Department & Approver System

The system uses a predefined department-to-approver mapping for the approval workflow.

### Departments

1. School of Arts and Sciences (SAS)
2. School of Business and Governance (SBG)
3. School of Engineering and Architecture (SEA)
4. School of Education (SOE)
5. School of Nursing (SON)
6. College of Law

### Approval Stages

Each department has 4 required approvers:

| Stage | Role | Notes |
|-------|------|-------|
| 1 | Department Chair | First to review |
| 2 | Assistant Dean | Second level |
| 3 | Dean | Third level |
| 4 | Registrar | Final approval |

To update approvers, edit `src/lib/approvers.js`.

---

## Admin Dashboard

**Route:** `/admin`

### Features

- **Search** - By student name or email
- **Filters** - Status, department, course, date range
- **Pagination** - Navigate through submissions
- **Row Actions** - Click to view details

### Connected To

- API: `GET /loa-submissions` with filters
- Data: `submissions`, `total`, `page`

---

## Submission Review

**Route:** `/admin/:id`

### Features

- **Approval Stepper** - Shows 4 approval stages
- **Current Approver** - Highlighted in info box
- **Read-only Form** - Displays student data
- **Approve/Reject** - With confirmation dialogs
- **Error Handling** - Shows issues on page

### Connected To

- API: `GET /loa-submissions/:id`
- API: `POST /loa-submissions/:id/approve`
- API: `POST /loa-submissions/:id/reject`

---

## Deployment

### Build for Production

```bash
npm run build
```

Generates optimized build in `dist/` directory.

### Hosting Options

- **Vercel** (recommended for React)
- **Netlify**
- **AWS S3 + CloudFront**
- **Traditional web server** (copy `dist/` contents)

### Production Environment Variables

Set on your hosting platform:

```bash
VITE_APP_API_URL=https://api.your-domain.com/api
VITE_DEBUG=false
```

---

## Testing

### Manual Testing Checklist

- [ ] Dashboard loads submissions
- [ ] Filters work correctly
- [ ] Search finds submissions
- [ ] Pagination works
- [ ] Click submission opens detail page
- [ ] Approval button calls backend
- [ ] Rejection button calls backend
- [ ] Loading states show during API calls
- [ ] Error messages display on failure
- [ ] Stepper shows correct stages
- [ ] Mobile layout is responsive

### Integration Testing

See [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) for API testing guidance.

---

## Troubleshooting

### Common Issues

**Blank dashboard with loading spinner**
- Check `VITE_APP_API_URL` is set correctly
- Verify backend is running
- Check browser console for network errors

**"Cannot read property 'map' of undefined"**
- API response format doesn't match expected structure
- Check backend returns `submissions` array
- Verify field names match api.js

**Filters not working**
- Verify filter parameter names match backend
- Check backend query parameter handling
- Console log API request to verify parameters

**CORS error in browser**
- Backend needs CORS headers enabled
- Whitelist frontend origin
- Allow Content-Type: application/json

---

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Create pull request

---

## Support

For questions or issues:

1. Check [FRONTEND_SETUP.md](FRONTEND_SETUP.md)
2. Review [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)
3. Check browser console for errors
4. Review component source code

---

## License

[Your License Here]

---

## Contact

For questions about this project, contact the development team.

---

## Changelog

### v1.0.0 (Current)

- ✅ Admin dashboard with filtering and search
- ✅ Submission review and approval workflow
- ✅ 4-stage approval process
- ✅ Department/approver management
- ✅ Mobile-responsive design
- ✅ Backend integration ready
- ✅ Comprehensive documentation

# qMechanic Marketing & Sales Website Brief

This document provides comprehensive product information to inform the development of a marketing website for qMechanic.

---

## Product Identity

**Product Name:** qMechanic
**Tagline:** Modern Fleet Management. Paper-Free Operations.
**Domain:** qmechanic.autos
**Category:** SaaS / Fleet Management / Workshop Management Software

---

## Elevator Pitch

qMechanic is a cloud-native platform that transforms how fleet maintenance operations work. Technicians complete jobs on mobile phones with full visibility and offline capability. Managers get real-time insights through a web dashboard. And intelligent automation eliminates manual data entry—especially for parts invoicing. Perfect for fleet operators, repair shops, and maintenance facilities ready to go digital.

---

## Target Audience

### Primary Markets

| Segment | Description | Size |
|---------|-------------|------|
| Fleet Operators | Transportation, logistics, haulage companies | 5-500 vehicles |
| Commercial Workshops | Independent repair shops and service centers | 2-50 technicians |
| Equipment Rental | Companies with maintenance obligations | Mixed fleets |
| Public Sector | Municipal fleets, transit authorities | Large fleets |
| Construction/Plant | Heavy equipment maintenance | Specialized vehicles |

### Buyer Personas

**1. Fleet Manager / Operations Director**
- Pain: No visibility into vehicle maintenance status, reactive repairs
- Goal: Reduce downtime, control costs, ensure compliance
- Decision driver: ROI, compliance tracking, reporting

**2. Workshop Owner / Service Manager**
- Pain: Paper job cards, lost invoices, manual stock tracking
- Goal: Streamline operations, accurate billing, inventory control
- Decision driver: Time savings, ease of use, mobile capability

**3. Transport Compliance Officer**
- Pain: Tracking MOTs, insurance, safety certifications manually
- Goal: Never miss a compliance deadline
- Decision driver: Event tracking, automated reminders, audit trail

---

## The Problem We Solve

### Current State (Without qMechanic)

| Problem | Impact |
|---------|--------|
| Paper job cards | Lost records, illegible handwriting, no searchability |
| Spreadsheet parts tracking | Stock discrepancies, ordering errors, no audit trail |
| Manual invoice processing | Hours of data entry, transcription errors |
| Disconnected field teams | Technicians return to office to log work |
| Reactive maintenance | Unexpected breakdowns, costly emergency repairs |
| Compliance tracking in calendars | Missed MOTs, expired insurance, regulatory fines |
| No labor visibility | Inaccurate billing, timesheet disputes |

### Future State (With qMechanic)

| Solution | Benefit |
|----------|---------|
| Digital job cards | Complete history, searchable, always accessible |
| Real-time inventory | Accurate stock, automated reordering triggers |
| AI invoice parsing | Seconds instead of hours, zero transcription errors |
| Mobile-first workflows | Work logged in real-time from the field |
| Preventive maintenance | Scheduled inspections, predictable maintenance |
| Automated event tracking | Alerts before expiry, full compliance visibility |
| Integrated timesheets | Accurate hours, streamlined approvals |

---

## Core Features

### 1. Digital Job Cards

Replace paper work orders with a complete digital workflow.

- Create jobs with customer, vehicle, and priority details
- Assign to technicians with instant mobile notification
- Track status: Created → In Progress → Completed → Closed
- Log labour hours with clock-in/clock-out
- Add parts from inventory with automatic stock deduction
- Attach photos, documents, and notes
- Generate invoices with VAT calculations
- Complete audit trail of all changes

**Key Stat:** Average time savings of 45 minutes per job card vs. paper

### 2. Vehicle & Fleet Management

Complete visibility across your entire fleet.

- Comprehensive vehicle database (make, model, VIN, registration)
- Fleet numbering and organizational grouping
- Odometer and service history tracking
- Owner and operator assignment
- Associated defects, inspections, and job history
- Custom fields for your specific needs

**Key Stat:** Single source of truth for all vehicle information

### 3. Inspection & Preventive Maintenance

Move from reactive repairs to scheduled maintenance.

- Create reusable inspection templates with action items
- Set recurring schedules (daily, weekly, monthly, custom)
- Execute inspections on mobile with photo capture
- Failed items automatically create defects and job cards
- Digital sign-off with timestamp
- Email reports to stakeholders
- Third-party inspection management for external auditors

**Key Stat:** Reduce unexpected breakdowns by up to 60%

### 4. Parts & Inventory Management

Never run out of critical parts again.

- Complete parts catalog with SKU/part numbers
- Real-time stock level tracking
- Supplier and pricing information
- Cost and sale price management
- Low-stock alerts on dashboard
- Full audit trail of stock changes
- Integration with job cards for automatic deductions

**Key Stat:** Reduce stock discrepancies to near zero

### 5. AI-Powered Invoice Processing

Eliminate hours of manual data entry.

- Upload supplier invoices (PDF, JPG, PNG)
- Azure AI extracts line items automatically
- Intelligent matching to your parts catalog
- Preview changes before committing
- Automatic stock level updates
- Duplicate invoice detection
- Complete processing history

**Key Stat:** Process invoices in seconds, not hours

### 6. Vehicle Event & Compliance Tracking

Never miss a compliance deadline again.

- Track MOTs, insurance, tax, safety certificates
- Set expiry dates with configurable reminder periods
- Automated alert notifications before expiry
- Renewal tracking linked to original events
- Cost and provider documentation
- Status management (Active, Expired, Renewed)
- Compliance dashboard overview

**Key Stat:** 100% compliance visibility across your fleet

### 7. Labour & Timesheet Management

Accurate hours, simplified payroll.

- Clock-in/clock-out with automatic hour calculation
- Labour entries linked to specific jobs
- Weekly timesheet submission workflow
- Manager approval process
- Regular vs. overtime tracking
- Custom labour rates per technician
- Export for payroll integration

**Key Stat:** Eliminate timesheet disputes with digital records

### 8. Reporting & Analytics

Data-driven decisions for your operation.

- Job reports by type, date, vehicle, technician
- Defect trending and resolution rates
- Inspection completion metrics
- Cost analysis (labour, parts, total)
- Vehicle maintenance history
- Productivity reports by technician
- CSV export for further analysis

**Key Stat:** Actionable insights at your fingertips

### 9. Team Communication

Keep everyone connected.

- Broadcast messages to specific roles
- Priority levels (Low, Medium, High, Urgent)
- Delivery confirmation tracking
- Message history and archive
- Role-based targeting

---

## Platform Architecture

### Multi-Platform Access

| Platform | Technology | Purpose |
|----------|------------|---------|
| Admin Portal | React PWA | Management, reporting, configuration |
| Mobile App | React Native (iOS & Android) | Field operations, inspections, job logging |
| API | REST/JSON | Integrations, automation |

### Progressive Web App Benefits

- Works offline, syncs when connected
- Install to home screen like native app
- Automatic updates, no app store delays
- Works on desktop, tablet, and mobile
- No downloads required to get started

### Mobile App Capabilities

- Complete inspection workflows with photo capture
- Job card viewing and updates
- Defect logging in real-time
- Clock-in/clock-out labor tracking
- Timesheet management
- Push notifications for assignments
- Works offline in areas with poor connectivity

---

## Deployment Model

### Multi-Tenant SaaS

Each organization receives:
- **Dedicated API**: `{company}.api.qmechanic.autos`
- **Dedicated Admin Portal**: `{company}.app.qmechanic.autos`
- **Isolated Database**: Complete data separation
- **Custom Branding**: Your company identity

### Instant Provisioning

- New instances deployed in minutes
- No IT infrastructure required
- Automatic SSL certificates
- Cloudflare CDN for performance
- 99.9% uptime SLA

---

## Pricing Structure

### Per-Seat Licensing

Flexible pricing based on your team structure:

| User Type | Description | Typical Cost |
|-----------|-------------|--------------|
| Admin | Full access, configuration, reporting | $99/month |
| Technician | Job cards, inspections, labour logging | $49/month |
| Driver | View-only, defect reporting, timesheets | $29/month |

### Add-On Modules

| Add-On | Description | Cost |
|--------|-------------|------|
| AI Invoice Processing | Automated parts invoice scanning | $49/month |
| Advanced Reporting | Extended analytics and exports | $49/month |
| API Access | Custom integrations | $99/month |

### Example Pricing

**Small Workshop (5 users)**
- 1 Admin + 3 Technicians + 1 Driver
- = $99 + $147 + $29 = **$275/month**

**Medium Fleet (15 users)**
- 2 Admins + 8 Technicians + 5 Drivers
- = $198 + $392 + $145 = **$735/month**

*Custom enterprise pricing available for 50+ users*

---

## Competitive Positioning

### Why Choose qMechanic?

| Feature | qMechanic | Traditional Software | Spreadsheets |
|---------|-----------|---------------------|--------------|
| Mobile-first | Native iOS & Android | Limited or none | None |
| Offline capability | Full offline mode | Rare | N/A |
| AI invoice processing | Built-in | Add-on or none | Manual |
| Multi-tenant SaaS | Instant deployment | On-premise install | N/A |
| Modern UX | 2024 design standards | Legacy interfaces | Basic |
| Pricing | Per-seat, transparent | Per-site license | Free but costly |

### Key Differentiators

1. **AI-Powered Automation** — Azure Document Intelligence eliminates invoice data entry
2. **True Mobile-First** — Built for technicians working in the field, not adapted from desktop
3. **Offline Capability** — Works in workshops with poor connectivity
4. **Modern Architecture** — Cloud-native, auto-scaling, always up-to-date
5. **Rapid Deployment** — Go live in days, not months
6. **Transparent Pricing** — Pay for what you use, scale as you grow

---

## Customer Success Metrics

### Typical Results After 6 Months

| Metric | Improvement |
|--------|-------------|
| Time per job card | -45 minutes |
| Invoice processing time | -90% |
| Compliance incidents | -95% |
| Stock discrepancies | -80% |
| Unexpected breakdowns | -60% |
| Admin overhead | -50% |

### ROI Calculator Inputs

For the website, include an ROI calculator with these inputs:
- Number of technicians
- Average job cards per week
- Hours spent on paperwork per week
- Hours spent processing invoices per month
- Average cost of unplanned breakdown

---

## Social Proof Elements

### Testimonial Themes (for placeholder content)

> "We eliminated paper job cards completely. Our technicians love the mobile app."
> — Workshop Manager

> "The AI invoice processing alone saves us 10 hours a week."
> — Parts Manager

> "We haven't missed an MOT deadline since switching to qMechanic."
> — Compliance Officer

> "Setup took two days. We were live by the end of the week."
> — Fleet Director

### Trust Signals

- GDPR compliant data handling
- ISO 27001 aligned security practices
- 99.9% uptime SLA
- Daily encrypted backups
- SOC 2 Type II (in progress)
- UK/EU data residency options

---

## Website Structure Recommendation

### Pages

1. **Home**
   - Hero with tagline and primary CTA
   - Problem/solution overview
   - Feature highlights (icons + brief descriptions)
   - Social proof (testimonials, logos)
   - Pricing teaser with link
   - Final CTA

2. **Features**
   - Detailed feature pages (one per major feature)
   - Screenshots/mockups of each feature
   - Use cases and benefits
   - Related features

3. **Pricing**
   - Per-seat pricing table
   - Add-on modules
   - Example configurations
   - FAQ about billing
   - CTA to start trial

4. **Industries**
   - Fleet Operators page
   - Workshops page
   - Equipment Rental page
   - Public Sector page
   - (each with tailored messaging)

5. **Resources**
   - Blog (for SEO)
   - Help documentation links
   - Video demos
   - Case studies (when available)

6. **Company**
   - About us
   - Contact
   - Careers (if applicable)

7. **Legal**
   - Privacy policy
   - Terms of service
   - Cookie policy

### Primary CTAs

- "Start Free Trial" (14-day trial, no credit card)
- "Book a Demo" (for enterprise/complex needs)
- "See Pricing" (secondary)

---

## Design Direction

### Brand Personality

- **Professional** — B2B SaaS, not consumer
- **Modern** — Clean, minimal, current design trends
- **Trustworthy** — Reliable, secure, established
- **Practical** — No-nonsense, focused on outcomes

### Visual Style

- Clean, minimal layouts with ample whitespace
- Dark mode option for technical audience
- Blue/slate primary palette (trust, professionalism)
- Accent color for CTAs (orange or green for contrast)
- Iconography: Lucide, Heroicons, or similar clean icon set
- Photography: Real workshop/fleet environments (not stock office photos)

### Typography

- Sans-serif headings (Inter, Plus Jakarta Sans, or similar)
- Readable body text (16px base)
- Clear hierarchy

### UI Components

- Feature cards with icons
- Pricing tables
- Testimonial cards
- Screenshot galleries
- FAQ accordions
- ROI calculator widget
- Demo video embeds

---

## Technical Requirements

### Performance

- Target: 90+ Lighthouse score
- Lazy load images and below-fold content
- Optimize for mobile-first indexing

### SEO

- Target keywords:
  - "fleet management software"
  - "workshop management system"
  - "digital job cards"
  - "vehicle inspection software"
  - "fleet maintenance software"
  - "mechanic shop software"
- Meta descriptions for all pages
- Structured data (Organization, Product, FAQ)

### Analytics

- Google Analytics 4
- Conversion tracking for:
  - Trial signups
  - Demo requests
  - Pricing page views
- Heatmaps (Hotjar or similar)

### Integrations

- Contact form → CRM (HubSpot, Pipedrive, etc.)
- Trial signup → Gatekeeper API
- Chat widget (Intercom, Crisp, or similar)

---

## Content Assets Needed

### Copy

- [ ] Homepage hero copy
- [ ] Feature descriptions (8 features × 200 words each)
- [ ] Industry pages (4 pages × 500 words each)
- [ ] Pricing FAQ (10-15 questions)
- [ ] About us page
- [ ] Privacy policy / Terms of service

### Visual Assets

- [ ] Product screenshots (admin portal, mobile app)
- [ ] Feature illustrations/icons
- [ ] Hero image or illustration
- [ ] Team photos (if applicable)
- [ ] Customer logos (when available)

### Video

- [ ] Product demo video (2-3 minutes)
- [ ] Feature highlight clips (30-60 seconds each)

---

## Launch Checklist

- [ ] All pages complete with final copy
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Forms connected to backend/CRM
- [ ] Analytics implemented
- [ ] SEO meta tags complete
- [ ] SSL certificate active
- [ ] Performance optimized (90+ Lighthouse)
- [ ] Legal pages reviewed
- [ ] 404 page designed
- [ ] Favicon and social sharing images

---

## Summary

qMechanic is a modern, mobile-first fleet management platform that replaces paper job cards, manual inventory tracking, and spreadsheet-based compliance management with an integrated digital ecosystem. The website should communicate professionalism, modern technology, and tangible ROI to fleet managers, workshop owners, and compliance officers looking to digitize their operations.

**Key Messages:**

1. Replace paper with digital workflows
2. AI-powered automation saves hours
3. Mobile-first for field operations
4. Complete visibility and compliance
5. Go live in days, not months

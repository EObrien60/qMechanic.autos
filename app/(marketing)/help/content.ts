// Knowledge-base content model + articles. Data-driven so the index and each
// article render from one source. Admin articles are written for office staff;
// mobile articles are written in deliberately plain, step-by-step language for
// field users (drivers/technicians) who may not be tech-confident.

export type Audience = 'mobile' | 'admin';

/** A screenshot of the real product, captured from the admin console. */
export interface KbShot {
  /** Filename under /help/admin/ — e.g. 'template-builder.webp'. */
  file: string;
  /** Required: describes the screenshot for screen readers. */
  alt: string;
  /** Shown under the image to explain what the reader is looking at. */
  caption?: string;
  /** Phone-shaped capture. Rendered narrow and centred rather than full width. */
  phone?: boolean;
}

export interface KbSection {
  heading: string;
  /** Intro paragraph(s) for the section. */
  intro?: string;
  /** Screenshots, rendered after the intro so the reader is oriented before
   *  working through the steps. */
  shots?: KbShot[];
  /** Numbered, do-this-then-that steps. */
  steps?: string[];
  /** Callout notes / tips (rendered as highlighted lines). */
  notes?: string[];
}

export interface KbArticle {
  slug: string;
  audience: Audience;
  title: string;
  /** One-line summary shown on the index card. */
  summary: string;
  /** Optional "who this is for / when to use it" line. */
  forWho?: string;
  sections: KbSection[];
}

export interface KbCategory {
  key: Audience;
  title: string;
  blurb: string;
}

export const CATEGORIES: KbCategory[] = [
  {
    key: 'mobile',
    title: 'Using the mobile app',
    blurb: 'For drivers and technicians out on the job. Step-by-step guides for your phone.',
  },
  {
    key: 'admin',
    title: 'Using the admin console',
    blurb: 'For office and workshop staff managing jobs, vehicles, people and reports.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN ARTICLES
// ─────────────────────────────────────────────────────────────────────────────
const ADMIN_ARTICLES: KbArticle[] = [
  {
    slug: 'admin-getting-started',
    audience: 'admin',
    title: 'Getting started with the admin console',
    summary: 'Sign in, find your way around, and finish setting up your workspace.',
    forWho: 'Anyone with an admin login for the office console.',
    sections: [
      {
        heading: 'Signing in',
        shots: [
          {
            file: 'login.webp',
            alt: 'The qMechanic admin sign-in screen with email and password fields.',
            caption: 'Sign in with the email and password you were given.',
          },
          {
            file: 'dashboard.webp',
            alt: 'The admin dashboard showing job counts, fleet size, recent jobs and daily driver status.',
            caption: 'The Dashboard is your landing page: live counts across the top, then panels for jobs, defects and today’s driver checks.',
          },
        ],
        steps: [
          'Open the admin console in your web browser.',
          'Enter the email address and password you were given.',
          'Select “Login”. You’ll land on the Dashboard.',
        ],
        notes: ['Forgot your password? Ask another admin to reset it for you from People → the person → Edit → Reset password.'],
      },
      {
        heading: 'Finding your way around',
        intro: 'The left-hand sidebar is your main menu. It is grouped into sections:',
        steps: [
          'Overview — the Dashboard, a snapshot of open jobs, defects and more.',
          'Work — Job Cards, Inspections and the Schedule.',
          'Fleet — Vehicles, Parts and Compliance events.',
          'Staff — People, Timesheets and Holidays.',
          'More — Reports, Chat and Messages.',
          'Your account menu (bottom, with your name) has Organization settings and Personal settings.',
        ],
      },
      {
        heading: 'Finish setting up your workspace',
        intro: 'A new workspace already works with sensible defaults, but it’s worth reviewing your settings.',
        steps: [
          'On the Dashboard, use the “Getting started” checklist — select “Configure system settings”.',
          'Or go to your account menu → Organization settings → System settings.',
          'Review Job types, Currency, VAT rates, Default labour rate and Company name, then Save any you change.',
        ],
        notes: ['See “Configuring system settings” for details on each setting.'],
      },
    ],
  },
  {
    slug: 'admin-jobs',
    audience: 'admin',
    title: 'Managing job cards',
    summary: 'Create jobs, assign technicians, add parts and labour, capture sign-off, and print or invoice.',
    forWho: 'Office staff who raise and manage workshop jobs.',
    sections: [
      {
        heading: 'Create a job card',
        shots: [
          {
            file: 'jobs.webp',
            alt: 'Job cards list with sidebar counts by status and by job type.',
            caption: 'Work → Jobs. The sidebar splits the board by status and type; the tabs filter the list.',
          },
          {
            file: 'job-detail.webp',
            alt: 'A job card showing instructions, assigned technician, parts and labour.',
            caption: 'A job card gathers instructions, parts used, labour booked and sign-off.',
          },
        ],
        steps: [
          'Go to Job Cards in the sidebar, then select “Add job” (or the new-job button).',
          'Choose the vehicle the job is for.',
          'Pick the Job type (these come from your configured job types).',
          'Add one or more instructions describing the work to be done.',
          'Save. The job opens on its detail page.',
        ],
      },
      {
        heading: 'Assign a technician',
        steps: [
          'Open the job card.',
          'In the job details, set “Assigned to” to the technician who will do the work.',
          'Select Save.',
        ],
        notes: ['Only people who are allowed to be assigned appear in the list.'],
      },
      {
        heading: 'Add parts and labour',
        steps: [
          'Open the job and go to the Parts tab. Select “Add part”, search the catalogue, set the quantity, cost and sale price, then add it.',
          'To change a part later, use the Edit (pencil) button on its row to adjust quantity, cost, sale price or invoice number.',
          'Go to the Labour tab to record hours worked against the job.',
        ],
      },
      {
        heading: 'Status changes and sign-off',
        intro: 'When you move a job to Pending or Closed, the app asks for a sign-off.',
        steps: [
          'Change the job Status (for example, from Open to Closed) and Save.',
          'A sign-off box appears — enter the technician’s name (required) and a supervisor’s name (optional).',
          'Confirm. The sign-off is stored on the job and shown as a badge.',
        ],
      },
      {
        heading: 'Print, invoice, files and delete',
        steps: [
          'Use “Print” in the job header to open a printable job card.',
          'Use “Invoice” to open the invoice view for the job.',
          'On the Files tab you can upload attachments and download them again later.',
          'Use “Delete” in the job header to remove a job card (this cannot be undone).',
        ],
      },
    ],
  },
  {
    slug: 'admin-vehicles',
    audience: 'admin',
    title: 'Vehicles and compliance',
    summary: 'Add vehicles, review a vehicle’s history, and track MOT/tax/insurance and other compliance events.',
    forWho: 'Staff who manage the fleet.',
    sections: [
      {
        heading: 'Add a vehicle',
        shots: [
          {
            file: 'vehicles.webp',
            alt: 'Vehicles list with fleet numbers, registrations, makes, models and statuses.',
            caption: 'Fleet → Vehicles. Search and filter from the toolbar; the sidebar summarises the fleet.',
          },
          {
            file: 'events-compliance.webp',
            alt: 'Vehicle events list showing compliance events, providers and expiry dates.',
            caption: 'Fleet → Events tracks dated compliance — roadworthiness tests, tacho calibration, tax and insurance.',
          },
        ],
        steps: [
          'Go to Vehicles, then select “Add vehicle”.',
          'Fill in the registration, make, model and any other details.',
          'Save.',
        ],
      },
      {
        heading: 'Review a vehicle',
        intro: 'Open any vehicle to see its detail page, organised into tabs:',
        steps: [
          'Overview — the vehicle’s details plus quick stats, including its current odometer reading.',
          'Jobs — job cards for this vehicle.',
          'Defects — faults recorded against it.',
          'Inspections — inspections carried out on it.',
          'Compliance — recurring events (MOT, insurance, tax, service) with their expiry and status.',
        ],
      },
      {
        heading: 'Track compliance events',
        steps: [
          'Open the vehicle and go to the Compliance tab.',
          'Each event shows its type, expiry date and a status badge (green = fine, amber = due within 30 days, red = overdue).',
          'The “Compliance due” stat on the Overview tab counts anything overdue or due soon.',
        ],
        notes: ['Event types and their default reminder period are configured under Settings.'],
      },
    ],
  },
  {
    slug: 'admin-inspections-setup',
    audience: 'admin',
    title: 'Set up inspections from scratch',
    summary: 'The full path from an empty system to drivers completing daily walkaround checks on their phones.',
    forWho: 'The person setting inspections up for the first time. Work through it in order.',
    sections: [
      {
        heading: 'What this guide covers',
        intro:
          'An inspection is a checklist someone completes against a vehicle — a driver’s daily walkaround, a six-weekly safety inspection, a pre-test check. You build the checklist once as a template, and the app hands it to the right people on the right vehicles from then on.',
        notes: [
          'Four things need to exist before an inspection can happen: vehicle types, vehicles, people, and a template. This guide does them in that order, because each one depends on the one before it.',
        ],
      },
      {
        heading: 'Step 1 — Set up your vehicle types',
        intro:
          'Templates are aimed at a type of vehicle rather than at each vehicle individually. Set the types up first and you only ever build one “Tractor Unit” checklist, no matter how many units you add later.',
        shots: [
          {
            file: 'machine-types.webp',
            alt: 'Machine types screen showing a list of parent vehicle types with subtypes beneath them.',
            caption: 'More → Machine Types. Types can have subtypes — Trailer → Curtainsider, Tipper, Box, Flatbed.',
          },
        ],
        steps: [
          'Go to More → Machine Types.',
          'Add a top-level type for each broad category you run — for example Tractor Unit, Rigid Truck, Trailer, Van.',
          'Add subtypes underneath where the checks genuinely differ (a tipper trailer is not checked like a box trailer).',
        ],
        notes: [
          'Keep this list short to begin with. You can add subtypes later without touching the templates that already exist.',
        ],
      },
      {
        heading: 'Step 2 — Add your vehicles',
        intro: 'Each vehicle is attached to one of the types you just created. That link is what decides which checklists it can be inspected with.',
        shots: [
          {
            file: 'vehicles.webp',
            alt: 'Vehicles list showing fleet numbers, registrations, makes, models and statuses.',
            caption: 'Fleet → Vehicles. The sidebar counts let you see the shape of the fleet at a glance.',
          },
          {
            file: 'vehicle-detail.webp',
            alt: 'A single vehicle record with its details and tabs for inspections and events.',
            caption: 'Open a vehicle to see its full history — inspections, defects and compliance events in one place.',
          },
        ],
        steps: [
          'Go to Fleet → Vehicles → “Add Vehicle”.',
          'Fill in the registration, fleet number and VIN. Fleet number is what your drivers actually say out loud, so it is worth setting.',
          'Set the Type (and subtype) — this is the important field for inspections.',
          'Save, then repeat for the rest of the fleet.',
        ],
        notes: [
          'Trailers are vehicles too. Add them as their own records so they can be checked separately from the unit pulling them.',
        ],
      },
      {
        heading: 'Step 3 — Add your drivers and technicians',
        intro:
          'Every person has a user type, and the user type decides what they see. A driver gets the walkaround checks; a technician gets the workshop inspections. Get this wrong and people either see nothing or see everything.',
        shots: [
          {
            file: 'people-users.webp',
            alt: 'People list showing names, user types such as driver, technician and admin, and contact details.',
            caption: 'Staff → Users. The type column is what drives which inspections each person is offered.',
          },
          {
            file: 'person-detail-driver.webp',
            alt: 'A driver’s record showing their details and an inspections history tab.',
            caption: 'A driver’s record keeps their licence details and their own inspection history.',
          },
        ],
        steps: [
          'Go to Staff → Users → add a person.',
          'Set their Type: driver for anyone doing walkarounds, technician for workshop staff, admin for office staff.',
          'Give them an email address and password — this is what they sign in to the mobile app with.',
          'For drivers, fill in the licence category, number and expiry so the system can warn you before it lapses.',
        ],
        notes: [
          'Drivers and technicians sign in to the mobile app. Admins sign in here, to the console. The same login works for whichever they are entitled to.',
        ],
      },
      {
        heading: 'Step 4 — Build your first template',
        intro:
          'Start with the daily walkaround, because it is the one that runs every day and delivers value immediately. Go to Work → Inspections → Templates → “New template”.',
        shots: [
          {
            file: 'template-new-basics.webp',
            alt: 'New inspection template form showing name, repeat period, photo and job card options.',
            caption: 'The top of the template form. Name it after what it is and which vehicle it is for.',
          },
          {
            file: 'template-new-items.webp',
            alt: 'The action items section of the template form with several checklist rows added.',
            caption: 'Add one action item per thing the inspector must physically check.',
          },
        ],
        steps: [
          'Name it plainly — “Daily Walkaround Check - Tractor Unit” beats “Template 1”.',
          'Set Repeat period (days) to 1 for a daily check, 42 for a six-weekly inspection.',
          'Add a Description if the name alone is not obvious — inspectors see it under the template name when they pick a check.',
          'Under Action Items, select “Add Item” and write one line per physical check.',
          'Choose the Input Type for each item (see the note below), then Save.',
        ],
        notes: [
          'There are four input types. Checkbox is a pass/fail. Number captures a reading such as tread depth or brake efficiency. Text takes a free-form comment. Photo asks for a picture. Use Number wherever you would otherwise argue about what “worn” meant.',
          'Write items as a question with an obvious right answer — “Oil level within marks” rather than “Oil”. The inspector is holding a phone in the rain; make it unambiguous.',
        ],
      },
      {
        heading: 'Step 5 — Decide who gets it, and how often',
        intro:
          'Two fields do the routing. Restricted user types controls who is offered the checklist, and Repeat period controls how often it is due.',
        shots: [
          {
            file: 'template-builder.webp',
            alt: 'Template configuration screen showing restricted user types set to driver and a repeat period of one day.',
            caption: 'Restricted user types set to driver, repeat period 1 day — a daily driver walkaround.',
          },
        ],
        steps: [
          'Open the template from Work → Inspections → Templates.',
          'Set Restricted user types to the user type that should do this check — for example driver. Leave it blank and everybody sees it.',
          'Confirm the Machine type matches the vehicles it should apply to.',
          'Set Repeat period (days) so the schedule knows when it is next due.',
          'Select “Save Changes”.',
        ],
        notes: [
          'Restricted user types takes a comma-separated list, so driver,c&d is valid if two groups share a check.',
        ],
      },
      {
        heading: 'Step 6 — Check it actually reached the app',
        intro: 'Do not assume. Verify from the driver’s side before you tell anyone it is live.',
        steps: [
          'Ask a driver to sign out and back in on the mobile app, or sign in yourself with a driver account.',
          'Start a new inspection and confirm your template appears in the list.',
          'Confirm the vehicle you expect is selectable.',
          'Complete it once yourself, end to end, so you have seen what your drivers will see.',
        ],
        notes: [
          'If the template does not appear, the usual cause is one of two things: Restricted user types does not include that person’s type, or the vehicle is attached to a different Machine type than the template.',
        ],
      },
      {
        heading: 'Step 7 — Set up reminders and tell people',
        intro: 'The system can chase people for you, and you can put a message on every driver’s home screen.',
        shots: [
          {
            file: 'notifications.webp',
            alt: 'Notification configuration screen listing reminder types with schedules.',
            caption: 'More → Notifications. Inspection reminders nudge anyone who has not completed a check.',
          },
          {
            file: 'driver-messages.webp',
            alt: 'Driver messages list showing message headers, importance levels and recipient types.',
            caption: 'Staff → Messages. Set importance and pick which user types see it.',
          },
        ],
        steps: [
          'Go to More → Notifications to review the inspection reminder, its schedule and how many days it allows before nudging.',
          'Go to Staff → Messages → add a message announcing the new check, and target the driver user type.',
          'Set the importance so it stands out — urgent messages are hard to miss on the home screen.',
        ],
        notes: [
          'Drivers and technicians only see messages from the last two weeks, and the newest ten. Post the important ones close to when you need them read.',
        ],
      },
    ],
  },
  {
    slug: 'admin-inspections',
    audience: 'admin',
    title: 'Working with inspection templates',
    summary: 'Where templates live, what each field does, and how to change one safely once it is in use.',
    forWho: 'Staff who maintain inspection checklists day to day.',
    sections: [
      {
        heading: 'Finding your templates',
        intro:
          'Go to Work → Inspections. The page has two tabs: Templates (the checklists you have designed) and Instances (checks that have actually been completed). The sidebar counts tell you how many of each you have.',
        shots: [
          {
            file: 'inspections-templates.webp',
            alt: 'Inspections page on the Templates tab, listing inspection templates with their details.',
            caption: 'The Templates tab. Use the Reports links in the sidebar to jump straight to compliance views.',
          },
        ],
      },
      {
        heading: 'What each field on a template does',
        intro: 'Open any template to see its configuration. The left sidebar summarises it; the right side is where you edit.',
        shots: [
          {
            file: 'template-builder.webp',
            alt: 'Template configuration screen with basic information fields and a summary sidebar.',
            caption: 'Every field on the template, with a live summary of the template on the left.',
          },
        ],
        steps: [
          'Name — what inspectors see in the app. Make it specific.',
          'Repeat period (days) — how often this check is due. Drives the schedule and the “next due” date.',
          'Description — a short line shown under the template name when an inspector picks a check.',
          'Restrict to user types — tick the user types that should be offered this checklist. Leave all unchecked and everybody sees it.',
          'Machine type (and subtype) — which kind of vehicle this checklist applies to.',
        ],
      },
      {
        heading: 'Editing the checklist items',
        intro:
          'The Action Items section is the checklist itself. Each item has the task text and an input type, plus optional measurement guidance for number and text items.',
        shots: [
          {
            file: 'template-builder-items.webp',
            alt: 'The action items list of a template, each row with task text and an input type selector.',
            caption: 'Items are numbered in the order the inspector will work through them.',
          },
        ],
        steps: [
          'Select “Add Item” to append a new check to the end of the list.',
          'Set the Input Type — Checkbox, Text, Number or Photo.',
          'For Number and Text items, use Measurement Guidance to tell the inspector the unit or limit, such as “mm (min 1.0mm)”.',
          'Use “Remove” to delete an item, then “Save Changes”.',
        ],
        notes: [
          'Order matters. Sequence the items the way somebody physically walks around the vehicle, so nothing gets skipped.',
        ],
      },
      {
        heading: 'Changing a template that is already in use',
        intro:
          'Completed inspections keep their own copy of the checklist as it was on the day. Editing a template changes what happens from now on; it does not rewrite history.',
        notes: [
          'This means your past records stay accurate and auditable after you improve a checklist — but it also means a fix only takes effect on the next inspection, not on ones already completed.',
          'If a check changes fundamentally, consider building a new template and retiring the old one rather than editing it, so the two sets of results stay comparable.',
        ],
      },
      {
        heading: 'Completed inspections',
        intro:
          'Go to Work → Inspections → Instances. This is every check that has actually been completed, newest first, with the vehicle and the inspector.',
        shots: [
          {
            file: 'inspections-instances.webp',
            alt: 'The Instances tab listing completed inspections with vehicle registration, inspector and date.',
            caption: 'Search by registration or inspector name to find a specific check.',
          },
        ],
      },
      {
        heading: 'Reading a single inspection',
        intro: 'Open any instance to see exactly what the inspector recorded.',
        shots: [
          {
            file: 'inspection-detail.webp',
            alt: 'A completed inspection showing the checklist items, their input types and recorded results.',
            caption: 'A completed walkaround: 23 of 24 items passed, with tread depths recorded as real measurements.',
          },
        ],
        steps: [
          'The sidebar shows the template used, the vehicle, the date, the odometer reading and when the check is next due.',
          'The Summary tiles tell you how many items were on the checklist and how many passed — 23 of 24 in the example above.',
          'Number items show the reading the inspector actually entered, such as a tread depth of 11.72mm.',
          'Checkbox items record n/a in the result column, because a tick has no measurement — the passed count in the summary is what tells you how many were satisfied.',
          'Any fault raised during the check becomes a defect, which you follow up from the Defects screen below.',
        ],
      },
      {
        heading: 'Acting on defects',
        intro:
          'A defect is a fault an inspector raised. It stays open until somebody resolves it, which is what makes this list the one to work from each morning.',
        shots: [
          {
            file: 'defects.webp',
            alt: 'Defects list showing descriptions, the vehicle, who raised each one and whether it is resolved.',
            caption: 'More → Defects. Unresolved defects are the ones that need a decision today.',
          },
        ],
        steps: [
          'Go to More → Defects to see everything outstanding across the fleet.',
          'Open a defect to see which inspection raised it and on which vehicle.',
          'Attach it to a job card so a technician can be assigned the work.',
          'Mark it resolved once the work is signed off.',
        ],
        notes: [
          'A defect with no job card against it is the thing that quietly gets forgotten. The Open Defects report exists to catch exactly that.',
        ],
      },
      {
        heading: 'Turning a defect into workshop work',
        intro: 'Job cards are where the repair actually gets tracked — parts, labour hours and sign-off.',
        shots: [
          {
            file: 'jobs.webp',
            alt: 'Job cards list with sidebar counts for open, in progress and completed jobs, and counts by type.',
            caption: 'Work → Jobs. The sidebar splits the board by status and by job type.',
          },
          {
            file: 'job-detail.webp',
            alt: 'A single job card showing instructions, assigned technician, parts and labour.',
            caption: 'A job card gathers the instructions, the parts used and the labour booked against it.',
          },
        ],
        steps: [
          'Go to Work → Jobs → “Create Job Card”, or open the job that the inspection raised automatically.',
          'Pick the vehicle and set the type — Maintenance, Breakdown or Service.',
          'Assign a technician and add the instruction lines describing the work.',
          'As work happens, parts and labour are booked against the card.',
          'Close the job when it is signed off, which lets you resolve the defect behind it.',
        ],
      },
      {
        heading: 'Proving today’s checks were done',
        intro:
          'The dashboard carries a live panel for today’s walkarounds, and the full report sits behind it. This is the view to open first thing.',
        shots: [
          {
            file: 'dashboard-driver-status.webp',
            alt: 'Dashboard panel headed Daily Driver Status showing drivers with Done or Pending badges.',
            caption: 'The dashboard panel leads with the drivers who have not checked in yet.',
          },
          {
            file: 'report-daily-driver-status.webp',
            alt: 'Daily driver status report listing every driver, whether they completed today, and which vehicles.',
            caption: 'More → Reports → Daily Driver Status. Change the date to audit any day.',
          },
        ],
        steps: [
          'Open the Dashboard and find the Daily Driver Status panel.',
          'Anyone marked Pending has not completed their check yet today.',
          'Select “View All” for the full report, where you can change the date and search by driver.',
          'Use it as a morning stand-up list: chase the Pending rows, then move on.',
        ],
      },
      {
        heading: 'The other inspection reports',
        intro: 'Three more reports answer the questions that come up most often.',
        shots: [
          {
            file: 'report-latest-driver-inspections.webp',
            alt: 'Report listing each driver alongside their most recent completed inspection.',
            caption: 'Latest Driver Inspections — the last check each driver did, and when.',
          },
          {
            file: 'report-open-defects.webp',
            alt: 'Open defects report listing unresolved faults with vehicle and reporter.',
            caption: 'Open Defects — everything still outstanding, exportable as CSV.',
          },
          {
            file: 'reports-index.webp',
            alt: 'Reports index page listing all available reports grouped by category.',
            caption: 'More → Reports lists everything available, including cost and labour reporting.',
          },
        ],
      },
      {
        heading: 'Seeing what is due next',
        intro:
          'The schedule projects upcoming checks from each template’s repeat period and each vehicle’s history, so you can see what is coming before it is late.',
        shots: [
          {
            file: 'schedule.webp',
            alt: 'Schedule screen showing upcoming inspections per vehicle.',
            caption: 'Fleet → Schedule. Driven by the repeat period you set on each template.',
          },
        ],
        notes: [
          'If the schedule looks empty, check that your templates have a Repeat period set. Without one, there is nothing for the projection to work from.',
        ],
      },
      {
        heading: 'Keeping vehicles legal alongside inspections',
        intro:
          'Inspections cover the daily and periodic checks you run yourself. Compliance events cover the dated certificates — roadworthiness tests, tacho calibration, tax and insurance.',
        shots: [
          {
            file: 'events-compliance.webp',
            alt: 'Vehicle events screen listing compliance events with expiry dates and statuses.',
            caption: 'Fleet → Events. Each event type carries its own reminder lead time.',
          },
        ],
        notes: [
          'Set the reminder days on each event type so you are warned with enough notice to actually book the work in.',
        ],
      },
    ],
  },
  {
    slug: 'admin-parts',
    audience: 'admin',
    title: 'Parts and the invoice parser',
    summary: 'Manage your parts inventory and reconcile supplier invoices into stock and jobs.',
    forWho: 'Parts / stores staff.',
    sections: [
      {
        heading: 'Parts inventory',
        shots: [
          {
            file: 'parts.webp',
            alt: 'Parts list showing part numbers, descriptions, suppliers, stock and prices.',
            caption: 'Work → Parts. Stock, cost and sale price per line, with supplier.',
          },
        ],
        steps: [
          'Go to Parts to see your catalogue with stock levels.',
          'Use the search box to filter by part number or description.',
        ],
      },
      {
        heading: 'Reconcile a supplier invoice',
        intro: 'The invoice parser reads a supplier invoice and helps you turn each line into stock and job costs.',
        steps: [
          'Go to Parts → Invoice parser and upload the invoice (PDF or image), then Parse.',
          'Review each line. Choose an action per line: Update stock (match an existing part), Create part (make a new one from the line), or Skip.',
          'Edit any line’s description, part number, supplier, quantity or unit price before posting.',
          'Optionally assign a line to a job (with a status filter and partial quantity).',
          'If the invoice number has been seen before, a duplicate-invoice warning appears at the top.',
          'Select “Process” to post everything. The summary reports how many parts were created, updated, assigned or skipped.',
        ],
        notes: ['Nothing is silently dropped — every line has an explicit action, and the result summary tells you exactly what happened.'],
      },
    ],
  },
  {
    slug: 'admin-people-suppliers',
    audience: 'admin',
    title: 'People and suppliers',
    summary: 'Add team members, change roles, reset passwords, and manage supplier records.',
    forWho: 'Admins who manage staff and supplier accounts.',
    sections: [
      {
        heading: 'Add a person',
        shots: [
          {
            file: 'people-users.webp',
            alt: 'People list showing names, user types and contact details.',
            caption: 'Staff → Users. A person’s Type decides what they can see and do.',
          },
        ],
        steps: [
          'Go to People → Users → “Add user”.',
          'Enter their name, email, role/type and a password.',
          'Save. They can now sign in (mobile or admin, depending on their role).',
        ],
      },
      {
        heading: 'Change a role or reset a password',
        steps: [
          'Open the person from People → Users and select “Edit details”.',
          'Change the Role, or type a new password in “Reset password”.',
          'Leave the password blank to keep the current one. Save.',
        ],
      },
      {
        heading: 'Suppliers',
        steps: [
          'Go to People → Suppliers and select a supplier’s “View”.',
          'See their details plus a grid of the parts they supply and stock stats.',
          'Use “Edit” to change name, email, phone, address, ref no and account no.',
        ],
      },
    ],
  },
  {
    slug: 'admin-reports',
    audience: 'admin',
    title: 'Reports and exports',
    summary: 'Find every report from the Export Center — jobs-by-customer, labour warnings, instructions and more.',
    forWho: 'Managers and office staff who need data out of the system.',
    sections: [
      {
        heading: 'Finding reports',
        shots: [
          {
            file: 'reports-index.webp',
            alt: 'Reports index listing available reports grouped by category.',
            caption: 'More → Reports. Most reports can be exported as CSV.',
          },
        ],
        steps: [
          'Go to Reports — this is the Export Center, the single place for every report.',
          'Download datasets as CSV, or open a specialised/live report from the list.',
        ],
      },
      {
        heading: 'Useful reports',
        steps: [
          'Jobs by customer — jobs grouped by the customer that owns each vehicle, with a customer filter and CSV export.',
          'Labour warnings — shifts that fall outside expected hours (for example over 16 hours).',
          'Instructions — unresolved job-card instructions across the fleet (closed jobs are excluded).',
          'Costs, Clocked-on now/history, and driver-inspection reports.',
        ],
      },
    ],
  },
  {
    slug: 'admin-timesheets-holidays',
    audience: 'admin',
    title: 'Timesheets and holidays',
    summary: 'Review weekly timesheets and manage holiday entitlement.',
    forWho: 'Office staff handling payroll and leave.',
    sections: [
      {
        heading: 'Timesheets',
        shots: [
          {
            file: 'timesheets.webp',
            alt: 'Timesheets list showing weeks, staff, hours and approval status.',
            caption: 'Staff → Timesheets. Submitted weeks wait here for approval.',
          },
          {
            file: 'holidays.webp',
            alt: 'Holiday requests list showing dates, requesters and statuses.',
            caption: 'Staff → Holidays. Approve or reject requests, with the reason recorded.',
          },
        ],
        steps: [
          'Go to Timesheets to see the weekly list with hours and stats.',
          'Weekly totals apply the correct lunch policy automatically (a lunch deduction on worked weekdays, and on weekend days worked over 8 hours).',
          'Use the week picker to move between weeks; export the week as CSV when needed.',
        ],
      },
      {
        heading: 'Holidays',
        steps: [
          'Go to Holidays to review requests and balances.',
          'Set the annual entitlement under Organization settings → Holidays.',
        ],
      },
    ],
  },
  {
    slug: 'admin-settings',
    audience: 'admin',
    title: 'Configuring system settings',
    summary: 'Set job types, currency, VAT rates, labour rate and more — the configuration behind the app.',
    forWho: 'Admins setting up how the workspace behaves.',
    sections: [
      {
        heading: 'Where settings live',
        shots: [
          {
            file: 'settings.webp',
            alt: 'System settings list showing configuration keys and their values.',
            caption: 'More → Settings holds workspace-wide configuration as key/value pairs.',
          },
        ],
        intro: 'Open your account menu → Organization settings. The configuration areas are listed directly in the left nav:',
        steps: [
          'System settings — the typed workspace settings (below).',
          'Machine types — vehicle/asset categories.',
          'Defects — the defect catalogue.',
          'Job permissions — who can create jobs.',
          'Plus Billing & plan, Notifications, Holidays, and Company & logo.',
        ],
      },
      {
        heading: 'System settings',
        intro: 'Each setting has a sensible default, so the app works even before you change anything. Edit a value and select Save on its row.',
        steps: [
          'Job types — the list of selectable job-card types (comma-separated).',
          'Currency — the currency code, e.g. GBP.',
          'Default labour rate — the per-hour rate used when none is set.',
          'Labour VAT rate / Parts VAT rate — the VAT percentages.',
          'Company name — shown around the app.',
          'Default event reminder (days) — how far ahead compliance reminders start.',
        ],
        notes: ['New workspaces get all of these automatically — you only need to change the ones that differ for your business.'],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE ARTICLES  (plain, step-by-step language for field users)
// ─────────────────────────────────────────────────────────────────────────────
const MOBILE_ARTICLES: KbArticle[] = [
  {
    slug: 'mobile-getting-started',
    audience: 'mobile',
    title: 'Set up the app and sign in',
    summary: 'How to switch the app on for the first time and log in.',
    forWho: 'Everyone using the phone app — drivers and mechanics.',
    sections: [
      {
        heading: 'First time only: enter your activation code',
        intro: 'The very first time you open the app, you connect it to your company. You only do this once on this phone.',
        steps: [
          'Open the qMechanic app.',
          'On the Welcome screen, tap “I have an activation code”.',
          'Type in the activation code your office gave you.',
          'Tap “Verify”.',
          'If the code is right, the app connects and shows the login screen.',
        ],
        notes: [
          'No code? Ask your office/manager for one — you can’t use the app without it.',
          'If it says “Invalid verification code”, check for typos and try again.',
        ],
      },
      {
        heading: 'Log in',
        steps: [
          'On the login screen, type your email address.',
          'Type your password.',
          'Tap “Sign in”.',
          'You land on the Home screen (called “Dashboard”).',
        ],
        notes: [
          'Your login is created by your office. There is no “sign up” and no “forgot password” in the app — if you can’t get in, ask your office to reset your password.',
        ],
      },
      {
        heading: 'Moving around the app',
        intro: 'Use the bar of buttons along the bottom of the screen. From left to right:',
        steps: [
          'Inspect — do a vehicle check.',
          'Jobs — your job cards (mechanics only; drivers won’t see this).',
          'Home — the big middle button, takes you back to the Dashboard.',
          'Defects — report a fault on a vehicle.',
          'Time — your timesheets.',
          'To go back one screen, tap “‹ Back” at the top.',
        ],
      },
    ],
  },
  {
    slug: 'mobile-home',
    audience: 'mobile',
    title: 'The Home screen and messages',
    summary: 'Read alerts from the office and log out.',
    forWho: 'Everyone.',
    sections: [
      {
        heading: 'Driver alerts (messages from the office)',
        steps: [
          'On Home, the top card is “Driver alerts” — messages from your office.',
          'The newest important message may pop up when you open the app. Read it and tap “Dismiss”.',
          'If you never want to see that one message again, tick “Don’t show this again” before dismissing.',
          'Tap “Show more” to read older alerts, or pull the screen down to refresh.',
        ],
      },
      {
        heading: 'Quick buttons',
        intro: 'The Home screen has big buttons for the main things you do:',
        steps: [
          'Inspections — start or review a vehicle check.',
          'Job Cards — your jobs (mechanics only).',
          'Defects — report a fault.',
          'Timesheets — your hours.',
        ],
      },
      {
        heading: 'Logging out',
        steps: [
          'Scroll to the bottom of the Home screen and tap “Log out”.',
          'Only use “Reset App” if your office tells you to — it disconnects the app and you’ll need the activation code again.',
        ],
      },
    ],
  },
  {
    slug: 'mobile-inspection',
    audience: 'mobile',
    title: 'Do a vehicle check (walkaround / inspection)',
    summary: 'The daily vehicle check, step by step — from picking the vehicle to signing off.',
    forWho: 'Drivers and mechanics doing walkarounds or safety checks.',
    sections: [
      {
        heading: 'Start a new check',
        steps: [
          'Tap “Inspect” at the bottom (or “Inspections” on Home).',
          'Tap “New Inspection”.',
          'Find your vehicle — type its registration, make or model in the search box, or use the filter chips.',
          'Tap “Continue” on the right vehicle.',
          'Tap the inspection template you’ve been told to use.',
        ],
      },
      {
        heading: 'Enter the odometer (mileage)',
        steps: [
          'At the top, type the current odometer/mileage reading.',
          'This is required — you can’t finish without it (unless it’s a trailer, which has no mileage).',
        ],
      },
      {
        heading: 'Answer each check item',
        intro: 'Work down the list. Every item must be answered.',
        steps: [
          'For a normal check item, tap one button: “OK” (it’s fine), “FAIL” (there’s a problem), or “N/A” (doesn’t apply).',
          'If you tap “FAIL”, a box appears — type what’s wrong with it. Keep it short and clear.',
          'For a measurement item, type the number it asks for (for example, tyre tread depth).',
          'When every item has an answer, tap “Complete Inspection”.',
        ],
        notes: [
          'If it says “Incomplete Inspection”, you’ve missed some items — go back and answer them.',
          'Be honest with FAIL — anything you fail becomes a defect the workshop will see.',
        ],
      },
      {
        heading: 'Check the summary and sign',
        steps: [
          'You’ll see a summary: how many passed, failed and N/A.',
          'Under “Defects”, anything you failed is listed. You can edit the wording, tap “Add Defect” to add more, or delete one with the bin icon.',
          'In the “Signature” box, type your name.',
          'Tap “Submit Inspection”. You’ll see “Inspection submitted successfully!” and go back to Home.',
        ],
        notes: ['Tap “Go Back” first if you need to change any answers.'],
      },
    ],
  },
  {
    slug: 'mobile-past-inspections',
    audience: 'mobile',
    title: 'View past inspections & check outside vehicles',
    summary: 'Look back at completed checks, and inspect a vehicle that isn’t in the system.',
    forWho: 'Drivers and mechanics.',
    sections: [
      {
        heading: 'Look at past inspections',
        steps: [
          'Tap “Inspect”, then “Past Inspections”.',
          'Pick the vehicle.',
          'Tap an inspection in the list to open it.',
          'You’ll see who did it, the date, the mileage, and every check result (read-only — you can’t change a finished inspection).',
        ],
      },
      {
        heading: 'Inspect a vehicle that isn’t in the system (3rd party)',
        intro: 'Use this for a customer, rental or contractor vehicle that isn’t in your fleet list.',
        steps: [
          'Tap “Inspect”, then “3rd Party”, then “New 3rd Party Inspection”.',
          'Type the registration/plate, make and model (these are required). Add year or extra details if you like.',
          'Choose an inspection template and tap “Create 3rd Party Inspection”.',
          'Fill it in the same way as a normal check, then submit.',
        ],
      },
    ],
  },
  {
    slug: 'mobile-defects',
    audience: 'mobile',
    title: 'Report a fault (defect) on a vehicle',
    summary: 'Quickly log a problem on a vehicle without doing a full inspection.',
    forWho: 'Drivers and mechanics who spot a problem.',
    sections: [
      {
        heading: 'Log a defect',
        steps: [
          'Tap “Defects” at the bottom.',
          'Search for the vehicle by registration, make or model, and tap it.',
          'Type what’s wrong in the “Describe the defect” box. Be clear — say what and where.',
          'To report more than one problem, tap “Add another defect” and fill the next box.',
          'Tap “Submit all defects”. You’ll see it was recorded.',
        ],
        notes: ['A defect tells the workshop something needs fixing — the office and mechanics can see it straight away.'],
      },
    ],
  },
  {
    slug: 'mobile-jobs',
    audience: 'mobile',
    title: 'Work a job card (mechanics)',
    summary: 'Clock on/off, add parts, resolve instructions, and sign off a job.',
    forWho: 'Mechanics/technicians (the Jobs tab is hidden for drivers).',
    sections: [
      {
        heading: 'Find your jobs',
        steps: [
          'Tap “Jobs” at the bottom.',
          'Your assigned jobs are under “My Active Jobs” — tap one to open it.',
          'Or use “Find by Vehicle” or “Find by Job #” to search.',
        ],
      },
      {
        heading: 'Clock on and off a job',
        intro: 'This records the time you spend on the job.',
        steps: [
          'Open the job and find the “Labour Records” section.',
          'Tap “Clock On” when you start working.',
          'Tap “Clock Off” on your own line when you stop.',
          'Your hours add up automatically.',
        ],
        notes: ['You can only clock yourself on and off — not other people.'],
      },
      {
        heading: 'Instructions, parts and photos',
        steps: [
          'Instructions: tick each instruction off as you finish it. Tap “Add Instruction” to add one.',
          'Parts: tap “Add Part”, search the parts list, pick the part, type the quantity, and tap “Add Part”.',
          'Photos: tap “Upload Photo” to choose from your phone, or “Take Photo” to use the camera. Tap a photo to view it big.',
          'Odometer: type the mileage and tap “Save” (or “Pull Latest” to fill in the last known reading).',
        ],
        notes: ['You can only edit a job while it’s “Open”. Once it’s signed off it becomes read-only.'],
      },
      {
        heading: 'Sign off the job when it’s done',
        steps: [
          'Scroll to “Sign Off” at the bottom of the job.',
          'Make sure the odometer is filled in and everyone is clocked off — the app will stop you otherwise.',
          'Tap “Sign Off Job Card”.',
          'Add at least one signature: type a Name and a Role (for example, Mechanic or Supervisor), then “Add Signature”.',
          'Tap “Confirm Sign Off”. The job moves to “Pending” for the office.',
        ],
        notes: ['If there are still unresolved defects it will warn you, but you can continue.'],
      },
    ],
  },
  {
    slug: 'mobile-timesheets',
    audience: 'mobile',
    title: 'Fill in your timesheet and request holidays',
    summary: 'Enter your hours each day, submit your week, and ask for time off.',
    forWho: 'Everyone who records hours.',
    sections: [
      {
        heading: 'Open this week’s timesheet',
        steps: [
          'Tap “Time” at the bottom.',
          'The top card shows this week and whether it’s a Draft, Submitted, Approved or Rejected.',
          'Tap “Edit Current Timesheet” to fill it in.',
        ],
        notes: ['You can only edit a timesheet while it’s a Draft (or if it was Rejected and sent back to you).'],
      },
      {
        heading: 'Enter your hours',
        intro: 'There’s one card for each day, Monday to Sunday.',
        steps: [
          'For each day you worked, set your Start and End time.',
          'Or use a quick button like “8h (08-16)” to fill a standard day fast. “Clear” empties a day.',
          'Fill in any extra fields for your job (for example, drivers add truck, collection/delivery and diesel litres).',
          'If you were off, tap the right chip: Holiday, Sick or Funeral. Tap “Overnight” if it applies.',
          'Add a note if you need to.',
        ],
      },
      {
        heading: 'Save and submit',
        steps: [
          'Tap “Save” to keep your changes.',
          'When the week is complete, tap “Submit” and confirm.',
          'After submitting it says “Awaiting approval” — your manager reviews it.',
          'If it’s Rejected, open it to read the reason, fix it, and submit again.',
        ],
      },
      {
        heading: 'Request a holiday',
        steps: [
          'On the Time screen, tap “Request Holiday”, then “+ Request New Holiday”.',
          'Pick a date (use a quick button like “Next Monday”, or type the date), and add a note if you want.',
          'Tap “Submit Request”.',
          'Remember: requesting does NOT guarantee the day off — your manager still has to approve it.',
          'You can cancel a request while it’s still Pending.',
        ],
      },
    ],
  },
];

export const ARTICLES: KbArticle[] = [...MOBILE_ARTICLES, ...ADMIN_ARTICLES];

export const articlesFor = (audience: Audience): KbArticle[] =>
  ARTICLES.filter((a) => a.audience === audience);

export const getArticle = (slug: string): KbArticle | undefined =>
  ARTICLES.find((a) => a.slug === slug);

/** Stable anchor id for a section heading, so headings are deep-linkable. */
export const sectionId = (heading: string): string =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Previous/next article within the same audience, for sequential reading. */
export const neighbours = (
  slug: string,
): { prev?: KbArticle; next?: KbArticle } => {
  const article = getArticle(slug);
  if (!article) return {};
  const siblings = articlesFor(article.audience);
  const i = siblings.findIndex((a) => a.slug === slug);
  return { prev: siblings[i - 1], next: siblings[i + 1] };
};

/** Flattened text used by the index search box. */
export const searchIndex = (a: KbArticle): string =>
  [a.title, a.summary, a.forWho ?? '', ...a.sections.map((s) => s.heading)]
    .join(' ')
    .toLowerCase();

'use client'

import { track } from '@vercel/analytics'
import styles from './Legal.module.css'

export default function Privacy() {
  return (
    <section className={styles.legal}>
      <div className={styles.container}>
        <span className={styles.sectionTag}>Legal</span>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.effectiveDate}>Effective date: 15 February 2026</p>

        <div className={styles.content}>
          <h2>1. Introduction</h2>
          <p>
            qMechanic (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is operated by OBH Software, based in Ireland. We are committed to
            protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use the qMechanic mobile application and web platform (collectively,
            the &ldquo;Service&rdquo;).
          </p>
          <p>
            By using the Service, you agree to the collection and use of information in accordance with this policy.
            If you do not agree with this policy, please do not use the Service.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, company name, phone number, and password when you create an account or submit a contact form.</li>
            <li><strong>Fleet &amp; Vehicle Data:</strong> Vehicle identifiers, mileage, maintenance records, inspection results, job card details, and other fleet management data you enter into the Service.</li>
            <li><strong>Invoice &amp; Document Data:</strong> Invoices, receipts, and other documents you upload for processing, including data extracted via AI-powered processing.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with the Service, including pages visited, features used, and session duration.</li>
            <li><strong>Device Information:</strong> Device type, operating system, browser type, and unique device identifiers.</li>
            <li><strong>Location Data:</strong> If you enable fleet tracking features, we collect GPS location data for your vehicles. You can disable this at any time through the Service settings.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain the Service</li>
            <li>Process and manage fleet maintenance records, job cards, and inspections</li>
            <li>Process invoices and documents using AI-powered tools</li>
            <li>Track vehicle locations when fleet tracking is enabled</li>
            <li>Generate fleet analytics and reporting</li>
            <li>Manage compliance schedules and send reminders</li>
            <li>Communicate with you about your account, support requests, and Service updates</li>
            <li>Improve and develop new features for the Service</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>

          <h2>4. Data Sharing &amp; Third Parties</h2>
          <p>We do not sell your personal information. We may share your data with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating the Service, including cloud hosting (Vercel, Neon Database), analytics (Vercel Analytics), and payment processing.</li>
            <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process, or to protect the rights, safety, or property of qMechanic, our users, or others.</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your data may be transferred as part of that transaction.</li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>
            We retain your personal data for as long as your account is active or as needed to provide the Service.
            Fleet and maintenance records are retained for the duration of your subscription and for a reasonable
            period afterward to comply with legal and regulatory obligations. You may request deletion of your
            data at any time by contacting us.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your data, including encryption
            in transit (TLS/SSL), encrypted storage, access controls, and regular security reviews. However, no
            method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>7. Your Rights (GDPR)</h2>
          <p>
            As we are based in Ireland and subject to the General Data Protection Regulation (GDPR), you have the
            following rights regarding your personal data:
          </p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Rectification:</strong> Request correction of any inaccurate or incomplete data.</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data (&ldquo;right to be forgotten&rdquo;).</li>
            <li><strong>Restriction:</strong> Request that we limit processing of your data in certain circumstances.</li>
            <li><strong>Portability:</strong> Request your data in a structured, machine-readable format.</li>
            <li><strong>Objection:</strong> Object to the processing of your data for certain purposes.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the details below. We will respond to your
            request within 30 days.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            The Service is not intended for use by anyone under the age of 16. We do not knowingly collect personal
            information from children under 16. If we become aware that we have collected data from a child under 16,
            we will take steps to delete that information promptly. If you believe a child has provided us with
            personal data, please contact us.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            Your data may be processed on servers located outside your country of residence, including in the
            European Economic Area (EEA) and the United States. Where data is transferred outside the EEA, we
            ensure appropriate safeguards are in place in accordance with GDPR requirements.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting
            the updated policy on this page and updating the &ldquo;Effective date&rdquo; above. Your continued use of the
            Service after changes are posted constitutes acceptance of the revised policy.
          </p>

          <div className={styles.contactCard}>
            <h3>Contact Us</h3>
            <p>If you have any questions about this Privacy Policy or wish to exercise your data rights, contact us at:</p>
            <p><strong>OBH Software</strong></p>
            <p>Email: <a href="mailto:info@obhsoftware.ie" onClick={() => track('Contact Method Click', { method: 'email', page: 'privacy' })}>info@obhsoftware.ie</a></p>
            <p>Phone: <a href="tel:+353868363332" onClick={() => track('Contact Method Click', { method: 'phone', page: 'privacy' })}>+353 (86) 836 3332</a></p>
          </div>
        </div>
      </div>
    </section>
  )
}

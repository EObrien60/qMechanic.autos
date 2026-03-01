import { track } from '@vercel/analytics'
import SEO from '../components/SEO'
import styles from './Legal.module.css'

export default function Terms() {
  return (
    <>
    <SEO
      title="Terms of Service"
      description="qMechanic terms of service. Read the terms and conditions for using the qMechanic fleet management platform. Operated by OBH Software, Ireland."
      path="/terms"
    />
    <section className={styles.legal}>
      <div className={styles.container}>
        <span className={styles.sectionTag}>Legal</span>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.effectiveDate}>Effective date: 15 February 2026</p>

        <div className={styles.content}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the qMechanic mobile application and web platform (the "Service"), operated by
            OBH Software ("we", "our", or "us"), you agree to be bound by these Terms of Service. If you do not
            agree to these terms, do not use the Service.
          </p>
          <p>
            If you are using the Service on behalf of a company or other legal entity, you represent that you have
            the authority to bind that entity to these terms.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            qMechanic is a fleet management platform that provides tools for digital job cards, vehicle inspections,
            AI-powered invoice processing, fleet tracking, analytics, and compliance management. The specific
            features available to you depend on your subscription plan.
          </p>

          <h2>3. Account Registration</h2>
          <p>
            To use certain features of the Service, you must create an account. You agree to provide accurate and
            complete information during registration and to keep your account information up to date. You are
            responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account.
          </p>
          <p>
            You must notify us immediately if you become aware of any unauthorised use of your account.
          </p>

          <h2>4. Subscriptions & Payment</h2>
          <p>
            The Service is offered on a subscription basis. By selecting a subscription plan, you agree to pay the
            applicable fees as described on our Pricing page. Fees are billed in advance on a monthly or annual
            basis depending on your chosen plan.
          </p>
          <ul>
            <li><strong>Free Trials:</strong> If we offer a free trial, you will not be charged until the trial period ends. You may cancel at any time during the trial.</li>
            <li><strong>Renewals:</strong> Subscriptions automatically renew at the end of each billing period unless you cancel before the renewal date.</li>
            <li><strong>Refunds:</strong> Fees are non-refundable except as required by applicable law.</li>
            <li><strong>Price Changes:</strong> We may change our fees with at least 30 days' advance notice. Continued use after a price change constitutes acceptance of the new fees.</li>
          </ul>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose or in violation of any applicable laws or regulations</li>
            <li>Attempt to gain unauthorised access to any part of the Service, other accounts, or systems</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
            <li>Upload malicious code, viruses, or harmful content</li>
            <li>Reverse-engineer, decompile, or disassemble any part of the Service</li>
            <li>Resell, sublicense, or redistribute the Service without our written consent</li>
            <li>Use the Service to store or transmit content that infringes on third-party rights</li>
          </ul>

          <h2>6. Your Data</h2>
          <p>
            You retain ownership of all data you submit to the Service ("Your Data"). By using the Service, you
            grant us a limited licence to use, process, and store Your Data solely to provide and improve the Service.
          </p>
          <p>
            You are responsible for ensuring that Your Data does not violate any laws or third-party rights. We
            handle Your Data in accordance with our <a href="/privacy">Privacy Policy</a>.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            The Service, including its design, features, code, documentation, trademarks, and all related
            intellectual property, is owned by OBH Software and is protected by Irish and international
            intellectual property laws. Nothing in these terms grants you any right to use our trademarks,
            logos, or branding without prior written consent.
          </p>

          <h2>8. Third-Party Services</h2>
          <p>
            The Service may integrate with or contain links to third-party services (such as GPS providers,
            payment processors, or analytics tools). We are not responsible for the content, privacy practices,
            or availability of third-party services. Your use of third-party services is at your own risk and
            subject to their respective terms and policies.
          </p>

          <h2>9. Availability & Modifications</h2>
          <p>
            We strive to maintain high availability but do not guarantee uninterrupted access to the Service.
            We may modify, suspend, or discontinue any part of the Service at any time with reasonable notice.
            We will not be liable for any modification, suspension, or discontinuation of the Service.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, OBH Software and its directors, employees, and
            agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
            including but not limited to loss of profits, data, or business opportunities, arising from your use
            of the Service.
          </p>
          <p>
            Our total liability for any claim arising from or related to the Service shall not exceed the amount
            you paid to us in the twelve (12) months preceding the claim.
          </p>

          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless OBH Software from any claims, damages, losses, or expenses
            (including reasonable legal fees) arising from your use of the Service, violation of these terms, or
            infringement of any third-party rights.
          </p>

          <h2>12. Termination</h2>
          <p>
            You may cancel your subscription and close your account at any time. We may suspend or terminate your
            access to the Service if you breach these terms or engage in conduct that we determine, in our sole
            discretion, is harmful to the Service or other users.
          </p>
          <p>
            Upon termination, your right to use the Service ceases immediately. We will retain Your Data for a
            reasonable period to allow you to export it, after which it may be deleted in accordance with our
            Privacy Policy.
          </p>

          <h2>13. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of Ireland. Any disputes arising
            from these terms or the Service shall be subject to the exclusive jurisdiction of the courts of Ireland.
          </p>

          <h2>14. Changes to These Terms</h2>
          <p>
            We may update these Terms of Service from time to time. We will notify you of material changes by
            posting the updated terms on this page and updating the "Effective date" above. Your continued use
            of the Service after changes are posted constitutes acceptance of the revised terms.
          </p>

          <div className={styles.contactCard}>
            <h3>Contact Us</h3>
            <p>If you have any questions about these Terms of Service, contact us at:</p>
            <p><strong>OBH Software</strong></p>
            <p>Email: <a href="mailto:info@obhsoftware.ie" onClick={() => track('Contact Method Click', { method: 'email', page: 'terms' })}>info@obhsoftware.ie</a></p>
            <p>Phone: <a href="tel:+353868363332" onClick={() => track('Contact Method Click', { method: 'phone', page: 'terms' })}>+353 (86) 836 3332</a></p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics'
import styles from './Pricing.module.css'

interface MenuSection {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  items: { name: string; description: string; price: string }[]
}

const menuSections: MenuSection[] = [
  {
    id: 'starters',
    name: 'Starters & Appetizers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14l-4-4h3V8h2v4h3l-4 4z" />
      </svg>
    ),
    description: 'Start your Casa Bonita evening right with classics that have been on our menu for decades.',
    items: [
      { name: 'Chips & Salsa', description: 'House-made tortilla chips with our signature red salsa', price: '$6' },
      { name: 'Queso Dip', description: 'Warm, creamy queso blanco with roasted peppers', price: '$9' },
      { name: 'Guacamole', description: 'Fresh avocado with lime, cilantro, and jalapeño', price: '$10' },
      { name: 'Loaded Nachos', description: 'Tortilla chips piled high with cheese, beans, jalapeños, and sour cream', price: '$14' },
    ],
  },
  {
    id: 'entrees',
    name: 'Entrees',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    description: 'Classic Mexican dishes made for a legendary evening. Every entree comes with rice, beans, and a flour tortilla.',
    items: [
      { name: 'Cheese Enchiladas', description: 'Two corn tortillas stuffed with cheese, topped with red or green chile sauce', price: '$16' },
      { name: 'Combination Plate', description: 'One enchilada, one taco, one tamale — the full Casa Bonita classic', price: '$19' },
      { name: 'Chicken Burrito', description: 'Flour tortilla filled with grilled chicken, rice, beans, and queso', price: '$17' },
      { name: 'Carne Asada Tacos', description: 'Three street-style tacos with grilled steak, onion, cilantro, and salsa verde', price: '$20' },
      { name: 'Veggie Plate', description: 'Roasted vegetable burrito with seasoned black beans and Mexican rice', price: '$15' },
      { name: 'Kids\' Meal', description: 'Cheese quesadilla or chicken taco with a side of rice and a drink', price: '$10' },
    ],
  },
  {
    id: 'sopapillas',
    name: 'Sopapillas & Desserts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    description: 'No visit to Casa Bonita is complete without sopapillas — our most beloved tradition since 1974.',
    items: [
      { name: 'Sopapillas', description: 'Pillowy fried dough dusted with cinnamon sugar, served with honey. Endless refills!', price: '$7' },
      { name: 'Churros', description: 'Golden fried churros with cinnamon sugar and chocolate dipping sauce', price: '$8' },
      { name: 'Flan', description: 'Traditional Mexican custard with caramel sauce', price: '$7' },
      { name: 'Fried Ice Cream', description: 'Vanilla ice cream in a crispy shell with honey and whipped cream', price: '$9' },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks & Bar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6l1 9H8L9 3zm0 9a3 3 0 006 0M12 12v9m-3 0h6" />
      </svg>
    ),
    description: 'From frozen margaritas to Mexican Coke, we have the perfect drink to go with the show.',
    items: [
      { name: 'Casa Margarita', description: 'House margarita with fresh lime, triple sec, and your choice of tequila — on the rocks or frozen', price: '$13' },
      { name: 'Cadillac Margarita', description: 'Premium top-shelf margarita with Grand Marnier float', price: '$17' },
      { name: 'Mexican Beer', description: 'Modelo, Corona, Dos Equis, or Pacifico', price: '$7' },
      { name: 'Mexican Coke', description: 'Classic Coca-Cola made with real cane sugar, served in a glass bottle', price: '$5' },
      { name: 'Horchata', description: 'Creamy rice and cinnamon drink, served cold', price: '$5' },
    ],
  },
]

export default function MenuPage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>Menu</span>
          <h1>Food as legendary as the show</h1>
          <p className={styles.heroSubtitle}>
            Authentic Mexican cuisine crafted to complement an evening of wonder. Sopapillas, enchiladas, margaritas — and memories made at every table.
          </p>
        </div>
      </section>

      {/* Menu Sections */}
      <section className={styles.pricing}>
        <div className={styles.container}>
          <div className={styles.pricingGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {menuSections.map((section) => (
              <div
                key={section.id}
                className={styles.pricingCard}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.roleIcon}>{section.icon}</div>
                  <h3>{section.name}</h3>
                  <p>{section.description}</p>
                </div>
                <ul className={styles.featureList} style={{ marginTop: '1rem' }}>
                  {section.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span className={styles.checkIcon}>
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span style={{ flex: 1 }}>
                        <strong>{item.name}</strong>
                        <br />
                        <span style={{ fontSize: '0.8em', opacity: 0.7 }}>{item.description}</span>
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', flexShrink: 0 }}>{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trust Signals */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.trustIcon}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Endless sopapillas</span>
            </div>
            <div className={styles.trustItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.trustIcon}>
                <path d="M12 3v10m0 0c0 2-2 4-4 6m4-6c0 2 2 4 4 6M3 20h18" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Waterfall included with every meal</span>
            </div>
            <div className={styles.trustItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.trustIcon}>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Great for groups & families</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>FAQ</span>
          <h2>Good to know</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>Do I need a reservation?</h4>
              <p>Reservations are strongly recommended, especially on weekends and holidays. Walk-ins are welcome based on availability.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Is there a cover charge?</h4>
              <p>No cover charge — your ticket to the show is simply purchasing food. The entertainment is included with your meal.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Are sopapillas really endless?</h4>
              <p>Yes! Sopapillas are served continuously throughout your meal at no additional charge. It&apos;s one of our most beloved traditions.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Is Casa Bonita good for kids?</h4>
              <p>Absolutely. Casa Bonita was built for families. The cliff divers, caves, and entertainment are a magical experience for children of all ages.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Do you accommodate dietary restrictions?</h4>
              <p>Yes. We have vegetarian options and can accommodate common dietary needs. Please note any restrictions when making your reservation.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Where are you located?</h4>
              <p>We&apos;re at 6715 W Colfax Ave in Lakewood, Colorado — just minutes from downtown Denver. Look for the iconic pink tower!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>Ready to join us for dinner?</h2>
            <p>Reserve your table and experience Casa Bonita the way it was meant to be enjoyed.</p>
            <Link href="/contact" className="btn btn-primary" onClick={() => track('CTA Click', { label: 'Reserve a Table', location: 'menu-bottom' })}>
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

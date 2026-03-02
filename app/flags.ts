import { flag } from 'flags/next'

export const jobCards = flag({
  key: 'job-cards',
  defaultValue: true,
  decide() {
    return this.defaultValue as boolean
  },
})

export const inspections = flag({
  key: 'inspections',
  defaultValue: true,
  decide() {
    return this.defaultValue as boolean
  },
})

export const aiInvoices = flag({
  key: 'ai-invoices',
  defaultValue: true,
  decide() {
    return this.defaultValue as boolean
  },
})

export const fleetTracking = flag({
  key: 'fleet-tracking',
  defaultValue: true,
  decide() {
    return this.defaultValue as boolean
  },
})

export const analytics = flag({
  key: 'analytics',
  defaultValue: true,
  decide() {
    return this.defaultValue as boolean
  },
})

export const compliance = flag({
  key: 'compliance',
  defaultValue: true,
  decide() {
    return this.defaultValue as boolean
  },
})

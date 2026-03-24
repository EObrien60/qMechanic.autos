import type { Metadata } from 'next'
import FeaturesContent from './FeaturesContent'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Explore the Casa Bonita experience: the legendary waterfall, daring cliff divers, Black Bart\'s Cave, live entertainment, and authentic Mexican cuisine in Lakewood, Colorado.',
}

export default function FeaturesPage() {
  return <FeaturesContent />
}

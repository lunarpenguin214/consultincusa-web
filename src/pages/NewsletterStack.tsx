import { LandingPage } from '../components/LandingPage'
import { CONFIGS } from '../data/industryConfig'

export function NewsletterStack() {
  return <LandingPage config={CONFIGS.newsletter} />
}

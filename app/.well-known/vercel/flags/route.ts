import { createFlagsDiscoveryEndpoint, getProviderData } from 'flags/next'
import * as flags from '../../../flags'

export const GET = createFlagsDiscoveryEndpoint(() => {
  const providerData = getProviderData(flags)
  return { definitions: providerData.definitions, hints: providerData.hints }
})

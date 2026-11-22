import { emptyDetails, type Details } from '../types'

// Placeholder text for previews before the customer types anything.
export const sampleDetails: Details = {
  ...emptyDetails(),
  name: 'Your Name',
  description: 'Your description here',
  ability1: 'Thunder Smile',
  ability1Type: 'electric',
  ability2: 'Quick Pose',
  ability2Type: 'normal',
}

export const withSamples = (d: Details): Details => ({
  ...d,
  name: d.name || sampleDetails.name,
  description: d.description || sampleDetails.description,
  ability1: d.ability1 || sampleDetails.ability1,
  ability2: d.ability2 || sampleDetails.ability2,
})

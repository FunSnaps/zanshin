export type Discipline = 'grappling' | 'striking'
export type GrapplingSub = 'bjj' | 'wrestling' | 'judo'
export type StrikingSub = 'mt' | 'boxing' | 'kb'
export type Sub = GrapplingSub | StrikingSub

export type BjjBelt = 'white' | 'blue' | 'purple' | 'brown' | 'black'
export type WrestlingLevel = 'beginner' | 'intermediate' | 'advanced'
export type JudoBelt = 'white' | 'yellow' | 'orange' | 'green' | 'black'
export type StrikingLevel = 'beginner' | 'intermediate' | 'advanced' | 'elite'
export type Tier = BjjBelt | WrestlingLevel | JudoBelt | StrikingLevel

export interface Step {
  d: string   // description
  cue?: string
}

export interface Technique {
  name: string
  position: string
  steps: Step[]
}

// Composite key that identifies a technique uniquely: "grappling|bjj|white|0"
export type TechniqueKey = string

export interface TechniqueLog {
  technique_key: TechniqueKey
  notes: string
  logged: boolean
}

export interface TrainingSession {
  id: string
  date: string      // ISO date "YYYY-MM-DD"
  disc: string
  techs: string[]
  notes: string
}

// DB row types (subset of what Supabase returns)
export interface DbTechniqueLog {
  technique_key: string
  notes: string
  logged: boolean
}

export interface DbSession {
  id: string
  date: string
  disc: string
  techs: string[]
  notes: string
}

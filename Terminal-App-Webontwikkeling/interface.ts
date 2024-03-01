export interface Pokemon {
    id: number
    name: string
    description: string
    hp: number
    isActive: boolean
    releaseDate: string
    imageUrl: string
    rarity: string
    types: string[]
    weakness: string
    resistance: string
    attacks: Attack[]
    evolvesFrom?: string
    evolvesTo?: string
  }
  
  export interface Attack {
    id: number
    name: string
    description: string
    power: number
    accuracy: number
  }
  
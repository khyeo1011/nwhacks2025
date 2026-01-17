export interface Quest {
    questId: number
    prompt: string
    hostId: string
    date: number
}

export interface Participant {
    questId: number
    userId: string
    score: number
    time: number
    photo: any
}

export interface User {
    userId: string
    password: string
}

export interface QuestDetails {
    questId: number
    prompt: string
    hostId: string
    date: number
    winner: string
    participants: Participant[]
}
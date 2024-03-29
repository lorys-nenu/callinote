import { Note } from "./Note"

export type User = {
    id: string,
    email: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    notes?: Note[]
}
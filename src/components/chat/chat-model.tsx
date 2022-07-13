import {Timestamp} from "firebase/firestore"

export interface ChatMessageModel {
    uid?: string,
    createdAt?: Timestamp,
    displayName?: string | null,
    photoURL?: string | null,
    content: string
}
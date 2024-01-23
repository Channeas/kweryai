export interface Conversation {
    messages: Message[];
}

export interface Message {
    text: string;
    sentByUser: boolean;
}

export interface Message {
    id?: string;
    message_subject?: string;
    message_text?: string;
    message_month?: string;
    message_date?: string;
    message_time?: string;
    created_at?: number;
    user_id?: string;
    is_watch?: boolean;
    is_all?: boolean;
}
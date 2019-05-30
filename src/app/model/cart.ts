export interface Cart {
    id?: string;
    user_id?: string;
    menu_name?: string;
    price?: number;
    size?: string;
    created_at?: number;
    updated_at?: number;
    menu_id?: string;
    shop_id?: string;
    is_order?: boolean;
}
export interface Order {
    id: string;
    user_id?: string;
    order_name?: string;
    price?: number;
    size?: string;
    created_at?: number;
    updated_at?: number;
    is_paid?: boolean;
    is_make?: boolean;
    is_complete?: boolean;
    is_cancel?: boolean;
    order_month?: string;
    order_date?: string;
    order_time?: string;
    menu_id?: string;
    shop_id?: string;
}
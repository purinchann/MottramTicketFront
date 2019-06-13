export interface Menu {
    id?: string;
    name_jp?: string;
    name_en?: string;
    price_and_size?: string; //カンマ区切り 例) M490,L590
    image_url?: string;
    handling_shop_number?: string; //カンマ区切り 例) 1,2,3,4
    order_limit?: number;
    season_limit?: string; //* 例) 4・5月限定 *//
    is_sold_out?: boolean;
}

export interface StorageSettings {
    allow_overselling: boolean;
}

export interface MainGroup {
    id: number;
    title: string;
}

export interface Company {
    id: number;
    title: string;
    public_title: string;
    short_descr: string;
    logo: string;
    country_id: number;
    country: string;
    city_id: number;
    city: string;
    active: number;
    phone: string;
    phones: string[];
    timezone: number;
    timezone_name: string;
    schedule: string;
    address: string;
    coordinate_lat: number;
    coordinate_lon: number;
    app_ios: string;
    app_android: string;
    phone_confirmation: boolean;
    currency_short_title: string;
    reminds_sms_disabled: boolean;
    reminds_sms_default: number;
    group_priority: number;
    bookform_group_priority: number;
    description: string;
    photos: string[];
    seance_delay_step: number;
    show_any_master: boolean;
    allow_delete_record: boolean;
    allow_change_record: boolean;
    allow_change_record_delay_step: number;
    allow_delete_record_delay_step: number;
    timetable_off: boolean;
    site: string;
    zip: any;
    business_group_id: number;
    business_type_id: number;
    is_charge_active: boolean;
    print_bill_on: number;
    print_bill_type: string;
    record_type_id: number;
    auto_pay_account_id: number;
    auto_pay_bank_account_id: number;
    is_admin_app: number;
    push_notification_phone_confirm: number;
    switched_to_tariff: boolean;
    sms_enabled: boolean;
    activity_record_clients_count_max: number;
    activity_online_record_clients_count_max: number;
    storage_settings: StorageSettings;
    main_group_id: number;
    main_group: MainGroup;
    booking_comment_required: boolean;
    booking_email_required: boolean;
    booking_comment_input_name: string;
}

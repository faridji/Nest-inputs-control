export interface Department
{
    id: string;
    value: string;
    parent_id: string;
    parent_name: string;
    has_sub_category: boolean;
    showTemplate: boolean;
    level: number;

    children: Department[];
}
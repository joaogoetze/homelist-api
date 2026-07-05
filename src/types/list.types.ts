export type LocalUpdate = {
    id: number,
    server_id: number | null,
    name: string,
    owner_ids: number,
    created_at: string,
    updated_at: string | null,
    deleted_at: string | null,
    sync_status: 'created' | 'updated' | 'deleted'
};

export type LocalUpdates = LocalUpdate[];
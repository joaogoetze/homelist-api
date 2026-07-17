import { AppError } from '../errors/app.error';
import { ItemRepository } from '../repositories/item.repository';

export class ItemService {
    private itemRepository = new ItemRepository();

    async syncPull(userId: number, date: Date) {
        const changes = await this.itemRepository.getItemsByUpdatedDate(userId, date);
        return changes;
    }

    async syncPush(localUpdates: any) {

        console.log("Local updates", localUpdates);
        
        const finished = [];

        for (const list of localUpdates) {
            let res;

            if (list.sync_status === 'created') {
                res = await this.createItem(list.list_id, list.name, list.checked);
            } else if (list.sync_status === 'updated') {
                if (list.server_id) {
                    res = await this.updateItem(list.server_id, list.name, list.checked);
                    res??= list;
                    if (!res) res = list;
                } else {
                    res = await this.createItem(list.list_id, list.name, list.checked);
                }
            } else if (list.sync_status === 'deleted') {
                if (!list.server_id) {
                    res = list;
                } else {
                    res = await this.deleteItem(list.server_id);
                    res ??= list;
                }
            }

            console.log("list", list);
            
            res.local_id = list.id;
            finished.push(res);
        }

        return finished;

    }

    async getItemsByListId(listId: number) {
        const items = await this.itemRepository.getItemsByListId(listId);
        if (!items) throw new AppError('Itens não encontrados', 404);
        return items;
    }

    async createItem(listId: number, name: string, checked: boolean) {
        const item = await this.itemRepository.createItem(listId, name, checked);
        if (!item) throw new AppError('Erro ao criar item', 500);
        return item;
    }

    // async updateItemCheck(itemId: number, checked: boolean) {
    //     const item = await this.itemRepository.updateItemCheck(itemId, checked);
    //     if (!item) throw new AppError('Erro ao atualizar item', 500);
    //     return item;
    // }

    async updateItem(itemId: number, name: string, checked: boolean) {
        const item = await this.itemRepository.updateItem(itemId, name, checked);
        if (!item) throw new AppError('Erro ao atualizar item', 500);
        return item;
    }

    // async updateItemName(itemId: number, name: string) {
    //     const item = await this.itemRepository.updateItemName(itemId, name);
    //     if (!item) throw new AppError('Erro ao atualizar item', 500);
    //     return item;
    // }

    async deleteItem(itemId: number) {
        const item = await this.itemRepository.deleteItem(itemId);
        if (!item) throw new AppError('Erro ao excluir item', 500);
        return item;
    }
}
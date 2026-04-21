import { AppError } from '../errors/app.error';
import { ItemRepository } from '../repositories/item.repository';

export class ItemService {
    private itemRepository = new ItemRepository();

    async getItemsByListId(listId: number) {
        const items = await this.itemRepository.getItemsByListId(listId);
        if (!items) throw new AppError('Itens não encontrados', 404);
        return items;
    }

    async createItem(listId: number, name: string) {
        const item = await this.itemRepository.createItem(listId, name);
        if (!item) throw new AppError('Erro ao criar item', 500);
        return item;
    }

    async updateItemCheck(itemId: number, checked: boolean) {
        const item = await this.itemRepository.updateItemCheck(itemId, checked);
        if (!item) throw new AppError('Erro ao atualizar item', 500);
        return item;
    }

    async updateItemName(itemId: number, name: string) {
        const item = await this.itemRepository.updateItemName(itemId, name);
        if (!item) throw new AppError('Erro ao atualizar item', 500);
        return item;
    }

    async deleteItem(itemId: number) {
        const item = await this.itemRepository.deleteItem(itemId);
        if (!item) throw new AppError('Erro ao excluir item', 500);
        return item;
    }
}
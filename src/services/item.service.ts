import { ItemRepository } from '../repositories/item.repository';

export class ItemService {
    private itemRepository = new ItemRepository();

    async getItemsByListId(listId: number) {
        return this.itemRepository.getItemsByListId(listId);
    }

    async createItem(listId: number, name: string) {
        return this.itemRepository.createItem(listId, name);
    }

    async updateCheckItem(itemId: number, checked: boolean) {
        return this.itemRepository.updateCheckItem(itemId, checked);
    }

    async updateNameItem(itemId: number, name: string) {
        return this.itemRepository.updateNameItem(itemId, name);
    }

    async deleteItem(itemId: number) {
        return this.itemRepository.deleteItem(itemId);
    }
}
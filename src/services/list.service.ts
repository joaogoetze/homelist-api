import { ListRepository } from '../repositories/list.repository';

export class ListService {
    private listRepository = new ListRepository();

    async getListByOwnerId(userId: number) {
        return this.listRepository.getListByOwnerId(userId);
    }

    async createList(ownerId: number, name: string) {
        return this.listRepository.createList(ownerId, name);
    }

    async updateList(listId: number, name: string) {
        return this.listRepository.updateList(listId, name);
    }

    async deleteList(listId: number) {
        return this.listRepository.deleteList(listId);
    }
}
import { AppError } from '../errors/app.error';
import { ListRepository } from '../repositories/list.repository';

export class ListService {
    private listRepository = new ListRepository();

    async getListByOwnerId(userId: number) {
        const lists = await this.listRepository.getListByOwnerId(userId);
        if (!lists) throw new AppError('Listas não encontradas', 404);
        return lists;
    }

    async createList(ownerId: number, name: string) {
        const list = await this.listRepository.createList(ownerId, name);
        if (!list) throw new AppError('Erro ao criar lista', 500);
        return list;
    }

    async addListUser(listId: number, email: string) {
        const userId = await this.listRepository.getUserByEmail(email);
        if (!userId) throw new AppError('Usuário não encontrado', 404);
        
        const list = await this.listRepository.addListUser(listId, userId.id);
        if (!list) throw new AppError('Erro ao adicionar usuário à lista', 500);
        
        return list;
    }

    async updateListName(listId: number, name: string) {
        const list = await this.listRepository.updateListName(listId, name);
        if (!list) throw new AppError('Erro ao atualizar lista', 500);
        return list;
    }

    async deleteList(listId: number) {
        const list = await this.listRepository.deleteList(listId);
        if (!list) throw new AppError('Erro ao excluir lista', 500);
        return list;
    }
}
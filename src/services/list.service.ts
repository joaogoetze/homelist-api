import { AppError } from '../errors/app.error';
import { ListRepository } from '../repositories/list.repository';
import { UserRepository } from '../repositories/user.repository';
import { LocalUpdates } from '../types/list.types';

export class ListService {
    constructor(private listRepository: ListRepository, private userRepository: UserRepository) {}

    async syncPull(userId: number, date: Date) {
        const changes = await this.listRepository.getListsByUpdatedDate(userId, date);
        console.log("data", date);
        console.log("mudanças nas listas", changes);
        
        return changes;
    }

    async syncPush(localUpdates: LocalUpdates) { 
        const finished = [];
        
        for (const list of localUpdates) {
            let res;

            if (list.sync_status === 'created') {
                res = await this.createList(list.owner_ids, list.name);        
            } else if (list.sync_status === 'updated') {
                if (list.server_id) {
                    res = await this.updateList(list.server_id, list.name);
                    res ??= list;
                    if (!res) res = list;
                } else {
                    res = await this.createList(list.owner_ids, list.name);
                }
            } else if (list.sync_status === 'deleted') {
                if (!list.server_id) {
                    res = list
                } else {
                    res = await this.deleteList(list.server_id);
                    res ??= list;
                }
            }

            res.local_id = list.id;
            finished.push(res);
        }
        
        return finished;
    }

    async createList(ownerId: number, name: string) {
        const list = await this.listRepository.createList(ownerId, name);
        if (!list) throw new AppError('Erro ao criar lista', 500);
        
        return list;
    }

    async updateList(listId: number, name: string) {
        const updatedList = await this.listRepository.updateList(listId, name);
        if (!updatedList) throw new AppError('Erro ao atualizar lista', 500);
        
        return updatedList;
    }

    async deleteList(listId: number) {
        return await this.listRepository.deleteList(listId);        
    }

    async addListUser(listId: number, email: string) {
        const userId = await this.userRepository.getUserByEmail(email);
        if (!userId) throw new AppError('Usuário não encontrado', 404);
        
        const list = await this.listRepository.addListUser(listId, userId.id);
        if (!list) throw new AppError('Erro ao adicionar usuário à lista', 500);    
        
        return list;
    }
}
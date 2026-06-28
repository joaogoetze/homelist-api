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

    async sync(changes: any) {

        console.log("Mudanças", changes);
        

        //função para ordernar por criação, update e delete

        let position = 0;
        const finished: any[] = [];
        const changess = await this.syncLists(changes, position, finished);
        console.log("Mudanças prontas para retornar");
        console.log("Retornar:", changess);
        
                
        return changess;

    }

    private async syncLists (lists:any, position:number, finished: any[]) : Promise<any[]>{

        if (position >= lists.length) {
            console.log("Cabou");
            
            return finished;
        }
        
        let res;
        
        const list = lists[position];

        //tratar caso de ser update ou delete mas não ter server id, casos:
        //user criou e editou -> depois foi sincar
        //user criou e deletou

        if (list.sync_status == 'created') {
            console.log("Criar lista");
            res = await this.createList(list.owner_ids, list.name);        
        }
        if (list.sync_status == 'updated') {
            if (list.server_id) {
                res = await this.updateListName(list.server_id, list.name);
            if (!res) res = list;
            } else {
                res = await this.createList(list.owner_ids, list.name);
            }
            
        }   
        if (list.sync_status == 'deleted') {
            if (!list.server_id) {
                res = list
            } else {
                res = await this.deleteList(list.server_id);
            }
            if (!res) {
                res = list;
            }
        }

        res.local_id = list.id;
        finished.push(res);

        position++;
        return this.syncLists(lists, position, finished);
    }

    async deleteList(listId: number) {
        const list = await this.listRepository.deleteList(listId);        
        //if (!list) throw new AppError('Erro ao excluir lista', 500); 
        return list;
    }

    async getNewData(userId: number, date: Date) {
        const changes = await this.listRepository.getNewData(userId, date);

        return changes;
    }
    
}


import { ListRepository } from '../repositories/list.repository';

export class ListService {
    private listRepositoy = new ListRepository();

    async list() {
        return this.listRepositoy.findAll();
    }
}
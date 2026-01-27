import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository = new UserRepository();

    async list() {
        return this.userRepository.findAll();
    }
}
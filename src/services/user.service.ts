import { AppError } from '../errors/app.error';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
    private userRepository = new UserRepository();

    async getMyUserInfo(userId: number) {
        const user = await this.userRepository.getMyUserInfo(userId);
        if (!user) throw new AppError('user not found', 404);
        return user;
    }
}
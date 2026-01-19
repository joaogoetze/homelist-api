import { UserRepository } from '../repositories/UserRepository';

interface CreateUserDTO {
  email: string;
  name?: string;
}

export class UserService {
  private userRepository = new UserRepository();

  async list() {
    return this.userRepository.findAll();
  }

  async create(data: CreateUserDTO) {
    if (!data.email) {
      throw new Error('Email is required');
    }

    return this.userRepository.create(data);
  }
}

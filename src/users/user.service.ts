import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    public constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument> 
    ) {

    }

    public create(user: User): Promise<User & UserDocument> {
        return this.userModel.create(user);
    }

    public async userExists(email: string): Promise<boolean> {
        return this.userModel.exists({ email });
    }

    public async findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    public async findById(id: string) {
        return this.userModel.findOne({ id });
    }
}

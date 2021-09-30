import { Injectable, PayloadTooLargeException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/users/user.service";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userUservice: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: any) {
        const userId = payload.sub;
        const user = await this.userUservice.findById(userId);

        const userData = user.toObject();
        delete userData.password;

        return userData;
    }
}
import { AuthGuard } from "@nestjs/passport";

export class JwtSecure extends AuthGuard('jwt') {
    constructor() {
        super();
    }
}

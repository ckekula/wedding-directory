import { AuthGuard } from "@nestjs/passport";


export class JwtAuthGuard extends AuthGuard('jwt'){}


//for use with rest api
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthSignUpUserDto } from './dto/auth-sign-up-user.dto';
import { AuthSignInUserDto } from './dto/auth-sign-in-user.dto';
import { Role } from './enums/role.enum';
import { UserService } from 'src/user/user.service';
import { CompanyService } from 'src/company/company.service';
import { User } from 'src/user/user.schema';
import { Company } from 'src/company/company.schema';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private companyService: CompanyService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        let user: User | Company = await this.userService.getUserByEmail(email);
        if (user == null) {
            user = await this.companyService.getCompanyByEmail(email);

            if (user == null) {
                throw new NotFoundException();
            }
            else {
                const passwordCorrect = await this.companyService.comparePassword(pass, user._id);
                if (passwordCorrect) {
                    const { password, ...result } = user;
                    return result;
                }
                return null;
            }
        }
        else {
            const passwordCorrect = await this.userService.comparePassword(pass, user._id);
            if (passwordCorrect) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
    }

    async signUp(signUpDto: AuthSignUpUserDto): Promise<any> {
        let user = await this.userService.getUserByEmail(signUpDto.email);
        if (user == null) {
            user = new User();
            user.email = signUpDto.email;
            user.name = signUpDto.name;
            user.surname = signUpDto.surname;
            user.phone = signUpDto.phone;
            user.type = Role.User;

            await user.setPassword(signUpDto.password);

            user = await this.userService.createUser(user);
            const payload = { sub: user._id, type: user.type };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        else {
            throw new NotFoundException();
        }
    }

    async signIn(signInDto: AuthSignInUserDto): Promise<any> {
        let user: User | Company = await this.userService.getUserByEmail(signInDto.email);
        if (user == null) {
            user = await this.companyService.getCompanyByEmail(signInDto.email);
        }

        const payload = { sub: user._id, type: user.type };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
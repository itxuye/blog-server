import { ValidateIf, IsString, IsInt, IsEmail } from 'class-validator';
export class CommentDto {
    // 登录用户只需填写 userId，游客必填内容为姓名 / 邮箱 / 内容
    readonly userId: number;
    readonly parentId: number;

    ip: string;
    type: number;
    readonly articleId: number;

    // @ValidateIf(o => o.userId === null)
    @IsString()
    readonly name: string;

    // @ValidateIf(o => o.userId === null)
    @IsEmail()
    readonly email: string;

    content: string;

    readonly website: string;
}
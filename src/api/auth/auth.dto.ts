import { IsNotEmptyString } from '@common';

export class AuthorizeBody {
  @IsNotEmptyString()
  readonly clientId!: string;
}

export class LoginBody {
  @IsNotEmptyString()
  readonly username!: string;

  @IsNotEmptyString()
  readonly password!: string;
}

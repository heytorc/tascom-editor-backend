export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  companies: string[];
  active: boolean;
}

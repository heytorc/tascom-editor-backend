export class CreateUserDto {
  name: string;
  username: string;
  email: string;
  password: string;
  system_id: string;
  companies: string[];
  active: boolean;
}

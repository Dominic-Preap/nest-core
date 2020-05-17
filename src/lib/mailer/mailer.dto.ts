import { IsIn, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class MailerConfig {
  @IsNotEmpty()
  @IsString()
  @IsIn(['ethereal', 'gmail', 'mandrill'])
  MAILER_TYPE!: 'ethereal' | 'gmail' | 'mandrill';

  // ============================================
  // ETHEREAL EMAIL
  // ============================================
  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => o.MAILER_TYPE === 'ethereal')
  MAILER_ETHEREAL_USERNAME!: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => o.MAILER_TYPE === 'ethereal')
  MAILER_ETHEREAL_PASSWORD!: string;

  // ============================================
  // GMAIL EMAIL
  // ============================================
  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => o.MAILER_TYPE === 'gmail')
  MAILER_GMAIL_USERNAME!: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => o.MAILER_TYPE === 'gmail')
  MAILER_GMAIL_PASSWORD!: string;

  // ============================================
  // MANDRILL EMAIL
  // ============================================
  @IsNotEmpty()
  @IsString()
  @ValidateIf(o => o.MAILER_TYPE === 'mandrill')
  MAILER_MANDRILL_API_KEY!: string;
}

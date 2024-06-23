import z from "zod";

export const requiredPhrase = 'Field is required';

export const emailSchema = z.string().min(1, requiredPhrase).email();

export const phoneCodeSchema = z
  .string()
  .min(1, requiredPhrase)
  .max(4, 'Phone code is out of range')
  .transform(Number);

export const phoneNumberSchema = z
  .string()
  .min(1, requiredPhrase)
  .max(15, 'Phone number is out of range')
  .transform(Number);

export const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .regex(/^(?=.*[A-Za-z])(?=.*\d).*$/, 'Password must contain at least one letter and a number')
  .min(8, 'Password must be at least 8 characters');

export const signInPasswordSchema = z
  .string()
  .min(1, 'Password is required');

export const checkboxSchema = z.string().transform(Boolean);

export const optionalCheckboxSchema = z.string().optional().transform(Boolean);

export const dropdownSchema = z.string().min(1, requiredPhrase);

export const companyTypeSchema = z.string().min(1, 'Select company type');

export const countrySchema = z.string().min(1, 'Select country');

export const textInputSchema = z.string().min(1, requiredPhrase);

export const textInputOptionalSchema = z.string().optional();

export const dobISOStringSchema = z.string().refine((value) => {
  const current = new Date(value);
  if (current.toString() === 'Invalid Date') {
    return false;
  }
  const currentString = current.toISOString();

  return currentString.split('T')[0] === value;
}, {
  message: 'Date is invalid',
}).refine((value) => {
  const current = new Date(value);
  const currentMs = current.getTime();

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 18);
  const minDateMs = minDate.getTime();

  return currentMs < minDateMs
}, {
  message: 'You must be at least 18 years old',
}).refine((value) => {
  const current = new Date(value);
  const currentMs = current.getTime();

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 100);
  const maxDateMs = maxDate.getTime();

  return maxDateMs < currentMs
}, {
  message: 'Birth date is out of range',
})

export const bicSchema = z
  .string()
  .transform((val) => val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())
  .refine(
    (val) => /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(val),
    'Invalid BIC/SWIFT code'
  );

export const ibanSchema = z
  .string()
  .transform((val) => val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase())
  .refine(
    (val) => /^[A-Z0-9]{14,34}$/.test(val),
    'The IBAN can only be 14 to 34 characters long'
  );

export const sortCodeSchema = z.string().regex(/^\s*-?[0-9]{1,2}\s*$/);

export const accountNumberSchema = z
  .string()
  .transform((val) => val.replace(/[^a-zA-Z0-9]/g, ''))
  .refine(
    (val) => /^\s*-?[0-9]{8}\s*$/.test(val),
    'The account number must contain 8 digits'
  );

export const userTitleSchema = z.string().min(1, 'Title required');

export const transferDetailsSchema = z
  .string()
  .min(1, requiredPhrase)
  .max(18, 'Reference is up to 18 characters')
  .regex(/^[a-zA-Z0-9 \-/?:().+#=!%&*<>;{@"']{1,18}$/, 'Input contains invalid symbols');

export const templateNameSchema = z
  .string()
  .min(1, requiredPhrase)
  .max(30, 'Template name is up to 30 characters');

export const templateNameOptionalSchema = templateNameSchema
  .optional()
  .or(z.literal(''));

export const passwordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string()
      .min(1, requiredPhrase),
  })
  .refine(({ confirmPassword, password }) =>
      confirmPassword === password,
    {
      message: 'The passwords did not match',
      path: ['confirmPassword'],
    }
  );

export const taxNumberSchema = z
  .string()
  .min(7)
  .max(16)
  .optional()
  .or(z.literal(''));
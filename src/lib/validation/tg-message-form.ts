import z from 'zod'

// --- Telegram message
export const makeFormMessageSchema = (t: (key: string) => string) =>
  z.object({
    userMessage: z
      .string({ message: t('fieldRequired') })
      .trim()
      .min(1, { message: t('fieldRequired') })
      .nonempty({ message: t('fieldRequired') })
      .min(10, {
        message: t('messageMin'),
      })
      .max(500, {
        message: t('messageMax'),
      }),
    contactInfo: z
      .string()
      .trim()
      .min(1, { message: t('contactRequired') })
      .max(150, { message: t('contactMax') }),
  })

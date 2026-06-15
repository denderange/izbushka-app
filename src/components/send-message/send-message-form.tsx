"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import { toast } from "sonner"
import { z } from "zod"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { RiMailSendFill } from "react-icons/ri"
import { useTranslations } from "next-intl"
import { makeFormMessageSchema } from "@/lib/validation/tg-message-form"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

type Props = {
  userName: string
  userEmail: string
  onSuccess?: () => void
}

export function SendMessageForm({ userName, userEmail, onSuccess }: Props) {
  const tForm = useTranslations("messagePage")
  const tButton = useTranslations("Buttons")
  const tZod = useTranslations("zodMessages")

  const schema = makeFormMessageSchema(tZod)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      userMessage: "",
      contactInfo: "",
    },
  })

  const honeypotRef = useRef<HTMLInputElement>(null)

  async function onSubmit(data: z.infer<typeof schema>) {
    console.log("userName, userEmail: ", userName, userEmail)
    if (honeypotRef.current?.value) return

    const payload = {
      message: `👽 ${userName}\n${userEmail}\n▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n ${data.userMessage}\n▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁\n 📲 Контакт пользователя:\n\n ${data.contactInfo}\n\n`,
    }

    const response = await fetch("/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      toast.success(tForm("messageSent"), {
        description: data.userMessage,
      })
      form.reset()
      onSuccess?.()
    } else {
      const res = await response.json()
      toast.error(res.error || tForm("sendFailed"))
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Honeypot */}
        <input
          ref={honeypotRef}
          type="text"
          name="phone"
          autoComplete="off"
          tabIndex={-1}
          className="hidden"
        />

        {/* Message */}
        <Controller
          control={form.control}
          name="userMessage"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-0">
              <div className="flex items-center">
                <FieldLabel htmlFor={field.name}>{tForm("message")}</FieldLabel>

                <div className="ml-auto text-xs">
                  <span
                    className={cn(
                      "pr-1 font-bold",
                      (field.value?.length || 0) > 500 ? "text-rose-600" : "text-stone-600",
                    )}
                  >
                    {field.value?.length || 0}
                  </span>
                  <span className="text-stone-600">/500</span>
                </div>
              </div>

              <TextareaAutosize
                {...field}
                id={field.name}
                minRows={3}
                maxRows={10}
                placeholder={tForm("text")}
                aria-invalid={fieldState.invalid}
                className={cn(
                  "w-full resize-none rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm",
                  "text-stone-800 placeholder-stone-400",
                  "focus-visible:border-stone-400 focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:outline-none",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "transition",
                )}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Contact */}
        <Controller
          control={form.control}
          name="contactInfo"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-0">
              <FieldLabel htmlFor={field.name}>{tForm("contact")}</FieldLabel>
              <div className="mb-2 text-xs text-stone-600">{tForm("negation")}</div>
              <TextareaAutosize
                {...field}
                id={field.name}
                minRows={2}
                maxRows={4}
                placeholder={tForm("example")}
                aria-invalid={fieldState.invalid}
                className={cn(
                  "w-full resize-none rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm",
                  "text-stone-800 placeholder-stone-400",
                  "focus-visible:border-stone-400 focus-visible:ring-1 focus-visible:ring-stone-400 focus-visible:outline-none",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "transition",
                )}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Кнопка отправки */}
      <Button
        type="submit"
        size="sm"
        disabled={form.formState.isSubmitting}
        className="mt-6 w-full"
      >
        <RiMailSendFill className="h-6 w-6" />
        {form.formState.isSubmitting ? tButton("sending") : tButton("Send")}
      </Button>
    </form>
  )
}

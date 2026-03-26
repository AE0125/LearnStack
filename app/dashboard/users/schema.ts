import { z } from "zod"

export const createUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(["STUDENT", "TUTOR", "ADMIN"]),
  groupId: z.string().optional().nullable(),
  count: z.coerce.number().min(1, "At least 1 user.").max(50, "Maximum 50 users at once.").default(1),
  startMemberId: z.coerce.number().min(1, "Must be at least 1.").default(1),
}).superRefine((data, ctx) => {
  if (data.count === 1) {
    if (!data.name || data.name.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Name must be at least 2 characters.",
        path: ["name"],
      });
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid email address.",
        path: ["email"],
      });
    }
  } else {
    if (!data.groupId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Group is required for batch creation.",
        path: ["groupId"],
      });
    }
  }
})

export type CreateUserFormValues = z.infer<typeof createUserSchema>
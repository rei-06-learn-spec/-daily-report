import { z } from "zod";

const bookSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(200),
  authors: z.array(z.string().min(1)),
  publishedYear: z.number().int().min(1900).max(2027),
  pages: z.number().int().min(1),
  isbn: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z
      .string()
      .regex(/^\d{10}$|^\d{13}$/, "ISBNは10桁か13桁")
      .optional()
  ),
  description: z.string().min(1).max(1000),
  tags: z
    .array(z.string().min(1))
    .refine((tags) => new Set(tags).size === tags.length, {
      message: "重複したタグは使えません",
    }),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  status: z.enum(["unread", "reading", "finished", "abandoned"]),
  saleUrl: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.string().check(z.url()).optional()
  ),
  imagePath: z.string().optional(),
  createdAt: z.iso.datetime(),
});

export default bookSchema;
export type Book = z.infer<typeof bookSchema>;

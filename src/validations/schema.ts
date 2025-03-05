import { z } from "zod";

// validation check
export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]), // enum타입으로 income or expense가 들어가야함
  date: z.string().min(1, { message: "日付は必須です" }), // 최소 한글자의 값이 들어가야한다는 뜻
  amount: z.number().min(1, { message: "金額は1￥以上である必要があります。" }), // 최소 1이상이어야함
  content: z
    .string()
    .min(1, { message: "内容を入力してください。" })
    .max(50, { message: "内容は50文字以内にしてください。" }),
  category: z
    .union([
      z.enum(["食費", "日用品", "交際費", "住居費", "共通費", "娯楽"]),
      z.enum(["給与", "副収入", "お小遣い"]),
      z.literal(""),
    ])
    .refine((val) => val !== "", { message: "カテゴリを選択してください。" }),
});

export type Schema = z.infer<typeof transactionSchema>;

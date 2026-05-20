import type { BookFormInput } from "@/schemas/bookForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import bookFormSchema from "@/schemas/bookForm";

type Props = {
  onSubmit: (data: BookFormInput) => void;
};

const BookForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormInput>({ resolver: zodResolver(bookFormSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      <div>
        <label>タイトル</label>
        <input {...register("title")} className="border w-full" />
        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
      </div>

      {/* カンマ区切りで複数入力 → 配列に変換 */}
      <div>
        <label>著者（複数の場合はカンマ区切り）</label>
        <input
          {...register("authors", {
            setValueAs: (v: string) =>
              v.split(",").map((s) => s.trim()).filter(Boolean),
          })}
          className="border w-full"
        />
        {errors.authors && <p className="text-red-600 text-sm">{errors.authors.message}</p>}
      </div>

      <div>
        <label>出版年</label>
        <input
          type="number"
          {...register("publishedYear", { valueAsNumber: true })}
          className="border w-full"
        />
        {errors.publishedYear && <p className="text-red-600 text-sm">{errors.publishedYear.message}</p>}
      </div>

      <div>
        <label>ページ数</label>
        <input
          type="number"
          {...register("pages", { valueAsNumber: true })}
          className="border w-full"
        />
        {errors.pages && <p className="text-red-600 text-sm">{errors.pages.message}</p>}
      </div>

      <div>
        <label>難易度</label>
        <select {...register("difficulty")} className="border w-full">
          <option value="beginner">初級</option>
          <option value="intermediate">中級</option>
          <option value="advanced">上級</option>
        </select>
        {errors.difficulty && <p className="text-red-600 text-sm">{errors.difficulty.message}</p>}
      </div>

      <div>
        <label>読書状態</label>
        <select {...register("status")} className="border w-full">
          <option value="unread">未読</option>
          <option value="reading">読書中</option>
          <option value="finished">読了</option>
          <option value="abandoned">積読</option>
        </select>
        {errors.status && <p className="text-red-600 text-sm">{errors.status.message}</p>}
      </div>

      {/* カンマ区切りで複数入力 → 配列に変換 */}
      <div>
        <label>タグ（カンマ区切り）</label>
        <input
          {...register("tags", {
            setValueAs: (v: string) =>
              v.split(",").map((s) => s.trim()).filter(Boolean),
          })}
          className="border w-full"
        />
        {errors.tags && <p className="text-red-600 text-sm">{errors.tags.message}</p>}
      </div>

      <div>
        <label>説明</label>
        <textarea {...register("description")} className="border w-full" rows={4} />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label>ISBN（任意）</label>
        <input {...register("isbn")} className="border w-full" />
        {errors.isbn && <p className="text-red-600 text-sm">{errors.isbn.message}</p>}
      </div>

      <div>
        <label>販売URL（任意）</label>
        <input {...register("saleUrl")} className="border w-full" />
        {errors.saleUrl && <p className="text-red-600 text-sm">{errors.saleUrl.message}</p>}
      </div>

      <div>
        <label>画像パス（任意）</label>
        <input {...register("imagePath")} className="border w-full" />
        {errors.imagePath && <p className="text-red-600 text-sm">{errors.imagePath.message}</p>}
      </div>

      <button type="submit" className="border px-4 py-2">追加</button>
    </form>
  );
};

export default BookForm;

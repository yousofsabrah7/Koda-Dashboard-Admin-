import React from "react";
import { Plus, X } from "lucide-react";

function ProductFormFields({
  categories,
  brands,
  formData,
  errors,
  onChange,
  isLoading,
  onCancel,
  tagInput,
  setTagInput,
  onAddTag,
  onRemoveTag,
  submitLabel = "Create Product",
}) {
  const inputBaseClass =
    "w-full h-12 rounded-xl border bg-surface-base px-3.5 text-sm text-text-primary outline-none transition-all placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-60";
  const getInputClass = (fieldName) =>
    `${inputBaseClass} ${
      errors?.[fieldName]
        ? "border-red-500/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
        : "border-border-subtle focus:border-accent focus:ring-2 focus:ring-accent/10"
    }`;

  const labelClass = "mb-2 block text-xs font-semibold text-text-secondary";

  const errorClass = "mt-1.5 block text-xs text-red-500";

  return (
    <div className="flex w-full flex-col">
      <div className="mb-5">
        <label className={labelClass}>Product Name</label>

        <input
          type="text"
          name="name"
          value={formData?.name || ""}
          onChange={onChange}
          placeholder="iPhone 16 Pro"
          className={getInputClass("name")}
          disabled={isLoading}
        />

        {errors?.name && <span className={errorClass}>{errors.name}</span>}
      </div>

      <div className="mb-5">
        <label className={labelClass}>Short Description</label>

        <textarea
          name="shortDesc"
          value={formData?.shortDesc || ""}
          onChange={onChange}
          rows="2"
          placeholder="Minimum 10 characters"
          className={`${getInputClass(
            "shortDesc",
          )} h-auto resize-none py-3 leading-6`}
          disabled={isLoading}
        />

        {errors?.shortDesc && (
          <span className={errorClass}>{errors.shortDesc}</span>
        )}
      </div>

      <div className="mb-5">
        <label className={labelClass}>Description</label>

        <textarea
          name="description"
          value={formData?.description || ""}
          onChange={onChange}
          rows="4"
          placeholder="Minimum 20 characters"
          className={`${getInputClass(
            "description",
          )} min-h-[110px] h-auto resize-none py-3 leading-6`}
          disabled={isLoading}
        />

        {errors?.description && (
          <span className={errorClass}>{errors.description}</span>
        )}
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Price</label>

          <input
            type="number"
            name="price"
            value={formData?.price || ""}
            onChange={onChange}
            placeholder="0.00"
            className={getInputClass("price")}
            disabled={isLoading}
          />

          {errors?.price && <span className={errorClass}>{errors.price}</span>}
        </div>

        <div>
          <label className={labelClass}>Discount Price</label>

          <input
            type="number"
            name="discountPrice"
            value={formData?.discountPrice || ""}
            onChange={onChange}
            placeholder="0.00"
            className={getInputClass("discountPrice")}
            disabled={isLoading}
          />

          {errors?.discountPrice && (
            <span className={errorClass}>{errors.discountPrice}</span>
          )}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Stock</label>

          <input
            type="number"
            name="stock"
            value={formData?.stock || ""}
            onChange={onChange}
            placeholder="0"
            className={getInputClass("stock")}
            disabled={isLoading}
          />

          {errors?.stock && <span className={errorClass}>{errors.stock}</span>}
        </div>

        <div>
          <label className={labelClass}>SKU</label>

          <input
            type="text"
            name="sku"
            value={formData?.sku || ""}
            onChange={onChange}
            placeholder="SKU code"
            className={getInputClass("sku")}
            disabled={isLoading}
          />

          {errors?.sku && <span className={errorClass}>{errors.sku}</span>}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Category</label>

          <select
            name="category"
            value={formData?.category || ""}
            onChange={onChange}
            className={`${getInputClass("category")} cursor-pointer`}
            disabled={isLoading}
          >
            <option value="" hidden>
              Category
            </option>
            {categories?.map((category) => (
              <option value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Subcategory</label>

          <input
            type="text"
            name="subcategory"
            value={formData?.subcategory || ""}
            onChange={onChange}
            placeholder="Subcategory"
            className={getInputClass("subcategory")}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="mb-5">
        <label className={labelClass}>Brand</label>

        <input
          type="text"
          name="brand"
          value={formData?.brand || ""}
          onChange={onChange}
          placeholder="Brand name"
          className={getInputClass("brand")}
          disabled={isLoading}
        />
        <p className="divide divide-x">
          {brands?.map((brand) => (
            <span className="text-xs text-text-muted px-1.5"> {brand}</span>
          ))}
        </p>
      </div>

      <div className="mb-6">
        <label className={labelClass}>Tags</label>

        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput || ""}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Type a tag and press +"
            className={`${inputBaseClass} flex-1`}
            disabled={isLoading}
          />

          <button
            type="button"
            onClick={onAddTag}
            disabled={isLoading}
            aria-label="Add tag"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-white transition-all hover:bg-accent-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Tags List */}
        {formData?.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent-light px-2.5 py-1.5 text-xs font-medium text-accent"
              >
                {tag}

                <button
                  type="button"
                  onClick={() => onRemoveTag(tag)}
                  disabled={isLoading}
                  aria-label={`Remove ${tag}`}
                  className="rounded-md p-0.5 text-accent transition hover:bg-accent/10 hover:text-red-500 disabled:cursor-not-allowed"
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        )}

        <span className="mt-2 block text-xs leading-5 text-text-muted">
          Add two or more tags to organize the product.
        </span>
      </div>

      {/* Featured + Active */}
      <div className="mb-6 flex flex-wrap gap-x-6 gap-y-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-text-secondary">
          <input
            type="checkbox"
            name="featured"
            checked={formData?.featured || false}
            onChange={onChange}
            disabled={isLoading}
            className="h-4 w-4 cursor-pointer accent-[var(--color-accent)] disabled:cursor-not-allowed"
          />
          Featured
        </label>

        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-text-secondary">
          <input
            type="checkbox"
            name="active"
            checked={formData?.active ?? true}
            onChange={onChange}
            disabled={isLoading}
            className="h-4 w-4 cursor-pointer accent-[var(--color-accent)] disabled:cursor-not-allowed"
          />
          Active
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse gap-3 border-t border-border-subtle pt-5 sm:flex-row sm:justify-end">
        {/* Cancel */}
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="h-11 rounded-xl border border-border-subtle bg-surface-elevated px-5 text-sm font-semibold text-text-secondary transition-all hover:border-border-strong hover:bg-surface-card hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="h-11 rounded-xl bg-accent px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-accent-hover active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? submitLabel + " ..." : submitLabel}
        </button>
      </div>
    </div>
  );
}

export default ProductFormFields;

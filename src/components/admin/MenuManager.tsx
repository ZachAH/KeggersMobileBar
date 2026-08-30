import { type FormEvent, useRef, useState } from 'react'
import { menuColors } from '../../data/menu'
import {
  useCreateMenuItem,
  useDeleteMenuItem,
  useMenuItems,
  useToggleFavorite,
  useUpdateMenuItem,
} from '../../hooks/useMenuItems'
import type { MenuItem } from '../../types/menuItem'

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const MAX_FAVORITES = 3

const inputClass = 'rounded border border-noir/20 bg-white px-3 py-2 text-noir focus:border-crimson focus:outline-none'

const emptyForm = {
  name: '',
  ingredientsText: '',
  color: menuColors[0].value,
}

export function MenuManager() {
  const { data: items, isLoading } = useMenuItems()
  const createMenuItem = useCreateMenuItem()
  const updateMenuItem = useUpdateMenuItem()
  const deleteMenuItem = useDeleteMenuItem()
  const toggleFavorite = useToggleFavorite()

  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [existingImage, setExistingImage] = useState<{ url: string; path: string | null } | null>(
    null,
  )
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [favoriteError, setFavoriteError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const isSaving = createMenuItem.isPending || updateMenuItem.isPending

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setExistingImage(null)
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function startEdit(item: MenuItem) {
    setEditingId(item.id)
    setForm({
      name: item.name,
      ingredientsText: item.ingredients.join('\n'),
      color: item.color,
    })
    setExistingImage(item.image_url ? { url: item.image_url, path: item.image_path } : null)
    setImageFile(null)
    setImagePreview(null)
    setError(null)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setError(null)

    if (file && file.size > MAX_IMAGE_BYTES) {
      setError('Image is too large — please choose one under 5MB.')
      setImageFile(null)
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    setImageFile(file)
    setImagePreview(file ? URL.createObjectURL(file) : null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    const ingredients = form.ingredientsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)

    if (ingredients.length === 0) {
      setError('Add at least one ingredient (one per line).')
      return
    }

    try {
      if (editingId) {
        await updateMenuItem.mutateAsync({
          id: editingId,
          name: form.name,
          ingredients,
          color: form.color,
          favorite: items?.find((i) => i.id === editingId)?.favorite ?? false,
          imageFile,
          existingImagePath: existingImage?.path ?? null,
        })
      } else {
        await createMenuItem.mutateAsync({
          name: form.name,
          ingredients,
          color: form.color,
          favorite: false,
          imageFile,
        })
      }
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save drink.')
    }
  }

  function handleToggleFavorite(item: MenuItem) {
    setFavoriteError(null)
    if (!item.favorite) {
      const currentFavorites = items?.filter((i) => i.favorite).length ?? 0
      if (currentFavorites >= MAX_FAVORITES) {
        setFavoriteError(
          `Only ${MAX_FAVORITES} drinks can be featured on the landing page — unfavorite one first.`,
        )
        return
      }
    }
    toggleFavorite.mutate({ id: item.id, favorite: !item.favorite })
  }

  const previewSrc = imagePreview ?? existingImage?.url ?? null

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-noir">Manage Menu</h2>
      <p className="mt-1 text-sm text-noir/60">
        Star up to {MAX_FAVORITES} drinks to feature them on the landing page.
      </p>
      <p className="mt-1 text-sm text-noir/60">
        Made a typo or want to swap a photo? Click <span className="text-crimson">Edit</span> on
        the drink below — no need to delete and re-add it.
      </p>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`mt-3 flex flex-col gap-3 rounded-lg border bg-white p-4 shadow-sm transition-colors ${
          editingId ? 'border-crimson/60' : 'border-noir/10'
        }`}
      >
        <h3 className="font-semibold text-noir">{editingId ? 'Edit drink' : 'Add a drink'}</h3>
        <input
          placeholder="Drink name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className={inputClass}
        />
        <textarea
          placeholder="Ingredients — one per line"
          value={form.ingredientsText}
          onChange={(e) => setForm({ ...form, ingredientsText: e.target.value })}
          required
          rows={4}
          className={inputClass}
        />
        <label className="text-sm font-medium text-noir">
          Photo (optional)
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-noir/70 file:mr-3 file:rounded file:border-0 file:bg-crimson file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-noir"
          />
        </label>
        <p className="text-xs text-noir/50">
          If you're uploading an image for the favorites page, please remove the background before
          uploading.
        </p>
        {previewSrc && (
          <img src={previewSrc} alt="Selected preview" className="h-24 w-24 rounded object-cover" />
        )}

        {error && <p className="text-sm text-crimson">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSaving}
            className="self-start rounded bg-crimson px-4 py-2 text-white transition-colors hover:bg-noir disabled:opacity-50"
          >
            {isSaving ? 'Saving…' : editingId ? 'Update drink' : 'Add drink'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="self-start rounded border border-noir/30 px-4 py-2 text-noir transition-colors hover:bg-noir/5"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {favoriteError && <p className="mt-3 text-sm text-crimson">{favoriteError}</p>}
      {isLoading && <p className="mt-3 text-noir/70">Loading…</p>}
      {items && items.length === 0 && (
        <p className="mt-3 text-sm text-noir/60">No drinks on the menu yet.</p>
      )}

      <ul className="mt-3 space-y-3">
        {items?.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-4 rounded-lg border border-noir/10 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-14 w-14 shrink-0 rounded object-cover"
                />
              )}
              <div>
                <p className="font-semibold text-noir">{item.name}</p>
                <p className="text-sm text-noir/60">{item.ingredients.join(', ')}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={() => handleToggleFavorite(item)}
                title={item.favorite ? 'Remove from landing page' : 'Feature on landing page'}
                className={`text-lg ${item.favorite ? 'text-crimson' : 'text-noir/25 hover:text-noir/50'}`}
              >
                {item.favorite ? '★' : '☆'}
              </button>
              <button onClick={() => startEdit(item)} className="text-sm text-crimson underline">
                Edit
              </button>
              <button
                onClick={() => deleteMenuItem.mutate(item)}
                className="text-sm text-crimson underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

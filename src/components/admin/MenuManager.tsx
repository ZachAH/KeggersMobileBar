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
      <h2 className="font-semibold text-gold">Manage Menu</h2>
      <p className="mt-1 text-sm text-cream/60">
        Star up to {MAX_FAVORITES} drinks to feature them on the landing page.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-3 flex flex-col gap-3 rounded-lg border border-gold/20 bg-black/35 p-4 backdrop-blur-md"
      >
        <h3 className="font-semibold text-cream">{editingId ? 'Edit drink' : 'Add a drink'}</h3>
        <input
          placeholder="Drink name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
        />
        <textarea
          placeholder="Ingredients — one per line"
          value={form.ingredientsText}
          onChange={(e) => setForm({ ...form, ingredientsText: e.target.value })}
          required
          rows={4}
          className="rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
        />
        <select
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          className="rounded border border-ink/20 bg-cream px-3 py-2 text-ink"
        >
          {menuColors.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <label className="text-sm font-medium text-cream">
          Photo (optional)
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-cream/70 file:mr-3 file:rounded file:border-0 file:bg-gold file:px-3 file:py-2 file:text-sm file:font-semibold file:text-plum hover:file:bg-cream"
          />
        </label>
        {previewSrc && (
          <img src={previewSrc} alt="Selected preview" className="h-24 w-24 rounded object-cover" />
        )}

        {error && <p className="text-sm text-gold">{error}</p>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSaving}
            className="self-start rounded bg-gold px-4 py-2 text-plum transition-colors hover:bg-cream disabled:opacity-50"
          >
            {isSaving ? 'Saving…' : editingId ? 'Update drink' : 'Add drink'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="self-start rounded border border-cream/40 px-4 py-2 text-cream transition-colors hover:bg-cream/10"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {favoriteError && <p className="mt-3 text-sm text-gold">{favoriteError}</p>}
      {isLoading && <p className="mt-3 text-cream/80">Loading…</p>}
      {items && items.length === 0 && (
        <p className="mt-3 text-sm text-cream/65">No drinks on the menu yet.</p>
      )}

      <ul className="mt-3 space-y-3">
        {items?.map((item) => (
          <li
            key={item.id}
            className="flex items-start justify-between gap-4 rounded-lg border border-gold/20 bg-black/35 p-4 backdrop-blur-md"
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
                <p className="font-semibold text-cream">{item.name}</p>
                <p className="text-sm text-cream/65">{item.ingredients.join(', ')}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                onClick={() => handleToggleFavorite(item)}
                title={item.favorite ? 'Remove from landing page' : 'Feature on landing page'}
                className={`text-lg ${item.favorite ? 'text-gold' : 'text-cream/30 hover:text-cream/60'}`}
              >
                {item.favorite ? '★' : '☆'}
              </button>
              <button onClick={() => startEdit(item)} className="text-sm text-gold underline">
                Edit
              </button>
              <button
                onClick={() => deleteMenuItem.mutate(item)}
                className="text-sm text-gold underline"
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

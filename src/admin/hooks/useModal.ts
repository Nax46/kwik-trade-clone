import { useCallback, useState } from 'react'

export function useModal<T = undefined>() {
  const [isOpen, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)

  const openCreate = useCallback(() => {
    setEditingItem(null)
    setIsOpen(true)
  }, [])

  const openEdit = useCallback((item: T) => {
    setEditingItem(item)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setEditingItem(null)
  }, [])

  const isEditing = editingItem !== null

  return {
    isOpen,
    editingItem,
    isEditing,
    openCreate,
    openEdit,
    close,
  }
}

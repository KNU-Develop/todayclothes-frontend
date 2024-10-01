import { useState, useCallback } from 'react'

interface UseModalProps {
  initialVisibility?: boolean
}

export const useModal = ({ initialVisibility = false }: UseModalProps = {}) => {
  const [isVisible, setIsVisible] = useState(initialVisibility)

  const openModal = useCallback(() => {
    setIsVisible(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsVisible(false)
  }, [])

  const toggleModal = useCallback(() => {
    setIsVisible((prev) => !prev)
  }, [])

  return {
    isVisible,
    openModal,
    closeModal,
    toggleModal,
  }
}

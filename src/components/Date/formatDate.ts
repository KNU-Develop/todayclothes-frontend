export const formatDate = (language: string) => {
  const today = new Date()

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  if (language === 'ko') {
    return today.toLocaleDateString('ko-KR', options)
  } else {
    return today.toLocaleDateString('en-US', options)
  }
}

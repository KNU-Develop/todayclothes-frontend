import { ActivityStyle, ActivityType } from '@/api'

type Language = 'en' | 'ko'

//번역
const ActivityTypeTranslation: Record<
  Language,
  Record<ActivityType, string>
> = {
  en: {
    [ActivityType.Indoor]: 'Indoors',
    [ActivityType.Outdoor]: 'Outdoors',
  },
  ko: {
    [ActivityType.Indoor]: '실내',
    [ActivityType.Outdoor]: '실외',
  },
}

const ActivityStyleTranslation: Record<
  Language,
  Record<ActivityStyle, string>
> = {
  en: {
    [ActivityStyle.Business]: 'Business',
    [ActivityStyle.Formal]: 'Minimal',
    [ActivityStyle.Street]: 'Street',
    [ActivityStyle.Casual]: 'Casual',
    [ActivityStyle.Sporty]: 'Sporty',
    [ActivityStyle.Outdoor]: 'Outdoor',
  },
  ko: {
    [ActivityStyle.Business]: '비즈니스',
    [ActivityStyle.Formal]: '격식있는',
    [ActivityStyle.Street]: '스트릿',
    [ActivityStyle.Casual]: '캐주얼',
    [ActivityStyle.Sporty]: '스포츠',
    [ActivityStyle.Outdoor]: '아웃도어',
  },
}

export const translateActivityType = (
  type: ActivityType,
  language: Language,
) => {
  return ActivityTypeTranslation[language][type] || type
}

export const translateActivityStyle = (
  style: ActivityStyle,
  language: Language,
) => {
  return ActivityStyleTranslation[language][style] || style
}

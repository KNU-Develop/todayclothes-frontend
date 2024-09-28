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
    [ActivityStyle.BusinessCasual]: 'Business Casual',
    [ActivityStyle.Minimal]: 'Minimal',
    [ActivityStyle.Street]: 'Street',
    [ActivityStyle.Casual]: 'Casual',
    [ActivityStyle.Sports]: 'Sports',
    [ActivityStyle.Amekaji]: 'Amekaji',
  },
  ko: {
    [ActivityStyle.BusinessCasual]: '비즈니스 캐주얼',
    [ActivityStyle.Minimal]: '미니멀',
    [ActivityStyle.Street]: '스트릿',
    [ActivityStyle.Casual]: '캐주얼',
    [ActivityStyle.Sports]: '스포츠',
    [ActivityStyle.Amekaji]: '아메카지',
  },
}

export const translateActivityType = (type: ActivityType, language: Language) => {
  return ActivityTypeTranslation[language][type] || type
}

export const translateActivityStyle = (style: ActivityStyle, language: Language) => {
  return ActivityStyleTranslation[language][style] || style
}

export const accountKeys = {
  all: ['account'],
  current: () => [...accountKeys.all, 'current'],
} as const

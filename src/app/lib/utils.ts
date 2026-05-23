
export const titleCase = (str: string) =>
  str.replace(/\w\S*/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())


export function getInitials(name: string): string {
  const parts = name.split(' ')
  const initials = parts.map((part) => part[0]).join('')
  return initials.toUpperCase().slice(0, 2)
}
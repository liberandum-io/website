function onlyUnique(value: string, index: number, self: string[]) {
  return self.indexOf(value) === index;
}

export default function normaliseVariants(input: string): string {
  return (input || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace('tri-colo', 'tricolo')
    .replace('tri colo', 'tricolo')
    .replace(/ and /gi, '/')
    .replace(/&/g, '/')
    .replace(/-/g, '/')
    .replace(/\+/g, '/')
    .replace(/,/g, '/')
    .trim()
    .split('/')
    .map((item) => item.trim())
    .filter((item) => item.length > 1)
    .map((item) => (item[0] as string).toUpperCase() + item.substr(1))
    .filter(onlyUnique)
    .slice(0, 3)
    .sort((a, b) => (a > b ? 1 : -1))
    .join('/');
}

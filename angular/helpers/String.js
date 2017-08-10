

export const ucfirst   = str => str[0].toUpperCase() + str.slice(1)
export const slugify   = str => str.toLowerCase().replace(/\s/g, '-')
export const unslugify = str => str.replace(/\-/g, ' ')
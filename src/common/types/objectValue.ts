/**
 * Este é um tipo genérico em TypeScript chamado `ObjectValues<T>`.
 * Ele é usado para extrair os valores de propriedades de um objeto.
 *
 * @template T - O tipo do objeto do qual os valores das propriedades serão extraídos.
 * @returns Os valores das propriedades do objeto.
 */
export type ObjectValues<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? ObjectValues<T[K]>
        : `${T[K] & string}`
    }[keyof T]
  : T

// const Person = {
//   name: 'nome',
//   age: 'idade',
//   address: {
//     city: 'criciuma',
//     street: { rua: 'eduardo souto', Number: '268' },
//   },
// } as const

// type PersonValues = ObjectValues<typeof Person>
// const a: PersonValues = 'idade'

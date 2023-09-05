interface IExtension {
  id: string
  name: string
  version: string
  description: string

  init?(app: any): void
  setup?(): void
}

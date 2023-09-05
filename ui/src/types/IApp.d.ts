export interface IImageResponse {
  images: IImage[]
}

export interface IImage {
  name: string
  path: string
  size: number
  subfolder: string
  created: string
}

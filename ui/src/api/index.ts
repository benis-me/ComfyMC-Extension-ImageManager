import { fetchApi } from './base'
import { IImageResponse } from '@/types/IApp'

export async function getImages(search: string = ''): Promise<IImageResponse> {
  const path = search
    ? `/image-manager/get-images?search=${search}`
    : '/image-manager/get-images'
  const res = await fetchApi(path)
  return await res.json()
}

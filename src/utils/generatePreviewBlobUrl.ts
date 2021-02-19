import {Observable, from, of} from 'rxjs'
import {mergeMap} from 'rxjs/operators'

const PREVIEW_WIDTH = 180 // px

const createBlob = (img: HTMLImageElement) => {
  return new Promise(resolve => {
    const imageAspect = img.width / img.height

    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = PREVIEW_WIDTH
    canvas.height = PREVIEW_WIDTH / imageAspect

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(img, 0, 0, PREVIEW_WIDTH, PREVIEW_WIDTH / imageAspect)
    canvas.toBlob(resolve, 'image/jpeg')
  })
}

const createImageEl = (file: File): Promise<HTMLImageElement> => {
  return new Promise(resolve => {
    const blobUrlLarge = window.URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      window.URL.revokeObjectURL(blobUrlLarge)
      resolve(img)
    }
    img.src = blobUrlLarge
  })
}

const generatePreviewBlobUrl = async (file: File): Promise<string> => {
  const imageEl = await createImageEl(file)
  const blob = await createBlob(imageEl)

  return window.URL.createObjectURL(blob)
}

export const generatePreviewBlobUrl$ = (file: File): Observable<string> => {
  return of(null).pipe(mergeMap(() => from(generatePreviewBlobUrl(file))))
}

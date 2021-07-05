
import { TemplateData } from '@/typings/TemplateData'
import { PageData } from '@/typings/PageData'

export interface Position {
  x: number,
  y: number,
  w: number,
  h: number,
  i: string
}

export interface LayoutConfig {
  align?: string
  backgroundColor?: string
  borderRadius?: string
  bottomY?: 0
  color?: string
  fixed?: "current" | "bottom"
  fontSize?: string
  isTransform?: number
  popup?: boolean
  popupType?: string
  text?: string
  type?: string
  text1?: string
  text2?: string
  url?: string
  list?: Array<{
    label: string
    value: string
  }>
  title?: string
  layoutType?: string
  isCheckBox?: boolean
  template: Array<{
    name: string
    value: string
  }>
  templateVal?: string
  data?: string
}

export interface Layout {
  config: LayoutConfig,
  id: string,
  type: string,
  position: Position
}

export interface LayoutState {
  flowLayout: Array<Layout>,
  freedomLayout: Array<Layout>,
  current: Layout,
  layoutType: 'freedom' | 'flow'
}


export interface RootState {
  layoutData: LayoutState,
  pageData: PageData,
  templateData: TemplateData
}


export type LibraryType = 'img' | 'text' | 'radio' | 'bottomWechat' | 'chat';


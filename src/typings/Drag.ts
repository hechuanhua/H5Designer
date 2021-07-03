import React from "react"

export interface Position {
  x:number,
  y:number,
  w:number,
  h:number,
  i:string
}

export interface LayoutConfig {
  align?: string
  backgroundColor?: string
  borderRadius?: string
  bottomY?: 0
  color?: string
  fixed?: "current"|"bottom"
  fontSize?: string
  isTransform?: number
  popup?: boolean
  popupType?: string
  text?: string
  type?: string
}

export interface Layout {
  config:LayoutConfig,
  id:number,
  type:string,
  position:Position
}

export interface LayoutState {
  flowLayout:Array<Layout>,
  freedomLayout:Array<Layout>,
	current: Layout,
	layoutType: 'freedom'|'flow'
}

export interface RootState {
  layoutData:LayoutState,
  pageData:any,
  templateData:any
}

export interface Selected {
  title: string,
  tid: string
}

export interface TemplateList {
  cover: string,
  create_time: string,
  id: number,
  layout_data: string,
  source: 'system' | 'user',
  tid: string,
  title: string,
  update_time: string,
}

export interface TemplateData {
  list: Array<TemplateList>,
  popupList: Array<TemplateList>,
  selected: Selected
}
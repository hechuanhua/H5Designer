

export interface ModalProps {
	visible:boolean,
	onOk:()=> void,
	onCancel:()=> void,
	title:string,
	confirmLoading?:boolean,
	children:any
}
import { Form, Input, Button, Select, Radio, Modal } from 'antd';
import React, { useEffect, useRef, useState, useContext } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';
interface ModalProps {
	visible: boolean,
	onOk: () => void,
	onCancel: () => void,
	title: string,
	confirmLoading?: boolean,
	children: any
}

const CommonModal = (props: ModalProps) => {
	const { visible, onOk, onCancel, title, confirmLoading } = props;
	const [disabled, setDisabled] = useState(false);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef<HTMLDivElement>();
	const onStart = (e: DraggableEvent, uiData: any) => {
		const { clientWidth, clientHeight } = window?.document?.documentElement;
		const targetRect = draggleRef?.current?.getBoundingClientRect();
		if (targetRect) {
			setBounds({
				left: -targetRect?.left + uiData?.x,
				right: clientWidth - (targetRect?.right - uiData?.x),
				top: -targetRect?.top + uiData?.y,
				bottom: clientHeight - (targetRect?.bottom - uiData?.y),
			});
		}
	};
	return (
		<Modal
			title={
				<div
					style={{
						width: '100%',
						cursor: 'move',
					}}
					onMouseOver={() => {
						if (disabled) {
							setDisabled(false);
						}
					}}
					onMouseOut={() => {
						setDisabled(true);
					}}
					onFocus={() => { }}
					onBlur={() => { }}
				>
					{title}
				</div>
			}
			visible={visible}
			onOk={onOk}
			confirmLoading={confirmLoading}
			onCancel={onCancel}
			modalRender={modal => (
				<Draggable
					disabled={disabled}
					bounds={bounds}
					onStart={(event, uiData) => onStart(event, uiData)}
				>
					<div ref={draggleRef as React.RefObject<HTMLDivElement>}>{modal}</div>
				</Draggable>
			)}
		>
			{
				props.children
			}
		</Modal>
	);
};

export default CommonModal;

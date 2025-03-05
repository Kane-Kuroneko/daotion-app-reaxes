import less from './index.module.less'
import { ModalProps } from 'antd'
import { XButton } from "@@pages/Test/mozi-xbutton";

export const XConfirmModal = reaxper((props: Partial<ModalProps> & {
	danger?: boolean,
	contentText?: string,
	actionText?: '',
	cancelText?: '',
	actionClick?: () => void,
	cancelClick?: () => void,
}) => {
	const { Modal, Space } = antd
	const {
		danger = false,
		contentText = 'Are you sure to do this?',
		actionText = 'Confirm',
		cancelText = 'Cancel',
		...modalProps
	} = props
	return (
		<Modal
			{...modalProps}
			className={less.xModal}
			footer={null}
			onCancel={() => {props.cancelClick()}}
		>
			<p>
				{contentText}
			</p>
			<Space direction="vertical" style={{width: '100%'}}>
				<XButton
					type={danger ? 'secondary' : 'primary'}
					style={{
						width: '100%',
						height: '48px'
					}}
					danger = {danger}
					onClick={() => {props.actionClick()}}
				>
					{actionText}
				</XButton>
				<XButton
					type={'secondary'}
					style={{
						width: '100%',
						height: '48px'
					}}
					onClick={() => {props.cancelClick()}}
				>
					{cancelText}
				</XButton>
			</Space>
		</Modal>
	);
})

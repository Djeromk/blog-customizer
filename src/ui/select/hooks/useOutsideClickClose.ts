import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onChange,
	onClose,
}: UseOutsideClickClose) => {
	useEffect(() => {

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				!rootRef.current?.contains(target) && !(target as Element)?.closest('[role="button"]')
			) {
				isOpen && onClose?.();
				onChange(false);
			}
		};
		if (!isOpen) return;
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};

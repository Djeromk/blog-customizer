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
	console.log("useOutsideClickClose");
	useEffect(() => {
		if (!isOpen) return;
		const handleClick = (event: MouseEvent) => {
			if (!rootRef.current) return;
			const { target } = event;
			if (
				target instanceof Node &&
				!rootRef.current?.contains(target)
				// &&
				// !(target as Element)?.closest('[role="button"]')
			) {
				isOpen && onClose?.();
				onChange?.(false);
				console.log(target);

			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};

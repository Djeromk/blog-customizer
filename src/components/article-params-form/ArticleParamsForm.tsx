import React, { useCallback } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import {
	fontFamilyClasses,
	fontSizeOptions,
	defaultArticleState,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontFamilyOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onSubmit: (formState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onSubmit }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	console.log('isOpen: ', isOpen);


	const containerRef = useRef<HTMLDivElement>(null);

	const handleToggle = useCallback(() => {
		setIsOpen(false);
	}, []);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: containerRef,
		onChange: setIsOpen,
	});

	const handleReset = () => {
		setFormState(defaultArticleState);
		onSubmit(defaultArticleState);
	};

	const handleOptionChange = (name: string) => (option: OptionType) => {
		setFormState({ ...formState, [name]: option });
	};

	const handleSubmit = (event: React.FormEvent) => {
		event?.preventDefault();
		onSubmit(formState);
	};
	return (
		<div ref={containerRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				//ref={containerRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={formState.fontFamilyOption}
						title='Шрифт'
						options={fontFamilyOptions.map((option) => ({
							...option,
							title: option.title,
							value: option.value,
							className: option.className,
						}))}
						onChange={handleOptionChange('fontFamilyOption')}
					/>

					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions.map((option) => ({
							...option,
							title: option.title,
							value: option.value,
							className: option.className,
						}))}
						name='Размер шрифта'
						title='Размер шрифта'
						onChange={handleOptionChange('fontSizeOption')}
					/>

					<Select
						selected={formState.fontColor}
						options={fontColors.map((color) => ({
							title: color.title,
							value: color.value,
							className: color.className,
							optionClassName: color.optionClassName,
						}))}
						title='Цвет шрифта'
						onChange={handleOptionChange('fontColor')}
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors.map((color) => ({
							title: color.title,
							value: color.value,
							className: color.className,
							optionClassName: color.optionClassName,
						}))}
						title='Цвет фона'
						onChange={handleOptionChange('backgroundColor')}
					/>

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr.map((width) => ({
							title: width.title,
							value: width.value,
							className: width.className,
							optionClassName: width.optionClassName,
						}))}
						title='Ширина контента'
						onChange={handleOptionChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</div>
	);
};

import type { ReactNode } from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';

export interface ScrollableAreaProps extends ScrollViewProps {
	children: ReactNode;
}

export function ScrollableArea({ children, ...props }: ScrollableAreaProps) {
	return <ScrollView {...props}>{children}</ScrollView>;
}

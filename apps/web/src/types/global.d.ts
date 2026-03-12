import type { ReactNode } from 'react';

declare global {
	type PropsLayout = Readonly<{
		children: ReactNode;
	}>;
}

export {};

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import { ProfilesProvider } from './ProfilesProvider';

type MainProviderProps = {
	children: ReactNode;
};

export function MainProvider({ children }: MainProviderProps) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
			<NextIntlClientProvider>
				<ProfilesProvider>{children}</ProfilesProvider>
			</NextIntlClientProvider>
		</ThemeProvider>
	);
}

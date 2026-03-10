/* eslint-env jest */

global.IS_REACT_ACT_ENVIRONMENT = true;
global.IS_REACT_NATIVE_TEST_ENVIRONMENT = true;

global.__DEV__ = true;
global.__fbBatchedBridgeConfig = {
	remoteModuleConfig: [],
	localModulesConfig: [],
};

jest.mock('react-native', () => {
	const React = require('react');

	return {
		StatusBar: () => null,
		View: ({ children }) => React.createElement('View', null, children),
		StyleSheet: {
			create: styles => styles,
		},
		useColorScheme: () => 'light',
	};
});

jest.mock('@react-native/new-app-screen', () => ({
	NewAppScreen: () => null,
}));

jest.mock('react-native-safe-area-context', () => ({
	SafeAreaProvider: ({ children }) => children,
	useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

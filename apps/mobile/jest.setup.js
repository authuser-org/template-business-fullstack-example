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
		Modal: ({ children }) => React.createElement('Modal', null, children),
		View: ({ children }) => React.createElement('View', null, children),
		ScrollView: ({ children }) =>
			React.createElement('ScrollView', null, children),
		Text: ({ children }) => React.createElement('Text', null, children),
		Pressable: ({ children }) =>
			React.createElement(
				'Pressable',
				null,
				typeof children === 'function'
					? children({ pressed: false })
					: children,
			),
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

jest.mock('@gorhom/bottom-sheet', () => {
	const React = require('react');

	const BottomSheet = React.forwardRef(({ children }, ref) => {
		React.useImperativeHandle(ref, () => ({
			snapToIndex: () => {},
			close: () => {},
		}));

		return React.createElement('BottomSheet', null, children);
	});

	const BottomSheetView = ({ children }) =>
		React.createElement('BottomSheetView', null, children);

	return {
		__esModule: true,
		default: BottomSheet,
		BottomSheetView,
	};
});

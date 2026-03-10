const rnPreset = require('react-native/jest-preset');

module.exports = {
	...rnPreset,
	setupFiles: ['<rootDir>/jest.setup.js'],
	transformIgnorePatterns: [
		'node_modules/(?!(?:\\.pnpm|react-native|@react-native|@react-native-community)/)',
	],
};

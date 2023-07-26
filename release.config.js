/** @type {import('semantic-release').GlobalConfig} */
module.exports = {
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'angular',
				parserOpts: {
					headerPattern: /^(\w*|Update):? (.*)$/,
					headerCorrespondence: ['type', 'message'],
					mergePattern: /^Merge pull request #(\\d+) from (.*)$/,
					mergeCorrespondence: ['id', 'source']
				},
				releaseRules: [
					{
						type: 'Update',
						release: 'patch'
					}
				]
			}
		],
		'@semantic-release/release-notes-generator',
		[
			'@semantic-release/github',
			{
				assets: [
					{
						path: `dist/release-${process.env.VERSION}.zip`,
						label: `Package v${process.env.VERSION}`
					}
				]
			}
		]
	]
}

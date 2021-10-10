module.exports = {
  "stories": [
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/stories/**/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ]
}
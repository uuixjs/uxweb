module.exports = {
  "stories": [
    "../src/_stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/_stories/**/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "../src/stories/_core/addon-features/register.tsx",
    "../src/stories/_core/addon-render-speed/register.tsx"
  ]
}
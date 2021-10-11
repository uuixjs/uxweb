module.exports = {
  "stories": [
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/stories/**/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-google-analytics",
    "@storybook/preset-create-react-app",
    "../src/stories/_core/addon-features/register.tsx",
    "../src/stories/_core/addon-render-speed/register.tsx"
  ]
}
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ovvce2',
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});

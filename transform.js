const fs = require('fs');
const postcss = require('postcss');

const css = fs.readFileSync('input.css', 'utf-8');

const breakpoints = {
  '576px': 'breakpoint-sm',
  '768px': 'breakpoint-md',
  '992px': 'breakpoint-lg',
  '1200px': 'breakpoint-xl',
  '1400px': 'breakpoint-xxl',
};

postcss([
  (root) => {
    root.walkAtRules('media', (rule) => {
      const params = rule.params;
      for (let breakpoint in breakpoints) {
        if (params.match(new RegExp(`min-width:\\s*${breakpoint}`))) {
          rule.replaceWith(
            ...rule.nodes.map((node) => {
              if (node.type === 'rule') {
                node.selector = `.${breakpoints[breakpoint]} ${node.selector}`;
              }
              return node;
            })
          );
        }
      }
    });
  },
])
  .process(css, { from: 'input.css', to: 'output.css' })
  .then((result) => {
    fs.writeFileSync('output.css', result.css);
    if (result.map) fs.writeFileSync('output.css.map', result.map);
  })
  .catch((error) => {
    console.error(error);
  });

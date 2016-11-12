import babel from 'rollup-plugin-babel';

export default {
    entry: 'src/main.js',
    format: 'iife',
    plugins: [babel()],
    dest: 'index.js'
};

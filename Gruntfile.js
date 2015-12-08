module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/*.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
  scripts: {
    files: ['js/*.js'],
    tasks: ['uglify'],
    options: {
      spawn: false,
    },
    options: {
      event: ['all'],
    },
  },
}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //Run Grunt on watched file save
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};
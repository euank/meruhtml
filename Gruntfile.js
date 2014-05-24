module.exports = function(grunt) {
  grunt.initConfig({
    jade: {
      compile: {
        files: [
           {
             expand: true,
             cwd: '.',
             src: '*.jade',
             dest: '_site',
             ext: '.html',
             extDot: 'first',
             filter: function(src) {
               return ! /_header\.jade$|config\..*\.?jade/.test(src);
             }
           }
         ]
      }
    },
    concat: {
      js: {
        files: {
          '_site/initial_setup.js': ['util_stuff.js', 'initial_setup.js'],
          '_site/invite.js': ['util_stuff.js', 'invite.js'],
          '_site/manage.js': ['util_stuff.js', 'manage.js'],
          '_site/signup.js': ['util_stuff.js', 'signup.js'],
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['jade', 'concat']);
};

module.exports = function(grunt) {
  grunt.initConfig({
    jade: {
      compile: {
        /*files: {
          '_site/fuq.html': ['fuq.jade'],
          '_site/index.html': ['index.jade'],
          '_site/invite.html': ['invite.jade'],
          '_site/signup.html': ['signup.jade'],
          '_site/manage.html': ['manage.jade'],
        }*/
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
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.registerTask('default', ['jade']);
};

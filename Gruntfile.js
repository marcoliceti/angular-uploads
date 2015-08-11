module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        configFile: 'karma-conf.js'
      }
    },
    concat: {
      options: {
        separator: '\n\n'
      },
      dist: {
        src: [
          'src/msl-upload.js',
          'src/msl-file-input.js',
          'src/msl-folder-input.js',
          'src/msl-dnd-file-input.js',
          'src/msl-dnd-folder-input.js',
          'src/msl-dnd-item.js',
          'src/msl-dnd-target.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v. <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['karma', 'concat', 'uglify']);
  grunt.registerTask('test', ['karma']);
};
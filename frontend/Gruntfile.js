'use strict';

module.exports = function (grunt) {

    // configurable paths
    var yeomanConfig = {
        app: 'web',
        dist: 'dist'
      };

    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        availabletasks: {           // task
            tasks: {
                options: {
                    filter: 'exclude',
                    tasks: ['availabletasks', 'tasks', 'connect', 'connect:server']
                }
            }               // target
        },
        concat: {
            dist: {
                src: [
                    yeomanConfig.app + '/vendor/bootstrap-sass/dist/js/bootstrap.js', // Bootstrap JS
                    yeomanConfig.app + '/js/*.js', // All JS in the libs folder
                    yeomanConfig.app + '/js/global.js'  // This specific file
                ],
                dest: yeomanConfig.app + '/js/dist/production.js',
            }
        },
        uglify: {
            build: {
                src: yeomanConfig.app + '/js/dist/production.js',
                dest: yeomanConfig.app + '/js/dist/production.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: yeomanConfig.app + '/images/src',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: yeomanConfig.app + '/images/dist/',
                }]
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: yeomanConfig.app + '/styles/sass',
                    cssDir: yeomanConfig.app + '/styles',
                    importPath: yeomanConfig.app + '/vendor',
                    imagesDir: yeomanConfig.app + '/images',
                    javascriptsDir: yeomanConfig.app + '/scripts',
                    fontsDir: yeomanConfig.app + '/styles/fonts',
                }
            },
        },
        watch: {
            scripts: {
                files: [yeomanConfig.app + '/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: [yeomanConfig.app + '/styles/sass/*.scss'],
                tasks: ['compass'],
                options: {
                    spawn: false,
                }
            }
        },
        connect: {
            server: {
                options: {
                    keepalive: true,
                    hostname: 'localhost',
                    port: 9001,
                    base: yeomanConfig.app
                }
            }
        },
    });

    // Where we tell Grunt we plan to use some plug-ins.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-available-tasks');

    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'compass', 'watch', 'connect:server']);
    grunt.registerTask('server', ['connect:server']);
    grunt.registerTask('tasks', ['availabletasks']);

};

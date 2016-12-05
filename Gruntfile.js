module.exports = function (grunt) {


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/*.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/sass',
                    src: ['style-*.scss'],
                    dest: 'temp/css',
                    ext: '.css'
                }]
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'temp/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'dist/index.html': 'index.html'
                }
            }
        },

        compass: {
            dev: {
                options: {
                    environment: 'development',
                    sassDir: 'src/sass',
                    sassPath: 'src/sass',
                    cssDir: 'dist',
                    cssPath: 'dist',
                    imagesPath: 'dist/img',
                    imagesDir: 'dist/img',
                    //noLineComments: true,
                    outputStyle: 'expanded'
                }
            },
            prod: {
                options: {
                    environment: 'production',
                    sassDir: 'src/sass',
                    sassPath: 'src/sass',
                    cssDir: 'dist',
                    cssPath: 'dist',
                    imagesPath: 'dist/img',
                    imagesDir: 'dist/img',
                    noLineComments: true,
                    outputStyle: 'compressed'
                } // options
            } // prod


        }, // compass


        concurrent: {
            target_dev: ['compass:dev', 'uglify:dev'],
            target_prod: ['uglify:prod', 'compass:prod', 'imagemin', 'sass','cssmin','htmlmin']
        },


        imagemin: {                          // Task 

            dynamic: {                         // Another target 
                files: [{
                    expand: true,                  // Enable dynamic expansion 
                    cwd: 'src/img/',                   // Src matches are relative to this path 
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
                    dest: 'dist/img'                  // Destination path prefix 
                }]
            }
        },
        
        watch: {
          src: {
            files: [
                'src/bootstrap/*',
                'src/js/*',
                'src/sass/*',
                ],
            tasks: ['concurrent:target_dev']
          }
        },
        
        
       clean: ["dist/*"]

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');


    // tasks of target1 run concurrently, after they all finished, tasks of target2 run concurrently,
    grunt.registerTask('default', ['uglify','sass','cssmin','htmlmin']);

};
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: ["build"],
        
        copy: {
            main: {
                files: [
                    // uiKit                     
                    {
                        expand: true,    
                        cwd: 'src/bower/uikit/dist',
                        src: ['**'],
                        dest: 'build/'
                    }                    
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');    
    grunt.registerTask('default', ['copy']);

};
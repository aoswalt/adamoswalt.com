angular.module('app', ['ngRoute'])
  .config($routeProvider =>
    $routeProvider
      .otherwise('/'))

  .factory('projectsFactory', () => {
    //TODO(adam): load from JSON
    projects = [
      {
        title: 'Portfolio Web Site',
        image: 'portfolio_site.png',
        description: 'A web site to use as my online portfolio which includes projects I have worked on, my resume, and my contact detail. Data for the projects is pulled from repositories where the code is stored, and it is joined with extra information from a MySQL database.',
        technologies: 'HTML/CSS, JavaScript, AngularJS, Bootstrap, SASS',
        sourceUrl: 'https://bitbucket.org/aoswalt/portfolio-web-site/src',
        liveUrl: 'http://www.adamoswalt.com',
        lastUpdate: new Date(2015, 05, 28)
      },
      {
        title: 'Lettering Automation',
        image: 'lettering_automation.png',
        description: 'This program drives a lettering automation project. It relies on the VBA macros stored in the lettering templates to produce the artwork. It is also dependent on a specific folder structure, but that structure is configurable as needed.',
        technologies: 'C#, SQL, VBA',
        sourceUrl: 'https://bitbucket.org/aoswalt/letteringautomation/src',
        liveUrl: '',
        lastUpdate: new Date(2015, 05, 27)
      },
      {
        title: 'Reporting Tool',
        image: 'reporting_tool.png',
        description: 'A tool created for running reports on the AS400. It is designed to allow for quick and easy retrieval of order details without having to navigate the AS400 menus. The tool also supports the creation, saving, and loading of custom reports.',
        technologies: 'C#, SQL',
        sourceUrl: 'https://bitbucket.org/aoswalt/varsityreportingtool/src',
        liveUrl: '',
        lastUpdate: new Date(2015, 05, 15)
      },
      {
        title: 'File Path Builder',
        image: 'path_builder.png',
        description: 'A proof of concept tool to build a file path that corresponds to a given order. It was designed to be used on an already established and inconsistent file structure. Directory paths and trim patterns are read from config files to be able to be easily adjusted as needed.',
        technologies: 'Java',
        sourceUrl: 'https://bitbucket.org/aoswalt/orderpathbuilder/src',
        liveUrl: '',
        lastUpdate: new Date(2013, 05, 22)
      },
      {
        title: 'Simple Particle System',
        image: 'particle_system.png',
        description: 'A simple particle system built with native Java libraries. Global gravity may be toggled, and gravity wells may be created to influence the particles. Walls may be placed to act as barriers. While using the demo, hold \'H\' to view the control options.',
        technologies: 'Java',
        sourceUrl: 'https://bitbucket.org/aoswalt/tech_particlesystem/src',
        liveUrl: '',
        lastUpdate: new Date(2013, 04, 09)
      },
    ]

    return {
      projects
    }
  })

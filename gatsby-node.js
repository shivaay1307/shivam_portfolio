const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@images': path.resolve(__dirname, 'src/assets/images'),
        '@animations': path.resolve(__dirname, 'src/animations'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@data': path.resolve(__dirname, 'src/data'),
      },
    },
  });
};

// Create custom GraphQL schema for projects and tech data
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Project implements Node {
      id: ID!
      title: String!
      description: String!
      imgs: [String]
      link: String
    }
    
    type Tech implements Node {
      id: ID!
      title: String!
      name: String!
      imgPath: String
      rate: Int!
    }
    
    type Work implements Node {
      id: ID!
      title: String!
      company: String!
      duration: String!
      tasks: [String]!
      skills: [String]!
    }
  `;
  createTypes(typeDefs);
};

// Create nodes from data files
exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  
  // Import data
  const { projects, tech, work } = require('./src/data/data.js');
  
  // Create project nodes
  projects.forEach((project, index) => {
    const node = {
      id: createNodeId(`project-${index}`),
      title: project.title,
      description: project.description,
      imgs: project.imgs || [],
      link: project.link,
      internal: {
        type: 'Project',
        contentDigest: createContentDigest(project),
      },
    };
    createNode(node);
  });
  
  // Create tech nodes
  tech.forEach((item, index) => {
    const node = {
      id: createNodeId(`tech-${index}`),
      title: item.title,
      name: item.name,
      imgPath: item.imgPath,
      rate: item.rate,
      internal: {
        type: 'Tech',
        contentDigest: createContentDigest(item),
      },
    };
    createNode(node);
  });
  
  // Create work nodes
  work.forEach((item, index) => {
    const node = {
      id: createNodeId(`work-${index}`),
      title: item.title,
      company: item.company,
      duration: item.duration,
      tasks: item.tasks,
      skills: item.skills,
      internal: {
        type: 'Work',
        contentDigest: createContentDigest(item),
      },
    };
    createNode(node);
  });
};

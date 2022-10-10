/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const fs = require('fs');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  serializer: {
    experimentalSerializerHook: (graph) => {
      const jsonData = {
        nodes: [],
        links:[]
      }
      const moduleMap = graph.dependencies;
      moduleMap.forEach((value,key) => {
        jsonData.nodes.push({
          label: key,
          id: key
        })
      
        const dependencies = value.dependencies;
        
        dependencies.forEach((dValue,dKey) => {
          const edge = {
            source: dValue.absolutePath,
            target: key,
            value: 2
          }
          const node = {
            label: dValue.absolutePath,
            id: dValue.absolutePath
          }
          jsonData.nodes.push(node)
          jsonData.links.push(edge)
        })
        
      });
      fs.writeFileSync('graph.json', JSON.stringify(jsonData));
    }
  }
};

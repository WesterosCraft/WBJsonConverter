import data from "./WesterosBlocks.json";
var fs = require("fs");

const reducer = (input) => {
  const result = [];
  input.blocks.forEach((block) => {
    block.subBlocks &&
      block.subBlocks.forEach((subblock) => {
        result.push({
          name: subblock.label,
          parentBlock: block.blockName,
          blockID: block.blockID,
          material: block.material,
          sound: block.stepSound,
          type: block.blockType,
          light: block.lightValue,
          meta: subblock.meta,
          id: `${block.blockID}:${subblock.meta}`,
          textures: subblock.textures,
        });
      });
  });

  return result;
};

console.log(reducer(data));

// const reducer = data.blocks.map((block) => {
//    return block.subBlocks.map((subblock) => {
//         return {
//             name: subblock.label,
//             parentBlockName: block.blockName,
//             blockID: block.blockID,
//             material: block.material,
//             sound: block.stepSound,
//             type: block.blockType,
//             light: block.lightValue,
//             meta: subblock.meta,
//             id: `${block.blockID}:${subblock.meta}`,
//             textures: subblock.textures,
//             textureLink: subblock.textures && subblock.textures.map((texture) => {
//                 return `https://raw.githubusercontent.com/WesterosCraft/WesterosBlocks/1.12.2/src/main/resources/assets/westerosblocks/textures/blocks/${texture}.png`
//             })
//         }
//     })
// })

const writeJson = () => {
  fs.writeFile("./result.json", JSON.stringify(result, null, 4), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });
};

// writeJson()

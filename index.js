import data from "./WesterosBlocks.json";
var fs = require("fs");

const lowerAndUnderline = (str) => {
  return str.replace(/\s+/g, '_').toLowerCase();
}

const reducer = (input) => {
  const result = [];
  input.blocks.forEach((block) => {
    block.subBlocks &&
      block.subBlocks.forEach((subblock) => {
        result.push({
          name: subblock.label,
          parentBlock: block.blockName,
          blockID: block.blockIDs ? subblock.meta <=7 ? block.blockIDs[0] : block.blockIDs[1] : block.blockID,
          material: block.material,
          sound: block.stepSound,
          type: block.blockType,
          light: block.lightValue,
          meta: subblock.meta,
          namespaced: `wb:${lowerAndUnderline(subblock.label)}`,
          textures: subblock.textures,
          textureLink: subblock.textures && subblock.textures.map((texture) => {
              return `https://raw.githubusercontent.com/WesterosCraft/WesterosBlocks/1.12.2/src/main/resources/assets/westerosblocks/textures/blocks/${texture}.png`
          })
        });
      });
  });

  return result;
};

const result = reducer(data);

console.log(reducer(data));

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

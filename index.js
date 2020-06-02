import data from './WesterosBlocks.json';
var fs = require('fs');

function flatten(data) {
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"."+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}


const reducer = data.blocks.reduce((acc, curr) => {
return curr.subBlocks.map((subblock) => {
    return {
        name: curr.blockName
    }
})
}, {})


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
    fs.writeFile("./result.json", JSON.stringify(reducer, null, 4), (err) => {
        if (err) {
            console.error(err)
            return;
        };
        console.log("File has been created");
    });
}

// writeJson()

console.log(reducer)
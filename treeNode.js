class TreeNode {
    constructor(name) {
        this.name = name; // กำหนดชื่อของโหนด
        this.children = []; // สร้างอาร์เรย์เพื่อเก็บโหนดลูก
    }

    addChild(child) {
        this.children.push(child); // เพิ่มโหนดลูกเข้าไปในอาร์เรย์ children
    }
}

const root = new TreeNode("Root Folder"); // สร้างโหนดราก "Root Folder"
const folderA = new TreeNode("Folder A"); // สร้างโหนด "Folder A"
const folderB = new TreeNode("Folder B"); // สร้างโหนด "Folder B"
const folderC = new TreeNode("Folder C"); // สร้างโหนด "Folder C"

root.addChild(folderA); // เพิ่มโหนด "Folder A" เป็นโหนดลูกของโหนดราก
root.addChild(folderB); // เพิ่มโหนด "Folder B" เป็นโหนดลูกของโหนดราก
folderA.addChild(folderC); // เพิ่มโหนด "Folder C" เป็นโหนดลูกของโหนด "Folder A"

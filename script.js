// สร้างโครงสร้างของโฟลเดอร์และไฟล์
const folderStructure = {
  name: "Root", // ชื่อของโฟลเดอร์หลัก
  type: "folder", // ประเภทของโฟลเดอร์
  children: [  // ลิสต์ของโฟลเดอร์และไฟล์ย่อย
    {
      name: "Folder 1",  // ชื่อของโฟลเดอร์ย่อย
      type: "folder",   // ประเภทของโฟลเดอร์ย่อย
      children: [  // ลิสต์ของไฟล์ย่อยในโฟลเดอร์ย่อย
        { name: "File 1.txt", type: "file" }, // ไฟล์ที่ 1
        { name: "File 2.txt", type: "file" }, // ไฟล์ที่ 2
      ],
    },
    {
      name: "Folder 2",
      type: "folder",
      children: [{ name: "File 1.txt", type: "file" }],
    },
    {
      name: "Folder 3",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
      ],
    },
    {
      name: "Folder 4",
      type: "folder",
      children: [
        { name: "File 1.txt", type: "file" },
        { name: "File 2.txt", type: "file" },
        { name: "File 3.txt", type: "file" },
        { name: "File 4.txt", type: "file" },
        { name: "File 5.txt", type: "file" },
        { name: "File 6.txt", type: "file" },
      ],
    },
  ],
};

// ฟังก์ชันสำหรับสร้าง element ของโครงสร้าง
function createTreeElement(item) {
  const element = document.createElement("div");

  // สร้างไอคอนสำหรับไฟล์หรือโฟลเดอร์
  const icon = document.createElement("i");
  if (item.type === "folder") {
    icon.className = "fas fa-folder";
  } else {
    icon.className = "fas fa-file";
  }
  element.appendChild(icon);

 // เพิ่มข้อความสำหรับไฟล์หรือโฟลเดอร์
  const text = document.createElement("span");
  text.textContent = item.name;
  element.appendChild(text);


 // เพิ่มคลาส CSS
  element.classList.add("tree-element");
  element.classList.add(item.type);

  // เพิ่มโครงสร้างลูกไปยัง element นี้อย่างสะท้อนซ้ำ
  if (item.type === "folder" && item.children) {
    item.children.forEach((child) => {
      const childElement = createTreeElement(child);
      element.appendChild(childElement);
    });
  }

  return element;
}

// ฟังก์ชันสำหรับเพิ่มไฟล์ใหม่
function addFile() {
  const fileNameInput = document.getElementById("fileNameInput");
  const fileName = fileNameInput.value.trim();
  if (fileName !== "") {
    addFileToFolder(folderStructure, fileName);
    fileNameInput.value = ""; // เคลียร์ช่องข้อมูล
  }
}

// ฟังก์ชันสำหรับเพิ่มโฟลเดอร์ใหม่
function addFolder() {
  const folderNameInput = document.getElementById("folderNameInput");
  const folderName = folderNameInput.value.trim();
  if (folderName !== "") {
    addFolderToFolder(folderStructure, folderName);
    folderNameInput.value = ""; // เคลียร์ช่องข้อมูล
  }
}

// ฟังก์ชันสำหรับเพิ่มโฟลเดอร์ลงในโฟลเดอร์
function addFolderToFolder(parentFolder, folderName) {
  // สร้าง object ของโฟลเดอร์
  const folder = { name: folderName, type: "folder", children: [] };

  // เพิ่มโฟลเดอร์ไปยังโฟลเดอร์แม่
  parentFolder.children.push(folder);

  // อัพเดทการแสดงโครงสร้างของโฟลเดอร์
  updateFolderTree();
}

// ฟังก์ชันสำหรับเพิ่มไฟล์ลงในโฟลเดอร์
function addFileToFolder(parentFolder, fileName) {
  // สร้าง object ของไฟล์
  const file = { name: fileName, type: "file" };

  // เพิ่มไฟล์ไปยังโฟลเดอร์แม่
  parentFolder.children.push(file);

  // อัพเดทการแสดงโครงสร้างของโฟลเดอร์
  updateFolderTree();
}


// ฟังก์ชันสำหรับอัพเดทการแสดงโครงสร้างของโฟลเดอร์
function updateFolderTree() {
  // ลบโครงสร้างโฟลเดอร์ที่มีอยู่แล้ว
  folderTree.innerHTML = "";

  // สร้างโครงสร้างของโฟลเดอร์ใหม่จากโครงสร้าง
  const treeElement = createTreeElement(folderStructure);
  folderTree.appendChild(treeElement);
}

// อ้างอิงไปยัง element ของโฟลเดอร์
const folderTree = document.getElementById("folderTree");
const treeElement = createTreeElement(folderStructure);
folderTree.appendChild(treeElement);

// ฟังก์ชันสำหรับลบไฟล์
function deleteFile() {
  const fileNameToDelete = document.getElementById("fileNameToDeleteInput").value.trim();
  if (fileNameToDelete !== "") {
    deleteFileFromFolder(folderStructure, fileNameToDelete);
    document.getElementById("fileNameToDeleteInput").value = ""; // เคลียร์ช่องข้อมูล
  }
}

// ฟังก์ชันสำหรับลบไฟล์ออกจากโฟลเดอร์
function deleteFileFromFolder(parentFolder, fileName) {
  if (parentFolder.children) {
    parentFolder.children = parentFolder.children.filter(child => child.name !== fileName);
    parentFolder.children.forEach(child => {
      if (child.type === "folder") {
        deleteFileFromFolder(child, fileName);
      }
    });
    // อัพเดทการแสดงโครงสร้างของโฟลเดอร์
    updateFolderTree();
  }
}
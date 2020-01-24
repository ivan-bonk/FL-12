const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');

class Folder {
  constructor(struct){
    this.struct = struct;
  }

  render() {
    this.struct.forEach((item) => {
      rootNode.append(this.drawFold(item));
    });

    const folders = document.querySelectorAll('.open');
    folders.forEach((item) => {
      item.addEventListener('click', function() {
        const clicked = item.nextSibling;
        clicked.classList.toggle('subFolder');
        if(item.firstChild.innerText === 'folder') {
          item.firstChild.innerText = 'folder_open';
        } else {
          item.firstChild.innerText = 'folder';
        }
      });
    });
  }

  drawFold(sublevel){
    const folder = document.createElement('div');
    const openBtn = document.createElement('div');
    const file = document.createElement('div');
    const icon = document.createElement('i');
    const folderTitle = document.createElement('span');
    const subFolder = document.createElement('div');
    const empty = document.createElement('div');

    folder.classList.add('folder');
    openBtn.classList.add('open');
    file.classList.add('file');
    icon.classList.add('material-icons');
    folderTitle.classList.add('folderTitle');
    subFolder.classList.add('subFolder');
    subFolder.classList.add('subFolderStyles');
    empty.classList.add('empty');
    
    folderTitle.innerText = sublevel.title;
    empty.innerText = 'Folder is empty';

    if(sublevel.folder){
      icon.innerText = 'folder';
      openBtn.append(icon);
      openBtn.append(folderTitle);
      folder.append(openBtn);

      if(sublevel.children){
        sublevel.children.forEach((item) => {
          subFolder.append(this.drawFold(item));
        });
      } else {
        subFolder.append(empty);
      }
      folder.append(subFolder);
      return folder;

    } else if(!sublevel.folder && sublevel.title) {

      icon.innerText = 'insert_drive_file';
      file.append(icon);
      file.append(folderTitle);
      return file
    }
  }
}

const file = new Folder(structure);

file.render();
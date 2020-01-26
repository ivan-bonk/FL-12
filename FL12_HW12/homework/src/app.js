const rootNode = document.getElementById('root');

function Page() {
    const ZERO = 0;
    const TWO = 2;
    const FIVE = 5;
    const EIGHT = 8;
    const mainPage = document.createElement('div');
    const addNew = document.createElement('button');
    const setBlock = document.createElement('div');

    const addPage = document.createElement('div');
    const titleInput = document.createElement('input');
    const addTerm = document.createElement('button');
    const confirmBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    const terms = document.createElement('div');

    const modifyPage = document.createElement('div');
    const modTitleInput = document.createElement('input');
    const modAddTerm = document.createElement('button');
    const saveBtn = document.createElement('button');
    const modCancelBtn = document.createElement('button');

    addNew.textContent = 'Add new';
    confirmBtn.textContent = 'Confirm';
    cancelBtn.textContent = 'Cancel';
    addTerm.textContent = 'Add Term';
    modAddTerm.textContent = 'Add Term';
    saveBtn.textContent = 'Save';
    modCancelBtn.textContent = 'Cancel';

    mainPage.classList.add('main_page');
    addPage.classList.add('add_page');
    addPage.classList.add('open');
    setBlock.classList.add('set_block');
    terms.classList.add('terms');
    modifyPage.classList.add('modify_page');
    modifyPage.classList.add('open');


    mainPage.append(addNew);
    mainPage.append(setBlock);
    addPage.append(titleInput);
    addPage.append(addTerm);
    addPage.append(confirmBtn);
    addPage.append(cancelBtn);
    addPage.append(terms);
    modifyPage.append(modTitleInput);
    modifyPage.append(modAddTerm);
    modifyPage.append(saveBtn);
    modifyPage.append(modCancelBtn);

    rootNode.append(mainPage);
    rootNode.append(addPage);
    rootNode.append(modifyPage);

    if(localStorage.length !== ZERO) {
        drawSet();
    }

    addNew.addEventListener('click', function() {
        window.location.hash = 'add';
    });

    cancelBtn.addEventListener('click', function() {
        window.location.hash = 'main';
    });

    modCancelBtn.addEventListener('click', function() {
        window.location.hash = 'main';
    });

    confirmBtn.addEventListener('click', function() {
        if(titleInput.value){
            let buff = new Array();
            buff.push(`${titleInput.value}+`);
            const terms = document.querySelector('.terms').childNodes;
            
            if(terms.length > 1) {
                terms.forEach((item) => {
                    if(item.firstChild.value || item.firstChild.nextSibling.value) {
                        buff.push(`${item.firstChild.value}+`);
                        buff.push(`${item.firstChild.nextSibling.value}+`);
                    }else {
                        alert('You should fill the gaps');
                    }
                });
            } else {
                buff.push(`${terms[ZERO].firstChild.value}+`);
                buff.push(`${terms[ZERO].firstChild.nextSibling.value}+`);
            }
            
            buff = buff.join('');
            const index = document.querySelector('.set_block').childNodes.length;
            localStorage.setItem(index, buff.slice(ZERO, buff.length-1));

            renderSet(index);
            window.location.hash = 'main';
        } else {
            alert('You should fill Term');
        }
    });

    // saveBtn.addEventListener('click', function() {
    //     if(modTitleInput.value) {
    //         const paste = document.querySelector(`#${window.location.hash.substring(EIGHT)}`);
    //         paste.firstChild.textContent = modTitleInput.value;
    //         paste.firstChild.nextSibling.textContent = modDefInput.value;
    //         window.location.hash = 'main';
    //     }else {
    //         alert('You should fill Term');
    //     }
    // });

    addTerm.addEventListener('click', function() {
        const block = document.createElement('div');
        const term = document.createElement('input');
        const def = document.createElement('input');
        const removeTerm = document.createElement('button');
        term.setAttribute('placeholder', 'Enter term');
        def.setAttribute('placeholder', 'Enter definition');
        removeTerm.textContent = 'Remove';
        removeTerm.classList.add('remove_term');

        block.classList.add('term_block');
        block.append(term);
        block.append(def);
        block.append(removeTerm);
        terms.append(block);

        removeTerm.addEventListener('click', function(event) {
            const target = event.target.parentNode;
            let elem = target.firstChild;
            while (elem){
                target.removeChild(elem);
                elem = target.firstChild;
            }
        });
    });

    function openAddPage() {
        clearInput();
        mainPage.classList.toggle('open');
        addPage.classList.toggle('open');
    }

    function openMainPage() {
        mainPage.classList.toggle('open');
        if(!addPage.classList.contains('open')){
            addPage.classList.toggle('open');
        }
        if(!modifyPage.classList.contains('open')) {
            modifyPage.classList.toggle('open');
        }
        
    }

    function openModifyPage(){
        mainPage.classList.toggle('open');
        modifyPage.classList.toggle('open');
    }


    function removeListener(item){
        item.addEventListener('click', (event) => {
            const target = event.target;
            const parent = target.parentNode.parentNode;

            let index = target.parentNode.getAttribute('id').substring(FIVE)*TWO-TWO;
            localStorage.removeItem(index);
            localStorage.removeItem(index+1);
            parent.removeChild(target.parentNode);
        });
    }

    // function editListener(item){
    //     item.addEventListener('click', (event) => {
    //         const target = event.target.parentNode;
    //         const id = target.getAttribute('id');
    //         modTitleInput.value = target.firstChild.textContent;
    //         modDefInput.value = target.firstChild.nextSibling.textContent;
    //         window.location.hash = 'modify/' + id;
    //     });
    // }

    function renderSet(id) {
        const setItem = document.createElement('div');
        const setTitle = document.createElement('span');
        const removeBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        let buff = localStorage.getItem(id);

        buff = buff.split('+');
        setTitle.textContent = buff[ZERO];
        removeBtn.textContent = 'Remove';
        editBtn.textContent = 'Edit';

        setItem.setAttribute('id', 'item-'+(id+TWO)/TWO);
        removeBtn.classList.add('remove_btn');
        editBtn.classList.add('edit_btn');

        setItem.append(setTitle);
        setItem.append(removeBtn);
        setItem.append(editBtn);
        setBlock.append(setItem);
        removeListener(removeBtn);
        // editListener(editBtn);
    }

    function drawSet() {
        let keys = Object.keys(localStorage);
        let max = Math.max(...keys);
        for(let i = 0; i < max; i++) {
            if(localStorage.getItem(i) !== null) {
                renderSet(localStorage.getItem(i), localStorage.getItem(i+1), i);
                i++;
            } else {
                continue;
            }
        }
    }

    function clearInput() {
        titleInput.value = '';
        const terms = document.querySelector('.terms');
        let elem = terms.firstChild;
        while (elem) {
            terms.removeChild(elem);
            elem = terms.firstChild;
        }
    }

    return {
        openAddPage,
        openMainPage,
        openModifyPage
    }
}

const page = new Page();


window.addEventListener('hashchange', hashControl);

function hashControl() {
    if(window.location.hash === '#add') {
        page.openAddPage();
    } else if(window.location.hash === '#main') {
        page.openMainPage();
    } else if(window.location.hash.includes('modify')){
        page.openModifyPage();
    }
}
const rootNode = document.getElementById('root');

function Page() {
    const ZERO = 0;
    const TWO = 2;
    const FIVE = 5;
    const EIGHT = 8;
    const mainPage = document.createElement('div');
    const addNew = document.createElement('button');
    const setBlock = document.createElement('div');
    const learnedBlock = document.createElement('div');

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
    const modTerms = document.createElement('div');

    addNew.textContent = 'Add new';
    confirmBtn.textContent = 'Confirm';
    cancelBtn.textContent = 'Cancel';
    addTerm.textContent = 'Add Term';
    modAddTerm.textContent = 'Add Term';
    saveBtn.textContent = 'Save';
    modCancelBtn.textContent = 'Cancel';

    mainPage.classList.add('main_page');
    addNew.classList.add('add_new');
    addPage.classList.add('add_page');
    addPage.classList.add('open');
    setBlock.classList.add('set_block');
    terms.classList.add('terms');
    modifyPage.classList.add('modify_page');
    modifyPage.classList.add('open');
    modTerms.classList.add('mod_terms');


    mainPage.append(addNew);
    mainPage.append(setBlock);
    mainPage.append(learnedBlock);
    addPage.append(titleInput);
    addPage.append(addTerm);
    addPage.append(confirmBtn);
    addPage.append(cancelBtn);
    addPage.append(terms);
    modifyPage.append(modTitleInput);
    modifyPage.append(modAddTerm);
    modifyPage.append(saveBtn);
    modifyPage.append(modCancelBtn);
    modifyPage.append(modTerms);

    rootNode.append(mainPage);
    rootNode.append(addPage);
    rootNode.append(modifyPage);

    if(localStorage.length !== ZERO) {
        drawSet();
    }

    addNew.addEventListener('click', () => {
        window.location.hash = 'add';
    });

    cancelBtn.addEventListener('click', () => {
        window.location.hash = 'main';
    });

    modCancelBtn.addEventListener('click', () => {
        window.location.hash = 'main';
    });

    function saveNewSet(title, place, flag){
        if(title.value){
            let buff = new Array();
            buff.push(`${title.value}+`);
            const terms = document.querySelector(`.${place.getAttribute('class')}`).childNodes;
            
            terms.forEach((item) => {
                if(item.firstChild.value || item.firstChild.nextSibling.value) {
                    buff.push(`${item.firstChild.value}+`);
                    buff.push(`${item.firstChild.nextSibling.value}+`);
                }else {
                    alert('You should fill the gaps');
                }
            });
            
            buff = buff.join('');
            let index = document.querySelector('.set_block');
            if(flag) {
                index = index.lastChild === null ? ZERO : +index.lastChild.getAttribute('id').substring(FIVE);
                localStorage.setItem(index, buff.slice(ZERO, buff.length-1));
            } else {
                index = window.location.hash.substring(EIGHT);
                localStorage.removeItem(+index.substring(FIVE) - 1);
                localStorage.setItem(+index.substring(FIVE) - 1, buff.slice(ZERO, buff.length-1));
            }
            
            window.location.hash = 'main';
            return index;            
        } else {
            alert('You should fill Name');
            return false;
        }
    }

    confirmBtn.addEventListener('click', () => {
        renderSet(saveNewSet(titleInput, terms, true));
    });

    saveBtn.addEventListener('click', () => {
        saveChanges(saveNewSet(modTitleInput, modTerms, false));
    });

    function termAdder(place){
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
        place.append(block);

        removeTerm.addEventListener('click', (event) => {
            const target = event.target.parentNode;
            target.setAttribute('id', 'delete');
            const parent = target.parentNode;

            parent.removeChild(target);
        });

        return {term, def};
    }
    
    addTerm.addEventListener('click', () => {
        termAdder(terms);
    }, false);
    modAddTerm.addEventListener('click', () => {
        termAdder(modTerms);
    }, false);
    

    function openAddPage() {
        clearInput(titleInput, terms);
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

            let index = target.parentNode.getAttribute('id').substring(FIVE)-1;
            localStorage.removeItem(index);
            parent.removeChild(target.parentNode);
        });
    }

    function editListener(item){
        item.addEventListener('click', (event) => {
            clearInput(modTitleInput, modTerms);
            const target = event.target.parentNode;
            const id = +target.getAttribute('id').substring(FIVE);
            modTitleInput.value = target.firstChild.textContent;

            const buff = localStorage.getItem(id-1).split('+');

            if(buff.length > 1) {
                for(let i = 1; i < buff.length; i += TWO) {
                    const termObj = termAdder(modTerms);

                    termObj.term.value = `${buff[i]}`;
                    termObj.def.value = `${buff[i+1]}`;
                }
            }
            window.location.hash = `modify/item-${id}`;
        });
    }

    // function markListener(item) {
    //     item.addEventListener('click', (event) => {
    //         const target = event.target.parentNode;
    //         learnedBlock.insertAdjacentElement('beforeend', target);
    //         const index = target.getAttribute('id').substring(FIVE)-1;
    //         let buff = localStorage.getItem(index);
    //         buff = buff.split('+');
    //         buff.push('Learned');
    //         buff = buff.join('+');
    //         localStorage.removeItem(index);
    //         localStorage.setItem(index, buff);
    //         removeLearned(target);
    //     },{once : true});
    // }

    // function removeLearned(item) {
    //     item.addEventListener('click', (event) => {
    //         const target = event.target.parentNode;
    //         setBlock.insertAdjacentElement('beforeend', target);
    //         const index = target.getAttribute('id').substring(FIVE)-1;
    //         let buff = localStorage.getItem(index);
    //         buff = buff.split('+');
    //         buff.pop();
    //         buff = buff.join('+');
    //         localStorage.removeItem(index);
    //         localStorage.setItem(index, buff);
    //     });
    // }

    function renderSet(id) {
        if(id !== false) {
            const setItem = document.createElement('div');
            const setTitle = document.createElement('span');
            const removeBtn = document.createElement('button');
            const editBtn = document.createElement('button');

            let buff = localStorage.getItem(id);

            buff = buff.split('+');
            setTitle.textContent = buff[ZERO];
            removeBtn.textContent = 'Remove';
            editBtn.textContent = 'Edit';

            setItem.setAttribute('id', 'item-'+(id+1));

            setItem.append(setTitle);
            setItem.append(removeBtn);
            setItem.append(editBtn);
            setBlock.append(setItem);
            removeListener(removeBtn);
            editListener(editBtn);
            // markListener(setItem);  
        }
    }

    function saveChanges(index){
        const block = document.getElementById(index);
        const buff = localStorage.getItem(+index.substring(FIVE) - 1).split('+');

        block.firstChild.textContent = buff[ZERO];

    }

    function drawSet() {
        let keys = Object.keys(localStorage);
        let max = Math.max(...keys);
        for(let i = 0; i <= max; i++) {
            if(localStorage.getItem(i) !== null) {
                renderSet(i);
            } else {
                continue;
            }
        }
    }

    function clearInput(title, place) {
        title.value = '';
        const terms = document.querySelector(`.${place.getAttribute('class')}`);
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
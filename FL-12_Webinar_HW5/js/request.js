window.location.hash = '';
const loadingDiv = document.getElementById('loading');

function showUsers() {
    let request = new XMLHttpRequest();
    let userList = [];
    
    request.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
    request.send(null);
    
    showSpinner();
    
    request.onreadystatechange = function() {
    
        if(request.status == 200 && request.readyState === 4) {
            userList = JSON.parse(request.response);
            hideSpinner();
            const users = new Users(userList);
            users.start();
        }
    }
}

class UserCard {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.address = user.address;
        this.phone = user.phone;
        this.website = user.website;
        this.company = user.company;
        this.div = document.createElement('div');
        this.div.classList.add('user_item');
    }

    createCard() {
        const _this = this;
        this.div.id = this.id;

        this.div.innerHTML = `
        <p class="username"><i>Username:</i> ${this.username}</p>
        <p class="email"><i>Email:</i> ${this.email}</p>
        <div class="address">
            <p class="address_head">Address</p>
            <p class="street"><i>Street:</i> ${this.address.street}</p>
            <p class="suite"><i>Suite:</i> ${this.address.suite}</p>
            <p class="city"><i>City:</i> ${this.address.city}</p>
            <p class="zipcode"><i>Zipcode:</i> ${this.address.zipcode}</p>
            <div class="geo">
                <p class="geo_head">GEO</p>
                <p class="lat"><i>LAT:</i> ${this.address.geo.lat}</p>
                <p class="lng"><i>LNG:</i> ${this.address.geo.lng}</p>
            </div>
        </div>
        <p class="phone"><i>Phone:</i> ${this.phone}</p>
        <p class="website"><i>Website:</i> ${this.website}</p>
        <div class="company">
            <p class="company_head">Company</p>
            <p class="companyName"><i>Name:</i> ${this.company.name}</p>
            <p class="catchPhrase"><i>Catch phrase:</i> ${this.company.catchPhrase}</p>
            <p class="bs"><i>BS:</i> ${this.company.bs}</p>
        </div>`;
       
        const name = document.createElement('p');
        name.classList.add('name');
        name.innerHTML = `<i>Name:</i> ${this.name}`;
        this.div.prepend(name);
        name.addEventListener('click', this.redirectUser.bind(this));

        this.getImage('https://api.thecatapi.com/v1/images/search?size=full', function(data) {
            const img = document.createElement('img');
            img.src =  data[0]["url"];
            _this.div.prepend(img);
        });

        const edit = document.createElement('button');
        const remove = document.createElement('button');

        edit.classList.add('edit_btn');
        remove.classList.add('remove_btn');

        edit.innerText = 'Edit';
        remove.innerText = 'Delete';

        this.div.append(edit);
        this.div.append(remove);
        edit.addEventListener('click', this.editCard.bind(this));
        remove.addEventListener('click', this.deleteCard.bind(this));
    }

    editCard() {
        this.div.innerHTML = `
        <p class="name"><i>Name:</i> <input type='text' value='${this.name}'></p>
        <p class="username"><i>Username:</i> <input type='text' value='${this.username}'></p>
        <p class="email"><i>Email:</i> <input type='text' value='${this.email}'></p>
        <div class="address">
            <p class="address_head">Address</p>
            <p class="street"><i>Street:</i> <input type='text' value='${this.address.street}'></p>
            <p class="suite"><i>Suite:</i> <input type='text' value='${this.address.suite}'></p>
            <p class="city"><i>City:</i> <input type='text' value='${this.address.city}'></p>
            <p class="zipcode"><i>Zipcode:</i> <input type='text' value='${this.address.zipcode}'></p>
            <div class="geo">
                <p class="geo_head">GEO</p>
                <p class="lat"><i>LAT:</i> <input type='text' value='${this.address.geo.lat}'></p>
                <p class="lng"><i>LNG:</i> <input type='text' value='${this.address.geo.lng}'></p>
            </div>
        </div>
        <p class="phone"><i>Phone:</i> <input type='text' value='${this.phone}'></p>
        <p class="website"><i>Website:</i> <input type='text' value='${this.website}'></p>
        <div class="company">
            <p class="company_head">Company</p>
            <p class="companyName"><i>Name:</i> <input type='text' value='${this.company.name}'></p>
            <p class="catchPhrase"><i>Catch phrase:</i> <input type='text' value='${this.company.catchPhrase}'></p>
            <p class="bs"><i>BS:</i> <input type='text' value='${this.company.bs}'></p>
        </div>`;
        const save = document.createElement('button');
        const cancel = document.createElement('button');
        save.classList.add('save_btn');
        cancel.classList.add('cancel_btn');
        save.innerText = 'Save';
        cancel.innerText = 'Cancel';
        this.div.append(save);
        this.div.append(cancel);
        cancel.addEventListener('click', this.createCard.bind(this));
        save.addEventListener('click', this.saveChanges.bind(this));
    }

    saveChanges(e) {
        const target = e.target.parentNode;
        const inputList = target.getElementsByTagName('input');
        const user = {
            id: this.id,
            name: inputList[0].value,
            username: inputList[1].value,
            email: inputList[2].value,
            address: {
                street: inputList[3].value,
                suite: inputList[4].value,
                sity: inputList[5].value,
                zipcode: inputList[6].value,
                geo: {
                    lat: inputList[7].value,
                    lng: inputList[8].value
                }
            },
            phone: inputList[9].value,
            website: inputList[10].value,
            company: {
                name: inputList[11].value,
                catchPhrase: inputList[12].value,
                bs: inputList[13].value
            }
        };

        const request = new XMLHttpRequest();
        request.open('PUT', 'https://jsonplaceholder.typicode.com/users/' + target.id, true);

        showSpinner();
        this.removeCard();

        request.onreadystatechange = function() {
            if(request.status == 200 && request.readyState === 4) {
                hideSpinner();
                new UserCard(user).render()
            }
        }

        request.send(JSON.stringify(user));
    }

    getImage(url, callback) {
        let xml = new XMLHttpRequest();
        xml.onreadystatechange = function() {
            if (xml.readyState == 4 && xml.status == 200) {
            try {
                var data = JSON.parse(xml.responseText);
            } catch (error) {
                console.log(error.message + " in " + xml.responseText);
                return;
            }
            callback(data);
            }
        };
    
        xml.open("GET", url, true);
        xml.send();
    }

    render() {
        const root = document.querySelector('.root');
        this.createCard();
        const cardList = Array.from(document.querySelectorAll('.user_item'));
    
        if(cardList.length > 0){
            if(this.id === 1) {
                root.prepend(this.div);
            }else {
                for(let el of cardList) {
                    if(+el.id + 1 === this.id) {
                        el.after(this.div);
                    }
                }
            }
            
        }else {
            root.append(this.div);
        }
    }
    removeCard() {
        const child = document.getElementById(this.id);
        const parent = child.parentNode;
        parent.removeChild(child);
    }

    deleteCard() {
        const request = new XMLHttpRequest();
        const _this = this;
        request.open('DELETE', 'https://jsonplaceholder.typicode.com/users/' + this.id, true);
        showSpinner();
        request.onreadystatechange = function() {
            if(request.status == 200 && request.readyState === 4) {
                _this.removeCard();
                hideSpinner();
            }
        }
        request.send();
    }

    async redirectUser() {
        clear();
        window.location.hash = 'posts';
        const posts = new PostsList(await this.getPost.call(this), this);
        posts.create();
        
    }

    async getPost() {
        showSpinner();
        return await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/posts').then(response =>
            response.json()
          ),
          fetch('https://jsonplaceholder.typicode.com/comments').then(response =>
            response.json()
          )
        ]).then((data) => {
            const result = data[0].filter(post => post.userId === this.id);
            result.forEach((el) => {
                el.comments = data[1].filter(comm => comm.postId === el.id);
            });
            hideSpinner();
            return result;
        });
    }
}

class Users {
    constructor(userList) {
        this.list = userList.map((el) => {
            return new UserCard(el);
        });
    }
    start(){
        this.list.forEach((el) => el.render());
        const root = document.querySelector('.root');
        root.classList.add('users');
        root.classList.remove('posts');
    }
}

class Post {
    constructor(post) {
        this.userId = post.userId,
        this.id = post.id,
        this.title = post.title,
        this.body = post.body,
        this.comment = post.comments,
        this.div = document.createElement('div');
        this.commDiv = document.createElement('div');
        this.commDiv.classList.add('post_item');
    }

    createPost() {
        this.div.id = this.id;

        this.div.innerHTML = `
            <h2>Post ${this.id}</h2>
            <h3 class="title">${this.title}</h3>
            <p class="body">${this.body}</p>`;

        for(let el of this.comment) {
            this.commDiv.innerHTML += `
            <div class="comment">
                <p class="comment_name"><i>Name:</i> ${el.name}</p>
                <p class="comment_email"><i>Email:</i> ${el.email}</p>
                <p class="comment_body">${el.body}</p>
            </div>`;
        }

        this.div.append(this.commDiv);
    }
    render() {
        const root = document.querySelector('.root');
        this.createPost();
        root.append(this.div);
    }
}

class PostsList {
    constructor(list, user) {
        this.postList = list.map((el) => {
            return new Post(el);
        });
        this.user = user;
    }

    create() {
        this.user.render();

        const back = document.createElement('button');
        back.innerText = 'Back';
        back.addEventListener('click', this.closePosts.bind(this));
        const root = document.querySelector('.root');
        root.append(back);
        root.classList.remove('users');
        root.classList.add('posts');

        this.postList.forEach((el) => {
            el.render();
        });
        
    }

    closePosts() {
        clear();
        window.location.hash = 'users';
    }
}

function showSpinner() {
  loadingDiv.style.visibility = 'visible';
}

function hideSpinner() {
  loadingDiv.style.visibility = 'hidden';
}

function clear() {
    const root = document.querySelector('.root');
    root.innerHTML = '';

}
window.addEventListener('hashchange', hashControl);

function hashControl() {
    if(window.location.hash === '#users') {
        showUsers();
    }
}

window.addEventListener('load', () => {
    window.location.hash = 'users';
});
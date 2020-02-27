let request = new XMLHttpRequest();
let userList = [];

request.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
request.send(null);

request.onreadystatechange = function() {
    if(request.status == 200 && request.readyState === 4) {
        userList = JSON.parse(request.response);
        const users = new Users(userList);
        users.start();
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
        this.div.id = this.id;

        this.div.innerHTML = `
        <p class="name"><i>Name:</i> ${this.name}</p>
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
        const edit = document.createElement('button');
        edit.classList.add('edit_btn');
        edit.innerText = 'Edit';
        this.div.append(edit);
        edit.addEventListener('click', this.editCard.bind(this));
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

        fetch('https://jsonplaceholder.typicode.com/users/' + target.id, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(this.deleteCard())
        .then(new UserCard(user).render())
        .catch(error => console.log(error));
    }

    render() {
        const root = document.querySelector('.root');
        this.createCard();
        // const cardList = document.getElementsByClassName('user_item');
        // if(cardList.length > 0){
        //     for(let el of cardList) {
        //         if(el.id + 1 === this.id) {
        //             el.after(this.div);
        //         }
        //     }
        // }else {
        //     root.append(this.div);
        // }
        root.append(this.div);

    }
    deleteCard() {
        const child = document.getElementById(this.id);
        const parent = child.parentNode;
        parent.removeChild(child);
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
    }

}
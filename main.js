const characterBtn = document.querySelector('#characters')
const PlanetsBtn = document.querySelector('#planets')
characterBtn.addEventListener('click', getcharters)
PlanetsBtn.addEventListener('click', getPlanets)

axios.get('https://swapi.dev/api/films/')
    .then((res) => {
        const ep_select = document.querySelector("#select_episode")
        const episodes = res.data.results
        episodes.map((ep, index) => {
            const ep_list = document.createElement('option')
            ep_list.value = index + 1
            ep_list.setAttribute('id', ep.title)
            ep_list.text = (ep.title).toUpperCase()
            ep_select.appendChild(ep_list)
        })
        ep_select.options[1].defaultSelected = true

    })

function getcharters() {
    console.clear()


    if (document.querySelector(".list")) document.querySelector(".list").remove()
    const list = document.createElement('div')
    list.classList.add('list')
    document.body.append(list)
    const ep_n = document.querySelector("#select_episode").value - 1
    axios.get('https://swapi.dev/api/films')
        .then((res) => {
            const ep_characters = res.data.results[ep_n].characters
            ep_characters.map((ep, i) => {
                axios.get(ep_characters[i])
                    .then((res) => {
                        console.log(res.data.name);
                        const listItem = document.createElement('div')
                        listItem.classList.add('character')
                        listItem.setAttribute('id', res.data.name)
                        list.appendChild(listItem)

                        const listItemImg = document.createElement("img");
                        const listItemImgFrame = document.createElement("div");
                        listItemImgFrame.classList.add('character_img');
                        listItemImg.classList.add('image');
                        listItem.appendChild(listItemImgFrame);
                        listItemImgFrame.appendChild(listItemImg);
                        listItemImg.setAttribute("src", "src/img/" + `${res.data.name}` + '.jpg'); //`url('../src/img/${res.data.name}.jpg')`;

                        const listItemText = document.createElement('div')
                        listItemText.classList.add('name')
                        listItem.appendChild(listItemText)
                        listItemText.innerHTML += (res.data.name).toUpperCase()

                        const additionalInfo = document.createElement('div')
                        additionalInfo.classList.add('additiona_info')
                        listItem.appendChild(additionalInfo)

                        const listItemGender = document.createElement('div')
                        listItemGender.classList.add('gender')
                        listItemGender.classList.add(res.data.gender)
                        additionalInfo.appendChild(listItemGender)

                        const listItemBirhdate = document.createElement('div')
                        listItemBirhdate.classList.add('birthdate')
                        additionalInfo.appendChild(listItemBirhdate)
                        listItemBirhdate.innerHTML += `WAS BORN IN  ` + res.data.birth_year


                    })
            })
        })



    removeBtn()
}

function removeBtn() {
    const removeBtn = document.createElement('div')
    if (document.querySelector('#removeBtn')) document.querySelector('#removeBtn').remove()
    removeBtn.classList.add('button')
    removeBtn.setAttribute('id', 'removeBtn')
    document.querySelector('.selector').appendChild(removeBtn)
    const removeText = document.createElement('a')
    removeBtn.appendChild(removeText)
    removeText.innerHTML = `REMOVE`
    removeBtn.addEventListener('click', () => {
        document.querySelector(".list").remove()
        removeBtn.remove()
    })
}

function getPlanets() {
    console.clear()


    if (document.querySelector(".list")) document.querySelector(".list").remove()
    const list = document.createElement('div')
    list.classList.add('list')
    document.body.append(list)

    const ep_n = document.querySelector("#select_episode").value - 1
    axios.get('https://swapi.dev/api/films')
        .then((res) => {
            const ep_characters = res.data.results[ep_n].planets
            ep_characters.map((ep, i) => {
                axios.get(ep_characters[i])
                    .then((res) => {
                        const listItem = document.createElement('div')
                        listItem.classList.add('planet')
                        listItem.setAttribute('id', res.data.name)
                        list.appendChild(listItem)

                        const imgCharter = document.createElement("div")
                        imgCharter.classList.add('planet_img')
                        listItem.appendChild(imgCharter)

                        const listItemText = document.createElement('div')
                        listItemText.classList.add('name')
                        listItem.appendChild(listItemText)
                        listItemText.innerHTML += (res.data.name).toUpperCase()
                    })
            })
        })
    removeBtn()
}
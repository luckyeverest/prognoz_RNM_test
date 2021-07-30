// Add event to html
const inputTitle = document.querySelector('#input-title')
const inputStartDate = document.querySelector('#input-start-date')
const inputEndDate = document.querySelector('#input-end-date')
const inputText = document.querySelector('#text')
const btnAdd = document.querySelector('#btn-add')
const btnGet = document.querySelector('#btn-get')
const result = document.querySelector('#result')
const typeEvent = document.querySelector('.select')

localstorageItems()

btnAdd.addEventListener('click', (e) => {
    const id = new Date().toString()
    const title = inputTitle.value.toString()
    const startDate = inputStartDate.value.toString()
    const endDate = inputEndDate.value.toString()
    const text = inputText.value.toString()
    const type = typeEvent.value.toString()


    saveEvent(id, title, startDate, endDate, text, type)
    localstorageItems()
})


//add event to localstorege
function saveEvent(id, title, startDate, endDate, text, type) {

    let save = {
        id: new Date(),
        title: [title],
        startDate: [startDate],
        endDate: [endDate],
        text: [text],
        type: [type]
    }
    //console.log(save)
    localStorage.setItem(title, JSON.stringify(save));

    alert('Мероприятие ' + title.toString() + ' ' + 'сохранено')
}

//get event to localstorege
function localstorageItems(title) {

    for (let i = 0, length = localStorage.length; i < length; i++) {
        const key = localStorage.key(i)
        const value = localStorage[key]

        let getEvent = JSON.parse(value)

        let localstorageId = getEvent.id.toString()
        let localstorageTitle = getEvent.title.toString()
        let localstorageStartDate = getEvent.startDate.toString()
        let localstorageEndDate = getEvent.endDate.toString()
        let localstorageText = getEvent.text.toString()
        let localstorageType = getEvent.type.toString()

        const titleEvent = document.createElement('div')
        const start = document.createElement(`div`)
        const end = document.createElement(`div`)
        const textEvent = document.createElement(`div`)
        const li = document.createElement(`li`)
        const id = document.createElement(`div`)
        const btnDeletelocalstorage = document.createElement(`button`)
        const typeev = document.createElement(`div`)

        li.className = localstorageTitle + ' ' + localstorageType + ' ' + 'card'

        id.className = 'id'
        id.textContent = localstorageId

        typeev.className = 'type'
        typeev.textContent = 'Тип мероприятия:' + ' ' + localstorageType

        start.className = 'start'
        start.textContent = 'Дата начала мероприятия:' + ' ' + localstorageStartDate

        end.className = 'end'
        end.textContent = 'Дата окончания мероприятия:' + ' ' + localstorageEndDate

        titleEvent.className = 'title-event'
        titleEvent.textContent = 'Название мероприятия:' + ' ' + localstorageTitle

        textEvent.className = 'text-event'
        textEvent.textContent = 'Описание:' + ' ' + localstorageText

        btnDeletelocalstorage.className = 'btn-delete-localstorage'
        btnDeletelocalstorage.textContent = 'Удалить'

        //li.appendChild(id)
        li.appendChild(titleEvent)
        li.appendChild(typeev)
        li.appendChild(start)
        li.appendChild(end)
        li.appendChild(textEvent)
        li.appendChild(btnDeletelocalstorage)



        //localstorage delete
        btnDeletelocalstorage.addEventListener('click', (e) => {
            result.removeChild(li)

            const rItem = localstorageTitle

            localStorage.removeItem(rItem)
        })

        result.appendChild(li)

    }
}

//filter
function filterApp() {

    const buttons = document.querySelectorAll('.btn')
    const cards = document.querySelectorAll('.card')

    function filter(category, items) {
        items.forEach((item) => {
            const isItemFiltred = !item.classList.contains(category)

            const isShowAll = category.toLowerCase() === 'all'

            if (isItemFiltred && !isShowAll) {
                item.classList.add('hide')
            } else {
                item.classList.remove('hide')
            }
        })
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {

            const currentCategory = button.dataset.filter

            filter(currentCategory, cards)

        })
    })


}

filterApp()
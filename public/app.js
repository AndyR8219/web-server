document.addEventListener('click', (event) => {
  const type = event.target.dataset.type

  if (type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  } else if (type === 'update') {
    const id = event.target.dataset.id
    const editTitle = prompt(
      'Введите новое значение',
      event.target.closest('.list-group-item').innerText.split('\n')[0]
    )
    if (!editTitle) {
      return
    }
    update(id, editTitle)
  }
})

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function update(id, title) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      id,
      title,
    }),
  })
}

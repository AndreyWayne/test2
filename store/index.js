export const state = () => ({
  data: []
})

export const mutations = {
  SET_DATA(state, value) {
    state.data = value
  }
}

export const actions = {
  DATA_TRANSFORM(ctx, value) {
    let data = ctx.state.data

    data.items.forEach((item, i) => {
      let group = data.groups.find(_item => {
        return Math.abs(item.from_id) === Math.abs(_item.id)
      })

      let profile = data.profiles.find(_item => {
        return item.from_id === _item.id
      })

      if (group) {
        item.source = group.name
      }

      if (profile) {
        item.source = `${ profile.first_name } ${ profile.last_name }`
      }
    })

    ctx.commit('SET_DATA', data)
  }
}

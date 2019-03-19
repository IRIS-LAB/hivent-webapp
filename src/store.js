import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [
      { id: 1, title: 'Title', description: 'description' },
      { id: 2, title: 'Title 2', description: 'description 2' },
      {
        id: 3,
        title: 'Title 3',
        description:
          'Quid? qui se etiam nunc subsidiis patrimonii aut amicorum liberalitate sustentant, hos perire patiemur? An, si qui frui publico non potuit per hostem, hic tegitur ipsa lege censoria; quem is frui non sinit, qui est, etiamsi non appellatur, hostis, huic ferri auxilium non oportet? Retinete igitur in provincia diutius eum, qui de sociis cum hostibus, de civibus cum sociis faciat pactiones, qui hoc etiam se pluris esse quam collegam putet, quod ille vos tristia voltuque deceperit, ipse numquam se minus quam erat, nequam esse simularit. Piso autem alio quodam modo gloriatur se brevi tempore perfecisse, ne Gabinius unus omnium nequissimus existimaretur.'
      },
      { id: 4, title: 'Title 2', description: 'description 2' },
      { id: 5, title: 'Title', description: 'description' },
      { id: 6, title: 'Title 2', description: 'description 2' },
      { id: 7, title: 'Title', description: 'description' },
      { id: 8, title: 'Title 2', description: 'description 2' },
      { id: 9, title: 'Title', description: 'description' },
      { id: 10, title: 'Title 2', description: 'description 2' },
      { id: 11, title: 'Title', description: 'description' },
      { id: 12, title: 'Title 2', description: 'description 2' },
      { id: 13, title: 'Title', description: 'description' },
      { id: 14, title: 'Title 2', description: 'description 2' },
      { id: 15, title: 'Title', description: 'description' },
      { id: 16, title: 'Title 2', description: 'description 2' },
      { id: 17, title: 'Title', description: 'description' },
      { id: 18, title: 'Title 2', description: 'description 2' },
      { id: 19, title: 'Title', description: 'description' },
      { id: 20, title: 'Title 2', description: 'description 2' }
    ]
  },
  mutations: {},
  actions: {}
})
